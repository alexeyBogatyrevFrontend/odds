// pages/api/news.js

import News from '../news.model' // Используйте правильный путь к вашему файлу news.model.js
import mongoose from 'mongoose'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

mongoose.connect('mongodb://localhost:27017/odds')

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			try {
				const page = parseInt(req.query.page) || 1
				const pageSize = parseInt(req.query.pageSize) || 6

				if (!req.query.page && !req.query.pageSize) {
					// Если не указаны параметры page и pageSize, вернуть все новости
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
			break

		default:
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
