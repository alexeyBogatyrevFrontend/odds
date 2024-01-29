import React, { FC } from 'react'

import styles from './NewsItem.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { newsType } from '@/types'
import { arrayBufferToBase64 } from '@/app/utils/arrayBufferToBase64'

type NewsItemProps = {
	item: newsType
}

const NewsItem: FC<NewsItemProps> = ({ item }) => {
	// @ts-expect-error I use here Buffer not file
	const base64Encoded = item.image ? arrayBufferToBase64(item.image.data) : ''

	return (
		<Link href={`/news/${item._id}`} className={styles.block}>
			<div className={styles.img}>
				<Image
					src={`data:image/jpeg;base64,${base64Encoded}`}
					width={290}
					height={155}
					alt={item.title}
				/>
			</div>

			<div className={styles.block__bottom}>
				<h3>{item.title}</h3>
				<span>{item.description}</span>
			</div>

			{item.isTop && (
				<div className={styles.top}>
					<Image src='/top-fire.svg' width={24} height={24} alt='fire' />
				</div>
			)}
		</Link>
	)
}

export default NewsItem
