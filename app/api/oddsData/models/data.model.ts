import mongoose, { Document, Schema, Model } from 'mongoose'

interface Sport {
	key: string
	group: string
	title: string
	description: string
	active: boolean
	has_outrights: boolean
}

interface Odds {
	id: string
	sport_key: string
	sport_title: string
	commence_time: Date
	home_team: string
	away_team: string
	bookmakers: {
		key: string
		title: string
		last_update: string
		markets: {
			key: string
			last_update: string
			outcomes: {
				name: string
				price: number
			}[]
		}[]
	}[]
	gptText: string
}

interface DataDocument extends Document {
	sports: Sport[]
	odds: Odds[]
}

const sportSchema = new Schema<Sport>({
	key: String,
	group: String,
	title: String,
	description: String,
	active: Boolean,
	has_outrights: Boolean,
})

const oddsSchema = new Schema<Odds>({
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

const DataSchema = new Schema<DataDocument>({
	sports: [sportSchema],
	odds: [oddsSchema],
})

const Data: Model<DataDocument> =
	mongoose.models[`data_${currentDate}`] ||
	mongoose.model(`data_${currentDate}`, DataSchema)

export default Data
