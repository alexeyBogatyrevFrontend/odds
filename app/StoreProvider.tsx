'use client'

import store from '@/lib/store'
import { FC } from 'react'
import { Provider } from 'react-redux'

type StoreProviderType = {
	children: any
}

const StoreProvider: FC<StoreProviderType> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
