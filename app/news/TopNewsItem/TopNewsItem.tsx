import React, { FC } from 'react'

import styles from './TopNewsItem.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { newsType } from '@/app/types'
import { arrayBufferToBase64 } from '@/app/utils/arrayBufferToBase64'
import dayjs from 'dayjs'

type TopNewsItemProps = {
	item: newsType
}

const TopNewsItem: FC<TopNewsItemProps> = ({ item }) => {
	const formattedDate = item?.date
		? dayjs(item?.date).format('MMMM DD, YYYY HH:mm')
		: 'Дата не была установлена'
	// @ts-expect-error I use here Buffer not file
	const base64Encoded = item.image ? arrayBufferToBase64(item.image.data) : ''

	return (
		<Link href={`/news/${item._id}`} className={styles.block}>
			<div className={styles.img}>
				<Image
					src={`data:image/jpeg;base64,${base64Encoded}`}
					width={73}
					height={73}
					alt={item.title}
				/>
			</div>

			<div className={styles.block__bottom}>
				<h3>{item.h1}</h3>
				<span>{formattedDate}</span>
			</div>

			{item.isTop && (
				<div className={styles.top}>
					<Image src='/top-fire.svg' width={24} height={24} alt='fire' />
				</div>
			)}
		</Link>
	)
}

export default TopNewsItem
