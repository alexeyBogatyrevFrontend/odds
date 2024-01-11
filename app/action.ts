'use server'

import axios from 'axios'
import { RootInterface } from './odds/eventspage/[data]/page'

// odds
const API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY
let dateFormat = 'iso'
let markets = 'h2h'
let oddsFormat = 'decimal'
let regions = 'us'

export const getEvents = async (key: string) => {
	const response = await axios.get(
		`https://api.apilayer.com/odds/sports/${key}/odds?regions=${regions}&oddsFormat=${oddsFormat}&markets=${markets}&dateFormat=${dateFormat}`,
		{
			headers: {
				apikey: API_KEY,
			},
		}
	)

	const result: RootInterface[] = response.data

	return result
}

export const getGame = async (key: string) => {
	const response = await axios.get(
		`https://api.apilayer.com/odds/sports/${key}/odds?regions=${regions}&oddsFormat=${oddsFormat}&markets=${markets}&dateFormat=${dateFormat}`,
		{
			headers: {
				apikey: API_KEY,
			},
		}
	)

	const result: RootInterface[] = response.data

	return result
}

// news
export const fetchNews = async () => {
	const response = await axios.get('http://localhost:3002/news/all')
	const result = response.data

	return result
}
