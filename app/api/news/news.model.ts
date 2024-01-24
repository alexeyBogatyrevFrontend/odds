// models/news.model.js
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newsSchema = new Schema(
	{
		h1: { type: String, required: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		textEditor: { type: String, required: true },
		isTop: { type: Boolean, required: true },
		date: { type: Date, required: true },
		imageUrl: { type: String, required: true }, // Замените на ссылку на изображение
	},
	{
		timestamps: true,
	}
)

const News = mongoose.model('News', newsSchema)

export default News
