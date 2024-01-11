import { fetchNews } from '@/app/action'
import Layout from '@/app/layouts/Layout'
import { newsType } from '@/app/types'
import { arrayBufferToBase64 } from '@/app/utils/arrayBufferToBase64'
import dayjs from 'dayjs'
import Image from 'next/image'
import React, { FC } from 'react'

import styles from './page.module.css'

type NewsPageProps = {
	params: {
		id: string
	}
}

export async function generateMetadata({ params: { id } }: NewsPageProps) {
	const newsList: newsType[] = await fetchNews()

	const currentNews = newsList.filter(news => news._id === id)[0]

	return {
		title: currentNews.title,
		description: currentNews.description,
	}
}

const page: FC<NewsPageProps> = async ({ params: { id } }) => {
	const newsList: newsType[] = await fetchNews()

	const currentNews = newsList.filter(news => news._id === id)[0]

	const formattedDate = currentNews?.date
		? dayjs(currentNews?.date).format('MMMM DD, YYYY HH:mm')
		: 'Дата не была установлена'

	const base64Encoded = currentNews.image
		? // @ts-expect-error I use here Buffer not file
		  arrayBufferToBase64(currentNews.image.data)
		: ''
	return (
		<Layout>
			<div className={styles.block}>
				<h1 className={styles.title}>{currentNews?.h1}</h1>
				<span className={styles.date}>{formattedDate}</span>
				<div className={styles.img}>
					<Image
						src={`data:image/jpeg;base64,${base64Encoded}`}
						width={100}
						height={100}
						alt={currentNews?.h1}
					/>
					{currentNews.isTop && (
						<div className={styles.top}>
							<Image src='/top-fire.svg' width={24} height={24} alt='fire' />
						</div>
					)}
				</div>
				<div dangerouslySetInnerHTML={{ __html: currentNews?.textEditor }} />
			</div>
		</Layout>
	)
}

export default page
