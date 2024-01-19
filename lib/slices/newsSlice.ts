import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { newsType } from '../../app/types'
import store from '../store'

type NewsState = {
	newsList: newsType[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: NewsState = {
	newsList: [],
	status: 'idle',
	error: null,
}

export const fetchNews = createAsyncThunk<newsType[], void>(
	'news/fetchNews',
	async () => {
		const response = await axios.get('http://localhost:3000/api/news/all')

		return response.data.newsList
	}
)

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// fetch
		builder.addCase(fetchNews.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(
			fetchNews.fulfilled,
			(state, action: PayloadAction<newsType[]>) => {
				state.status = 'succeeded'
				state.newsList = action.payload
			}
		)
		builder.addCase(fetchNews.rejected, (state, action) => {
			state.status = 'failed'
			state.error = action.error.message ?? 'An error occurred'
		})
	},
})

export default newsSlice.reducer
export type AppDispatch = typeof store.dispatch
