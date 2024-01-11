import { configureStore } from '@reduxjs/toolkit'
import newsSlice from './slices/newsSlice'
import sportCategorySlice from './slices/sportCategorySlice'

const store = configureStore({
	reducer: {
		news: newsSlice,
		sport: sportCategorySlice,
	},
})

export default store
