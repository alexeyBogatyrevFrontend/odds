import { NextResponse } from 'next/server'

import Data from '../models/data.model'
import connectDBOddsData from '../db'

export const GET = async () => {
	await connectDBOddsData()
	try {
		const currentDate = new Date().toISOString().split('T')[0]
		const collectionName = `data_${currentDate}`
		const data = await Data.findOne({}, 'odds', {
			collection: collectionName,
		})

		return NextResponse.json(data)
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: error }, { status: 500 })
	}
}
