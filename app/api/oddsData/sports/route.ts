import { NextResponse } from 'next/server'

import Sports from '../models/sports.model'
import connectDB from '../db'

export const GET = async (req: any) => {
	try {
		connectDB()

		const url = new URL(req.url, 'http://localhost:3000')

		return NextResponse.json({
			sports: await Sports.find(),
		})
	} catch (error) {
		console.log(error)
		throw new Error('Failed to fetch news')
	}
}
