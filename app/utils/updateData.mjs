import axios from 'axios'
import mongoose from 'mongoose'
import OpenAI from 'openai'
import cron from 'node-cron'

// format Date
export const formatDate = commenceTime => {
	const date = new Date(commenceTime)
	const now = new Date()

	const isToday =
		date.getDate() === now.getDate() &&
		date.getMonth() === now.getMonth() &&
		date.getFullYear() === now.getFullYear()

	const options = {
		day: 'numeric',
		month: 'long',
	}

	const formattedDate = {
		isToday,
		dayOfWeek: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
			date
		),
		dayOfMonth: date.getDate(),
		month: date.toLocaleDateString(undefined, { month: 'long' }),
		time: date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		}),
	}
	return formattedDate
}

// openai
const openai = new OpenAI({
	apiKey: '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',
})

const generateText = async (first, second, date) => {
	const text = `Напиши анонс спортивного матча ${first} VS ${second} который состоится ${date} (Перевед команд и даты на русский, не больше 7 предложений)`

	const chatCompletion = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: text,
			},
		],
	})
	const result = chatCompletion.choices[0].message.content

	return result
}

// odds
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
	gptText: String,
})

const currentDate = new Date().toISOString().split('T')[0]
const Data = mongoose.model(`data_${currentDate}`, {
	sports: [sportSchema],
	odds: [oddsSchema],
})

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

// const fetchDataAndSaveToDB = async () => {
// 	try {
// 		let tempData = {
// 			sports: [],
// 			odds: [],
// 		}

// 		const allData = await getAll()

// 		for (const sportItem of allData) {
// 			tempData.sports.push(sportItem)

// 			try {
// 				const oddsData = await getEvents(sportItem.key)

// 				for (const oddsItem of oddsData) {
// 					tempData.odds.push(oddsItem)
// 				}
// 			} catch (error) {
// 				if (error.response && error.response.status === 422) {
// 					console.log(
// 						`Произошла ошибка 422 для ${sportItem.key}. Продолжение...`
// 					)
// 					// Можно добавить дополнительную обработку, если это необходимо
// 				} else {
// 					// Распечатайте остальные ошибки
// 					console.error(error)
// 				}
// 			}
// 		}

// 		const data = new Data({
// 			sports: tempData.sports,
// 			odds: tempData.odds,
// 		})

// 		await data.save()

// 		console.log('Данные успешно записаны в базу данных.')
// 	} catch (error) {
// 		// Распечатайте ошибку, чтобы увидеть подробности
// 		console.error(error)
// 	}
// }

// Расписание выполнения задачи (раз в день)
// cron.schedule('0 0 * * *', async () => {
// 	await fetchDataAndSaveToDB()
// })

// Запуск задачи вручную при старте скрипта

const fetchDataAndSaveToDB = async () => {
	try {
		let tempData = {
			sports: [],
			odds: [],
		}

		const allData = await getAll()

		for (const sportItem of allData) {
			tempData.sports.push(sportItem)

			try {
				const oddsData = await getEvents(sportItem.key)

				for (const oddsItem of oddsData) {
					const date =
						formatDate(oddsItem.commence_time).dayOfMonth +
						' ' +
						formatDate(oddsItem.commence_time).month

					const generatedText = await generateText(
						oddsItem.home_team,
						oddsItem.away_team,
						date
					)

					// Добавляем gptText к объекту перед сохранением в базу данных
					tempData.odds.push({
						...oddsItem,
						gptText: generatedText,
					})
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

		const data = new Data({
			sports: tempData.sports,
			odds: tempData.odds,
		})

		await data.save()

		console.log('Данные успешно записаны в базу данных.')
	} catch (error) {
		// Распечатайте ошибку, чтобы увидеть подробности
		console.error(error)
	}
}

fetchDataAndSaveToDB()
