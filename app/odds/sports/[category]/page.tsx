import { fetchEvents, fetchSports } from '@/app/action'
import Layout from '@/app/layouts/Layout'

import Link from 'next/link'
import React, { FC } from 'react'

import { formatDate } from '@/app/utils/formatDate'
import { EventType, GamesInterface } from '@/types'
import SportItem from '@/app/components/SportItem/SportItem'

type SportsPageProps = {
	params: {
		category: string
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
				<SportItem event={sports} />
			) : (
				<h3 className='mb-8'>Данных по данному спорту сейчас нет</h3>
			)}
		</Layout>
	)
}

export default SportsPage
