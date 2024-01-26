import { NextResponse } from 'next/server'

import Data from '../models/data.model'
import connectDB from '../db'

export const GET = async () => {
	await connectDB()
	try {
		const currentDate = new Date().toISOString().split('T')[0]
		const collectionName = `data_${currentDate}`
		const data = await Data.findOne({}, 'sports', {
			collection: collectionName,
		})

		return NextResponse.json(data)
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: error }, { status: 500 })
	}
}
