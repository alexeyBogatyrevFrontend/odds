const axios = require('axios')
const fs = require('fs')

const apiToken = 'y0_AgAAAABFmcW9AAsZzgAAAAD3rOq2PyK6dSjjTvm_lAalyiv4f0yS-zA'
const user_id = 1167705533
const host_id = 'https:sport-odds.top:443'
const sitemapPath = 'https://sport-odds.top/sitemap.xml'

const getUserID = async () => {
	try {
		const response = await axios.get(
			'https://api.webmaster.yandex.net/v4/user',
			{
				headers: {
					Authorization: `OAuth ${apiToken}`,
				},
			}
		)

		if (response.status === 200) {
			const { user_id } = response.data
			console.log('User ID:', user_id)
			return user_id
		} else {
			throw new Error(`Failed to fetch user ID: ${response.status}`)
		}
	} catch (error) {
		console.error('Error fetching user ID:', error.message)
		throw error
	}
}
// getUserID()
const getHostsList = async () => {
	try {
		const response = await axios.get(
			`https://api.webmaster.yandex.net/v4/user/${user_id}/hosts`,
			{
				headers: {
					Authorization: `OAuth ${apiToken}`,
				},
			}
		)

		if (response.status === 200) {
			const hosts = response.data.hosts
			console.log('Hosts List:', hosts)
			return hosts
		} else {
			throw new Error(`Failed to fetch hosts list: ${response.status}`)
		}
	} catch (error) {
		console.error('Error fetching hosts list:', error.message)
		throw error
	}
}
// getHostsList()

// indexNow
const url =
	'https://sport-odds.top/odds/gamepage/basketball_euroleague&ae82fbfae76e43711bc86e08a0be6c45?category=Basketball'
const key = 'EdD8dkmdNLlxREi2LkhJjYOH2kyQbJqM3cBKT5fX'
const keyLocation =
	'https://sport-odds.top/EdD8dkmdNLlxREi2LkhJjYOH2kyQbJqM3cBKT5fX.txt'

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

// sendIndexNowRequest(url, key, keyLocation)
