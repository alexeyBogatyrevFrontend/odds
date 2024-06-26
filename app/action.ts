'use server'

import axios from 'axios'
import { MongoClient } from 'mongodb'
import { EventType, GamesInterface } from '../types'

const uri = 'mongodb://127.0.0.1:27017/'
const client = new MongoClient(uri)

// odds
const API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY
let dateFormat = 'iso'
let markets = 'h2h'
let oddsFormat = 'decimal'
let regions = 'us'

// sports
export const fetchSports = async (key: string) => {
	try {
		const response = await axios.get(
			'https://sport-odds.top/api/oddsData/sports'
		)

		const result: EventType[] = response.data.sports

		const sports = result.filter(sport => sport.group === key)

		return sports
	} catch (error: any) {
		console.error('Error fetching data:', error.message)
		throw error
	}
}

// odds
export const fetchEvents = async (key: string) => {
	try {
		const response = await axios.get('https://sport-odds.top/api/oddsData/odds')

		const result: GamesInterface[] = response.data.odds

		const events = result.filter(event => event.sport_key === key)

		// console.log(events)

		return events
	} catch (error: any) {
		console.error('Error fetching data:', error.message)
		throw error
	}
}

// news
export const fetchNews = async () => {
	const response = await axios.get('http://localhost:3000/api/news/all')
	const result = response.data.newsList

	return result
}
