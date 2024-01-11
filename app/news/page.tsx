import React, { useState } from 'react'
import Layout from '../layouts/Layout'

import { RootState, newsType } from '../types'
import NewsItem from './NewsItem/NewsItem'

import styles from './all-news.module.css'
import { fetchNews } from '../action'
import { sortNews } from '../utils/sortNews'

const page = async () => {
	const newsList: newsType[] = await fetchNews()

	return (
		<Layout>
			<div className={styles.page}>
				<h2>Все новости</h2>
				{/* <select className={styles.sort}>
					<option disabled selected>
						Сортировка
					</option>
					<option value='newest'>Сначала новые</option>
					<option value='oldest'>Сначала старые</option>
					<option value='top'>Сначала топовые</option>
					<option value='usual'>Сначала обычные</option>
				</select> */}
				<div className={styles.wrapper}>
					{newsList.map(news => (
						<NewsItem item={news} key={news._id} />
					))}
				</div>
			</div>
		</Layout>
	)
}

export default page
