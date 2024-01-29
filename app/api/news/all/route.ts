import { NextResponse } from 'next/server'
import connectDBNews from '../db'
import News from '../models/news.model'

export const GET = async (req: any) => {
	try {
		await connectDBNews()

		const url = new URL(req.url, 'http://localhost:3000')
		const page = parseInt(url.searchParams.get('page')) || 1
		const pageSize = parseInt(url.searchParams.get('pageSize')) || 6

		if (!page && !pageSize) {
			const allNews = await News.find()
			return NextResponse.json(allNews.reverse())
		}

		const skip = (page - 1) * pageSize

		const allNews = await News.find().skip(skip).limit(pageSize)
		const totalCount = await News.countDocuments()

		return NextResponse.json({
			newsList: allNews.reverse(),
			totalPages: Math.ceil(totalCount / pageSize),
			currentPage: page,
		})
	} catch (error) {
		console.log(error)
		throw new Error('Failed to fetch news')
	}
}
