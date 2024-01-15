const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export const getAllNews = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1
		const pageSize = parseInt(req.query.pageSize) || 6

		if (!req.query.page && !req.query.pageSize) {
			const allNews = await News.find()
			return res.json(allNews.reverse())
		}

		const skip = (page - 1) * pageSize

		const allNews = await News.find().skip(skip).limit(pageSize)
		const totalCount = await News.countDocuments()

		res.json({
			newsList: allNews.reverse(),
			totalPages: Math.ceil(totalCount / pageSize),
			currentPage: page,
		})
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const getTopNews = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1
		const pageSize = parseInt(req.query.pageSize) || 6

		const skip = (page - 1) * pageSize

		const topNews = await News.find({ isTop: true }).skip(skip).limit(pageSize)
		const totalCount = await News.countDocuments({ isTop: true })

		res.json({
			newsList: topNews.reverse(),
			totalPages: Math.ceil(totalCount / pageSize),
			currentPage: page,
		})
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const addNews = async (req, res) => {
	try {
		// Обработка одного файла с полем 'image'
		upload.single('image')(req, res, async err => {
			if (err) {
				return res.status(400).json({ error: 'Ошибка при загрузке файла' })
			}

			const { h1, title, description, textEditor, isTop, date } = req.body
			const imageBuffer = req.file ? req.file.buffer : undefined

			const news = new News({
				h1,
				title,
				description,
				textEditor,
				isTop,
				date,
				image: imageBuffer,
			})

			const savedNews = await news.save()
			const allNews = await News.find()

			res.json(allNews.reverse())
		})
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const editNews = async (req, res) => {
	try {
		upload.single('image')(req, res, async err => {
			if (err) {
				return res.status(400).json({ error: 'Ошибка при загрузке файла' })
			}

			const newsId = req.params.id
			const { h1, title, description, textEditor, isTop, date } = req.body

			const imageBuffer = req.file ? req.file.buffer : undefined

			const existingNews = await News.findById(newsId)

			if (!existingNews) {
				return res.status(404).json({ error: 'News not found' })
			}

			existingNews.h1 = h1
			existingNews.title = title
			existingNews.description = description
			existingNews.textEditor = textEditor
			existingNews.isTop = isTop
			existingNews.date = date

			if (imageBuffer) {
				existingNews.image = imageBuffer
			}

			const updatedNews = await existingNews.save()

			const currentPage = parseInt(req.query.currentPage) || 1
			const pageSize = parseInt(req.query.pageSize) || 6
			const isTopNews = req.query.topNews === 'true'

			const totalCount = isTopNews
				? await News.countDocuments({ isTop: true })
				: await News.countDocuments()

			const skip = (currentPage - 1) * pageSize

			const query = isTopNews ? { isTop: true } : {}
			const allNews = await News.find(query).skip(skip).limit(pageSize)

			res.json({
				newsList: allNews.reverse(),
				totalPages: Math.ceil(totalCount / pageSize),
				currentPage,
				isTopNews,
			})
		})
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const deleteNews = async (req, res) => {
	try {
		const newsId = req.params.id
		const isTopNews = req.query.topNews === 'true'

		const existingNews = await News.findById(newsId)
		if (!existingNews) {
			return res.status(404).json({ error: 'News not found' })
		}

		await News.findByIdAndDelete(newsId)

		const currentPage = parseInt(req.query.currentPage) || 1
		const pageSize = parseInt(req.query.pageSize) || 6

		const totalCount = isTopNews
			? await News.countDocuments({ isTop: true })
			: await News.countDocuments()

		const skip = (currentPage - 1) * pageSize

		const query = isTopNews ? { isTop: true } : {}
		const allNews = await News.find(query).skip(skip).limit(pageSize)

		res.json({
			newsList: allNews.reverse(),
			totalPages: Math.ceil(totalCount / pageSize),
			currentPage,
			isTopNews,
		})
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
