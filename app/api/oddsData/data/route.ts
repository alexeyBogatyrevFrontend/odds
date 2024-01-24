import { NextResponse } from 'next/server'

import Sports from '../models/data.model'
import connectDB from '../db'
import Data from '../models/data.model'

const currentDate = new Date().toISOString().split('T')[0]

export const GET = async () => {
	try {
		connectDB()

		return NextResponse.json({
			data: await Data.find(),
		})
	} catch (error) {
		console.log(error)
		throw new Error('Failed to fetch news')
	}
}
