import { fetchEvents } from '@/app/action'
import Layout from '@/app/layouts/Layout'

import Link from 'next/link'
import React, { FC } from 'react'

import styles from '../EventsPage.module.css'
import { formatDate } from '@/app/utils/formatDate'
import { GamesInterface } from '@/types'
import { formattedDate } from '@/app/layout'

type EventsPageProps = {
	params: {
		data: string
	}
}

export async function generateMetadata({ params: { data } }: EventsPageProps) {
	const key = data.split('%26')[1]
	const games: GamesInterface[] = await fetchEvents(key)

	const title = `${games[0].sport_title} ${formattedDate}: прямая онлайн трансляция, статистика матча, прогнозы`
	const description = `${games[0].sport_title} ${formattedDate}: смотреть онлайн трансляцию матча в прямом эфире. Вся информация о матче: статистика, прогнозы, новости, видео, интервью. `

	return {
		title,
		description,
	}
}

const EventsPage: FC<EventsPageProps> = async ({ params: { data } }) => {
	const key = data.split('%26')[1]
	const group = data.split('%26')[0]

	const games: GamesInterface[] = await fetchEvents(key)
	// console.log(games)

	return (
		<Layout>
			{games.length > 0 && (
				<div className='mb-8'>
					<h1>
						{games[0].sport_title} {formattedDate}
					</h1>
					<div className={styles.wrapper}>
						{games.map((game, index) => (
							<Link
								href={`/odds/gamepage/${group}&${key}&${game.id}?category=${group}`}
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
