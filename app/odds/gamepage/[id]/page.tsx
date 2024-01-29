import { fetchEvents } from '@/app/action'

import Layout from '@/app/layouts/Layout'
import { formatDate } from '@/app/utils/formatDate'
import { FC } from 'react'

import styles from '../GamePage.module.css'
import generateText from '@/lib/openai'
import { GamesInterface } from '@/app/types'

type GamePageProps = {
	params: {
		id: string
	}
}

export async function generateMetadata({ params: { id } }: GamePageProps) {
	const key = id.split('%26')[0]
	const gameId = id.split('%26')[1]

	const games: GamesInterface[] = await fetchEvents(key)
	const game = games.filter(game => game.id === gameId)[0]

	const title = `${game.home_team} VS ${game.away_team} | ${game.sport_title}`
	const description =
		`${game.gptText?.split('.')[0]}` + `${game.gptText?.split('.')[1]}`

	return {
		title: title,
		description: description,
	}
}

const GamePage: FC<GamePageProps> = async ({ params: { id } }) => {
	const key = id.split('%26')[0]
	const gameId = id.split('%26')[1]

	const games: GamesInterface[] = await fetchEvents(key)
	const game = games.filter(game => game.id === gameId)[0]

	const date =
		formatDate(game.commence_time).dayOfMonth +
		' ' +
		formatDate(game.commence_time).month

	// const generatedText = await generateText(game.home_team, game.away_team, date)

	return (
		<Layout>
			<div className='mb-8'>
				<h2>Спортивное событие</h2>
				<div className={styles.block}>
					<div
						className={styles.block__game}
						style={{
							background:
								"url('/sport-event/soccer.png') center center / cover no-repeat",
						}}
					>
						<div className={styles.game}>
							<h2>{game.home_team}</h2>
							<h2>VS</h2>
							<h2>{game.away_team}</h2>
						</div>
						<div className={styles.game__date}>
							<strong>
								{formatDate(game.commence_time).dayOfMonth}{' '}
								{formatDate(game.commence_time).month}{' '}
							</strong>
							<span>
								{formatDate(game.commence_time).dayOfWeek},{' '}
								{formatDate(game.commence_time).time}
							</span>
						</div>
					</div>

					<div className='text-gray-400 text-center text-sm bg-gray-200  p-6 rounded-xl my-4'>
						<p>{game.gptText}</p>
					</div>

					<div className='proposal mb-8'>
						<h2 className='proposal__title'>Букмекеры</h2>
						<div className='flex gap-4 overflow-x-auto pb-2'>
							{game.bookmakers.map((bookmaker, index) => (
								<div className={styles.bookmakers} key={index}>
									<div className='bookmakers__wrapper'>
										<div className='bookmakers__time'>
											{/* {formatDate(bookmaker.last_update)} */}
										</div>
										<h3 className='bookmakers__title'>{bookmaker.title}</h3>
									</div>
									<div className='bookmakers__stakes-wrapper'>
										{bookmaker.markets.map((market, index) => (
											<div className='bookmakers__stakes' key={index}>
												<hr />
												{market.outcomes.map((outcome, index) => (
													<div key={index}>
														{outcome.name} - ({outcome.price})
													</div>
												))}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					<h3>
						Смотреть онлайн трансляцию {game.home_team} — {game.away_team}. Лига
						чемпионов. {formatDate(game.commence_time).dayOfMonth}{' '}
						{formatDate(game.commence_time).month}{' '}
					</h3>

					<p>
						Онлайн результат матча {game.home_team} — {game.away_team} доступен
						на нашем сайте бесплатно, без регистрации. Прямой эфир может
						проходить с небольшой задержкой от реального времени. Также можете
						выбрать альтернативные источники трансляции.
					</p>

					<div className={styles.bg}></div>
				</div>
			</div>
		</Layout>
	)
}

export default GamePage
