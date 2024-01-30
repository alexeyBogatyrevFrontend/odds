import axios from 'axios'
import fs from 'fs/promises'
import { exec } from 'child_process'
import cron from 'node-cron'

// Замените API_KEY на ваш реальный ключ
const API_KEY = 'zfme0kbYPxejRvJvTdv5gs0LfaadXMSF'

const regions = 'us'
const oddsFormat = 'decimal'
const markets = 'h2h'
const dateFormat = 'iso'

const baseUrl = 'https://sport-odds.top' // Замените на ваш базовый URL

const apiToken = 'y0_AgAAAABFmcW9AAsZzgAAAAD3rOq2PyK6dSjjTvm_lAalyiv4f0yS-zA'
const user_id = 1167705533
const host_id = 'https:test.seo-team.org:443'
// const sitemapPath = 'https://sport-odds.top/sitemap.xml'

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

// Асинхронная функция для генерации и сохранения sitemap в файл
async function generateAndSaveSitemap() {
	try {
		const response = await axios.get(
			'http://localhost:3000/api/oddsData/sports',
			{
				headers: {
					apikey: API_KEY,
				},
			}
		)

		const events = response.data.sports

		// Генерируем sitemap
		const sitemapContent = await generateSitemapContent(events, baseUrl)

		const currentDate = new Date()
			.toISOString()
			.replace(/:/g, '-')
			.replace(/\./g, '-')
		const fileName = `./public/sitemap_${currentDate}.xml`
		const sitemapPath = `https://sport-odds.top/sitemap_${currentDate}.xml`

		// Сохраняем sitemap в файл
		await fs.writeFile(fileName, sitemapContent, 'utf-8')

		await sendSitemap(apiToken, user_id, host_id, sitemapPath)

		exec('pm2 restart all', (error, stdout, stderr) => {
			if (error) {
				console.error(`Error restarting pm2: ${error.message}`)
				return
			}
			console.log(`pm2 restarted successfully.`)
		})
		console.log('Sitemap успешно сохранен в файл sitemap.xml')
	} catch (error) {
		console.error('Ошибка при получении данных:', error)
	}
}

// Функция для генерации содержимого sitemap
async function generateSitemapContent(events, baseUrl) {
	let sitemapEntries = ''

	// Обходим каждое событие
	for (const event of events) {
		try {
			const gameData = await getGame(event.key)
			const gameIds = gameData.map(data => data.id)

			// Добавляем каждый URL в sitemapEntries
			for (const gameId of gameIds) {
				const gameUrl = `${baseUrl}/odds/gamepage/${encodeURIComponent(
					event.key
				)}&amp;${encodeURIComponent(gameId)}?category=${encodeURIComponent(
					event.group
				)}`
				sitemapEntries += `  <url><loc>${gameUrl}</loc></url>\n`
				console.log('Game URL:', gameUrl)
			}
		} catch (error) {
			console.error('Ошибка при получении данных для игры:', error.message)
			// Продолжаем выполнение цикла даже после ошибки
		}
	}

	// Возвращаем полное содержимое sitemap
	const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`

	return sitemapContent
}

// Функция для получения данных для конкретного события
async function getGame(key) {
	try {
		const response = await axios.get('http://localhost:3000/api/oddsData/odds')
		const result = response.data.odds

		const events = result.filter(event => event.sport_key === key)

		return events
	} catch (error) {
		console.error('Error fetching data:', error.message)
		throw error
	}
}

generateAndSaveSitemap()
// cron.schedule('35 13 * * *', () => {
// 	generateAndSaveSitemap()
// })
