import mongoose from 'mongoose'

const MONGODB_URI_ODDS_DATA = 'mongodb://127.0.0.1:27017/oddsData'

const connectDB = async () => {
	if (mongoose.connections[0].readyState) return

	try {
		await mongoose.connect(MONGODB_URI_ODDS_DATA)
		console.log('MONGODB_URI_ODDS_DATA connected successfully')
	} catch (error) {
		console.error('Error connecting to MongoDB:', error)
		process.exit(1)
	}
}

export default connectDB
