'use client'

import React, { FC, ReactNode, useEffect } from 'react'
import Header from '../components/Header'

import TopNewsList from '../news/TopNewsList/TopNewsList'
import NewsList from '../news/NewsList/NewsList'
import Footer from '../components/Footer/Footer'
import SportsCategoryList from '../odds/sportsCategory/SportsCategoryList/SportsCategoryList'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, fetchNews } from '@/lib/slices/newsSlice'
import { RootState } from '../../types'

type LayoutType = {
	children: ReactNode
}

const Layout: FC<LayoutType> = ({ children }) => {
	const { newsList } = useSelector((state: RootState) => state.news)
	const dispatch = useDispatch<AppDispatch>()

	// useEffect(() => {
	// 	if (!newsList.length) dispatch(fetchNews())
	// }, [dispatch])

	return (
		<div className='mainWrapper'>
			<Header />
			<main className='main'>
				<div className='container'>
					<div className='main__wrapper'>
						<div className='left'>
							<SportsCategoryList />
							<TopNewsList />
						</div>
						<div className='right'>
							{children}
							<NewsList />
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default Layout
