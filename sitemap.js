const axios = require('axios')
const fs = require('fs').promises

// Замените API_KEY на ваш реальный ключ
const API_KEY = 'zfme0kbYPxejRvJvTdv5gs0LfaadXMSF'

const regions = 'us'
const oddsFormat = 'decimal'
const markets = 'h2h'
const dateFormat = 'iso'

const baseUrl = 'https://test.1wawin.top' // Замените на ваш базовый URL

// Асинхронная функция для генерации и сохранения sitemap в файл
async function generateAndSaveSitemap() {
	try {
		const response = await axios.get(
			'https://api.apilayer.com/odds/sports?all=false',
			{
				headers: {
					apikey: API_KEY,
				},
			}
		)

		const events = response.data

		// Генерируем sitemap
		const sitemapContent = await generateSitemapContent(events, baseUrl)

		// Сохраняем sitemap в файл
		await fs.writeFile('./public/sitemap.xml', sitemapContent, 'utf-8')

		console.log('Sitemap успешно сохранен в файл sitemap.xml')
	} catch (error) {
		console.error('Ошибка при получении данных:', error.message)
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
				const gameUrl = `${baseUrl}/gamepage/${encodeURIComponent(
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
	const response = await axios.get(
		`https://api.apilayer.com/odds/sports/${key}/odds?regions=${regions}&oddsFormat=${oddsFormat}&markets=${markets}&dateFormat=${dateFormat}`,
		{
			headers: {
				apikey: API_KEY,
			},
		}
	)

	return response.data
}

// Вызываем асинхронную функцию для генерации и сохранения sitemap
generateAndSaveSitemap()
