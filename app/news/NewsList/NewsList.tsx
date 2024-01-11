import { useSelector } from 'react-redux'
import NewsItem from '../NewsItem/NewsItem'
import styles from './NewsList.module.css'
import { RootState } from '@/app/types'
import Loader from '@/app/components/UI/Loader'
import Link from 'next/link'

const NewsList = () => {
	const { newsList, status, error } = useSelector(
		(state: RootState) => state.news
	)

	const usualNews = newsList.filter(news => !news.isTop)
	const displayedNews = usualNews.slice(0, 6)

	return (
		<div style={{ width: '100%' }}>
			<div className={styles.header}>
				<h2 className={styles.title}>Новости</h2>
				<Link href='/news' className={styles.subTitle}>
					Все новости {'>'}
				</Link>
			</div>

			<div className={styles.wrapper}>
				{status === 'loading' ? (
					<Loader />
				) : (
					<>
						{displayedNews.length
							? displayedNews.map((item, index) => (
									<NewsItem item={item} key={index} />
							  ))
							: 'Новости появятся позже'}
					</>
				)}
			</div>
		</div>
	)
}

export default NewsList
