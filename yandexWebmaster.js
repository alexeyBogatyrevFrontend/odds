const axios = require('axios')
const fs = require('fs')

const apiToken = 'y0_AgAAAABFmcW9AAsZzgAAAAD3rOq2PyK6dSjjTvm_lAalyiv4f0yS-zA'
const user_id = 1167705533
const host_id = 'https:test.seo-team.org:443'
const sitemapPath = 'https://test.seo-team.org/sitemap.xml'

const sendSitemap = async (apiToken, user_id, host_id, sitemapPath) => {
	try {
		const headers = {
			Authorization: `OAuth ${apiToken}`,
			'Content-Type': 'application/json', // Указываем тип данных в заголовке
		}

		const requestData = {
			url: sitemapPath, // Замените на реальный URL вашего файла Sitemap
		}

		const response = await axios.post(
			`https://api.webmaster.yandex.net/v4/user/${user_id}/hosts/${host_id}/user-added-sitemaps`,
			requestData,
			{ headers }
		)

		console.log(response.data)
		return response.data
	} catch (error) {
		console.error('Error sending sitemap:', error.message)
		throw error
	}
}
// { sitemap_id: '27985acc-05d6-3201-a601-be84c1ea56b4' }

// sendSitemap(apiToken, user_id, host_id, sitemapPath)

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

// Пример использования
const query_indicator = 'TOTAL_SHOWS' // Замените на реальный индикатор запроса
const device_type_indicator = 'ALL' // Замените на реальный тип устройства
const date_from = '2023-01-01' // Замените на реальную дату начала интервала
const date_to = '2023-12-31' // Замените на реальную дату конца интервала

getStatistics(
	apiToken,
	user_id,
	host_id,
	query_indicator,
	device_type_indicator,
	date_from,
	date_to
)
