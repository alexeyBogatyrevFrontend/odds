import React, { FC } from 'react'

import Link from 'next/link'
import styles from './SportItem.module.css'
import { EventType } from '@/types'

type SportItemProps = {
	event: EventType[]
}

const SportItem: FC<SportItemProps> = ({ event }) => {
	return (
		<div className='mb-8'>
			<div className={styles.sportCategory}>
				<div className={styles.sportCategory__wrapper}>
					{event.map((item, index) => (
						<Link
							href={`/odds/eventspage/${item.group}&${item.key}?category=${item.group}`}
							key={index}
						>
							<div className={styles.sportCategory__item}>
								<span>{item.title}</span>
								<span>{item.group}</span>
								<span>{item.description}</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default SportItem
