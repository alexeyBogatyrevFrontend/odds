import React from 'react'
import styles from './TopNewsList.module.css'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/types'
import Loader from '@/app/components/UI/Loader'
import TopNewsItem from '../TopNewsItem/TopNewsItem'
import Link from 'next/link'

const TopNewsList = () => {
	const { newsList, status, error } = useSelector(
		(state: RootState) => state.news
	)

	const topNews = newsList.filter(news => news.isTop)
	const displayedNews = topNews.slice(0, 6)

	return (
		<>
			<h2 className={styles.title}>
				<Image src='/top-fire.svg' width={24} height={24} alt='fire' />
				Топ новости
			</h2>
			<div className={styles.wrapper}>
				{status === 'loading' ? (
					<Loader />
				) : (
					<>
						{displayedNews.length
							? displayedNews.map((item, index) => (
									<TopNewsItem item={item} key={index} />
							  ))
							: 'Топ новости появятся позже'}
					</>
				)}
			</div>
			<Link href='/news' className={styles.allNews}>
				Все новости {'>'}
			</Link>
		</>
	)
}

export default TopNewsList
