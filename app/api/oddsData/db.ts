import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb://localhost:27017/oddsData'

const connectDB = async () => {
	if (mongoose.connections[0].readyState) return

	try {
		await mongoose.connect(MONGODB_URI)
		console.log('MongoDB connected successfully')
	} catch (error) {
		console.error('Error connecting to MongoDB:', error)
		process.exit(1)
	}
}

export default connectDB
