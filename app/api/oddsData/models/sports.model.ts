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

const Sports = mongoose.model('Sports', sportSchema)

export default Sports
