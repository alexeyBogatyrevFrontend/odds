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

const sportsName = {
	Soccer: 'Футбол',
	Basketball: 'Баскетбол',
	Tennis: 'Тенис',
	'Ice%20Hockey': 'Хоккей',
	Cricket: 'Крикет',
	Boxing: 'Бокс',
}

export async function generateMetadata({ params: { data } }: EventsPageProps) {
	const sport = data.split('%26')[0]
	const key = data.split('%26')[1]
	const games: GamesInterface[] = await fetchEvents(key)

	const title = games.length
		? // @ts-expect-error something wrong
		  `${sportsName[sport]}, ${games[0].sport_title} ${formattedDate}: результаты прошедших матчей, расписание игр, статистика, прямые онлайн трансляции`
		: 'В данной лиге нет событий'

	const description = games.length
		? // @ts-expect-error something wrong
		  `${sportsName[sport]}, ${games[0].sport_title} ${formattedDate}: обзор результатов последних матчей, статистика, прогнозы, прямые видео онлайн трансляции, расписание матчей на сегодня/завтра, турнирные таблицы. Смотри всю информацию о матчах ${games[0].sport_title} на портале sport-odds.top`
		: 'В данной лиге нет событий'

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
			{!games.length && <h1>В данной лиге нет событий</h1>}
			{games.length > 0 && (
				<div className='mb-8'>
					<h1>
						{games[0].sport_title} {formattedDate}
					</h1>
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
