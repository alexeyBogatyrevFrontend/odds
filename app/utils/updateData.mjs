import axios from 'axios'
import mongoose from 'mongoose'
import cron from 'node-cron'

const API_KEY = 'zfme0kbYPxejRvJvTdv5gs0LfaadXMSF'
const MONGODB_URI = 'mongodb://localhost:27017/oddsData'

let dateFormat = 'iso'
let markets = 'h2h'
let oddsFormat = 'decimal'
let regions = 'us'

mongoose.connect(MONGODB_URI)

const Schema = mongoose.Schema

const sportSchema = new Schema({
	key: String,
	group: String,
	title: String,
	description: String,
	active: Boolean,
	has_outrights: Boolean,
})

const oddsSchema = new Schema({
	id: String,
	sport_key: String,
	sport_title: String,
	commence_time: Date,
	home_team: String,
	away_team: String,
	bookmakers: [
		{
			key: String,
			title: String,
			last_update: String,
			markets: [
				{
					key: String,
					last_update: String,
					outcomes: [
						{
							name: String,
							price: Number,
						},
					],
				},
			],
		},
	],
})

const Sport = mongoose.model('Sport', sportSchema)
const Odds = mongoose.model('Odds', oddsSchema)

export const getAll = async () => {
	const response = await axios.get(
		'https://api.apilayer.com/odds/sports?all=false',
		{
			headers: {
				apikey: API_KEY,
			},
		}
	)

	const result = response.data

	return result
}

export const getEvents = async key => {
	const response = await axios.get(
		`https://api.apilayer.com/odds/sports/${key}/odds?regions=${regions}&oddsFormat=${oddsFormat}&markets=${markets}&dateFormat=${dateFormat}`,
		{
			headers: {
				apikey: API_KEY,
			},
		}
	)

	const result = response.data

	return result
}

const fetchDataAndSaveToDB = async () => {
	try {
		const allData = await getAll()

		for (const sportItem of allData) {
			await Sport.create(sportItem)

			try {
				const oddsData = await getEvents(sportItem.key)

				for (const oddsItem of oddsData) {
					await Odds.create(oddsItem)
				}
			} catch (error) {
				if (error.response && error.response.status === 422) {
					console.log(
						`Произошла ошибка 422 для ${sportItem.key}. Продолжение...`
					)
					// Можно добавить дополнительную обработку, если это необходимо
				} else {
					// Распечатайте остальные ошибки
					console.error(error)
				}
			}
		}

		console.log('Данные успешно записаны в базу данных.')
	} catch (error) {
		// Распечатайте ошибку, чтобы увидеть подробности
		console.error(error)
	}
}

// Расписание выполнения задачи (раз в день)
// cron.schedule('0 0 * * *', async () => {
// 	await fetchDataAndSaveToDB()
// })

// Запуск задачи вручную при старте скрипта
fetchDataAndSaveToDB()
