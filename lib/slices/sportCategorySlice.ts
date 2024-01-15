import { createSlice } from '@reduxjs/toolkit'
import store from '../store'
import { useRouter } from 'next/router'

const initialState = {
	category: 'Soccer',
}

const sportCategorySlice = createSlice({
	name: 'sport',
	initialState,
	reducers: {
		setCategory: (state, action) => {
			state.category = action.payload
		},
	},
})

export default sportCategorySlice.reducer
export const { setCategory } = sportCategorySlice.actions
export type AppDispatch = typeof store.dispatch
