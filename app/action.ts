'use server'

import axios from 'axios'
import { RootInterface } from './odds/eventspage/[data]/page'
import { MongoClient } from 'mongodb'

const uri = 'mongodb://localhost:27017/oddsData'
const client = new MongoClient(uri)

// odds
const API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY
let dateFormat = 'iso'
let markets = 'h2h'
let oddsFormat = 'decimal'
let regions = 'us'

// odds
export const fetchEvents = async (key: string) => {
	try {
		const response = await axios.get('http://localhost:3000/api/oddsData/data')
		const result = response.data.data[0].odds

		const events = result.filter(event => event.sport_key === key)

		return events
	} catch (error) {
		console.error('Error fetching data:', error.message)
		throw error // You may want to handle or rethrow the error based on your needs
	}
}

// news
export const fetchNews = async () => {
	const response = await axios.get('http://localhost:3000/api/news/all')
	const result = response.data.newsList

	return result
}
