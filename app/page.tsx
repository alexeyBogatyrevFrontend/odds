'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SportItem from './components/SportItem/SportItem'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, sportState } from './types'
import { AppDispatch, fetchNews } from '@/lib/slices/newsSlice'
import Layout from './layouts/Layout'
import handler from '@/lib/openai'
import Loader from './components/UI/Loader'

const API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY

export type EventType = {
	key: string
	group: string
	title: string
	description: string
	active: boolean
	has_outrights: boolean
}

const Page = () => {
	const { status } = useSelector((state: RootState) => state.news)
	const { category: sport } = useSelector((state: sportState) => state.sport)

	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchNews())
		}
	}, [status, dispatch])

	const router = useRouter()

	const [event, setEvent] = useState<EventType[]>([])

	const fetchData = async (sport: string) => {
		setEvent([])

		try {
			const response = await axios.get(
				'https://api.apilayer.com/odds/sports?all=false',
				{
					headers: {
						apikey: API_KEY,
					},
				}
			)

			const result: EventType[] = response.data

			result.forEach(item => {
				if (item.group === sport)
					setEvent((prev: EventType[]) => [...prev, item])
			})
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
		}
	}

	useEffect(() => {
		const storageSport = localStorage.getItem('sport')

		if (storageSport) {
			fetchData(storageSport)
		}
	}, [sport])

	return (
		<Layout>
			<h2>Категории спорта</h2>
			{!event.length && <Loader />}
			{event.length > 0 && <SportItem event={event} />}
		</Layout>
	)
}

export default Page
