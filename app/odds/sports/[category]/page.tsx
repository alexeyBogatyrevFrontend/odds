import { fetchSports } from '@/app/action'
import Layout from '@/app/layouts/Layout'
import React, { FC } from 'react'

import { EventType } from '@/types'
import SportItem from '@/app/components/SportItem/SportItem'

type SportsPageProps = {
	params: {
		category: string
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

export async function generateMetadata({
	params: { category },
}: SportsPageProps) {
	// @ts-expect-error something wrong
	const title = `${sportsName[category]} онлайн сегодня - прямая трансляция матчей, результаты,  расписанией на сегодня/завтра и статистика`
	// @ts-expect-error something wrong
	const description = `${sportsName[category]}: результаты всех матчей, прямые онлайн видео трансляции, расписания турниров, статистика, прогнозы. Смотри всю информацию о матчах на портале sport-odds.top`

	return {
		title,
		description,
	}
}

const SportsPage: FC<SportsPageProps> = async ({ params: { category } }) => {
	let key = category
	if (key.includes('%20')) {
		key = key.replace(/%20/g, ' ')
	}

	const sports: EventType[] = await fetchSports(key)
	console.log(sports)

	return (
		<Layout>
			{sports.length ? (
				<>
					{/* @ts-expect-error something wrong */}
					<h1>{sportsName[category]} онлайн сегодня</h1>
					<SportItem event={sports} />
				</>
			) : (
				<h3 className='mb-8'>Данных по данному спорту сейчас нет</h3>
			)}
		</Layout>
	)
}

export default SportsPage
