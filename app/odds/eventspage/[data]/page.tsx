import { fetchEvents } from '@/app/action'
import Layout from '@/app/layouts/Layout'

import Link from 'next/link'
import React, { FC } from 'react'

import styles from '../EventsPage.module.css'
import { formatDate } from '@/app/utils/formatDate'

type EventsPageProps = {
	params: {
		data: string
	}
}

export type RootInterface = {
	id: string
	sport_key: string
	sport_title: string
	commence_time: string
	home_team: string
	away_team: string
	bookmakers: Bookmaker[]
}

export type Bookmaker = {
	key: string
	title: string
	last_update: string
	markets: Market[]
}

export type Market = {
	key: string
	last_update: string
	outcomes: Outcome[]
}

export type Outcome = {
	name: string
	price: number
}

const EventsPage: FC<EventsPageProps> = async ({ params: { data } }) => {
	const key = data.split('%26')[1]
	const group = data.split('%26')[0]

	const games = await fetchEvents(key)

	console.log(games)

	return (
		<Layout>
			{games.length > 0 && (
				<div className='mb-8'>
					<h2>Спортивные события</h2>
					<div className={styles.wrapper}>
						{games.map((game, index) => (
							<Link
								href={`/odds/gamepage/${key}&${game.id}?category=${group}`}
								key={index}
							>
								<div className={styles.block}>
									<div className={styles.top}>
										<h2 className={styles.bold}>{game.sport_title}</h2>

										<div className='block__wrapper'>
											<div className={styles.date}>
												{formatDate(game.commence_time).isToday
													? 'Today, ' + formatDate(game.commence_time).time
													: `${formatDate(game.commence_time).dayOfMonth} ${
															formatDate(game.commence_time).month
													  }, ${formatDate(game.commence_time).time}`}
											</div>
										</div>
									</div>
									<div className={styles.teams}>
										<h3 className={styles.bold}>{game.home_team}</h3>
										<span>VS</span>
										<h3 className={styles.bold}>{game.away_team}</h3>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</Layout>
	)
}

export default EventsPage
