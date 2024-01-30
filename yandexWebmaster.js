const axios = require('axios')
const fs = require('fs')

const apiToken = 'y0_AgAAAABFmcW9AAsZzgAAAAD3rOq2PyK6dSjjTvm_lAalyiv4f0yS-zA'
const user_id = 1167705533
const host_id = 'https:test.seo-team.org:443'
const sitemapPath = 'https://sport-odds.top/sitemap.xml'

// get statistics
const query_indicator = 'TOTAL_SHOWS'
const device_type_indicator = 'ALL'
const date_from = '2023-01-01'
const date_to = '2023-12-31'

// indexNow
const url =
	'https://sport-odds.top/odds/gamepage/basketball_euroleague&ae82fbfae76e43711bc86e08a0be6c45?category=Basketball'
const key = 'EdD8dkmdNLlxREi2LkhJjYOH2kyQbJqM3cBKT5fX'
const keyLocation =
	'https://sport-odds.top/EdD8dkmdNLlxREi2LkhJjYOH2kyQbJqM3cBKT5fX.txt'

const getStatistics = async (
	apiToken,
	user_id,
	host_id,
	query_indicator,
	device_type_indicator,
	date_from,
	date_to
) => {
	try {
		const headers = {
			Authorization: `OAuth ${apiToken}`,
			'Content-Type': 'application/json', // Указываем тип данных в заголовке
		}

		// Параметры запроса
		const queryParams = {
			query_indicator,
			device_type_indicator,
			date_from,
			date_to,
		}

		const response = await axios.get(
			`https://api.webmaster.yandex.net/v4/user/${user_id}/hosts/${host_id}/search-queries/all/history`,
			{ headers, params: queryParams }
		)

		console.log(response.data)
		return response.data
	} catch (error) {
		console.error('Error getting search queries history:', error.message)
		throw error
	}
}

// getStatistics(
// 	apiToken,
// 	user_id,
// 	host_id,
// 	query_indicator,
// 	device_type_indicator,
// 	date_from,
// 	date_to
// )

const sendIndexNowRequest = async (url, key, keyLocation) => {
	try {
		const headers = {
			'Content-Type': 'application/json',
		}

		// Параметры запроса
		const queryParams = {
			url,
			key,
			keyLocation,
		}

		const response = await axios.get('https://yandex.com/indexnow', {
			headers,
			params: queryParams,
		})

		console.log(response.data)
		return response.data
	} catch (error) {
		console.error('Error sending IndexNow request:', error.message)
		throw error
	}
}

// Пример использования

sendIndexNowRequest(url, key, keyLocation)
