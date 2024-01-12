const axios = require('axios')
const fs = require('fs')

const sendSitemap = async (apiToken, sitemapPath) => {
	try {
		const headers = {
			Authorization: `OAuth ${apiToken}`,
		}

		const formData = new FormData()
		formData.append('sitemap', fs.createReadStream(sitemapPath))

		const response = await axios.post(
			'https://webmaster.yandex.ru/api/v2/ping-sitelinks.xml',
			formData,
			{ headers }
		)

		console.log(response.data)
		return response.data
	} catch (error) {
		console.error('Error sending sitemap:', error.message)
		throw error
	}
}

module.exports = sendSitemap
