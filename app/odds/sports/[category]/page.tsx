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

export async function generateMetadata({
	params: { category },
}: SportsPageProps) {
	const sports = {
		Soccer: 'Футбол',
		Basketball: 'Баскетбол',
		Tennis: 'Тенис',
		'Ice%20Hockey': 'Хоккей',
		Cricket: 'Крикет',
		Boxing: 'Бокс',
	}

	// @ts-expect-error something wrong
	const title = `Спортивные события в России и Мире - ${sports[category]}`

	return {
		title: title,
	}
}

const SportsPage: FC<SportsPageProps> = async ({ params: { category } }) => {
	let key = category
	if (key.includes('%20')) {
		key = key.replace(/%20/g, ' ')
	}

	const sports: EventType[] = await fetchSports(key)

	return (
		<Layout>
			{sports.length ? (
				<>
					<h2>Категории спорта</h2>
					<SportItem event={sports} />
				</>
			) : (
				<h3 className='mb-8'>Данных по данному спорту сейчас нет</h3>
			)}
		</Layout>
	)
}

export default SportsPage
