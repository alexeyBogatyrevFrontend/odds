// models/news.model.js
const mongoose = require('mongoose')

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

const currentDate = new Date().toISOString().split('T')[0]
const Data = mongoose.model(`data_${currentDate}`, {
	sports: [sportSchema],
	odds: [oddsSchema],
})

export default Data
