'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SportItem from './components/SportItem/SportItem'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { EventType, RootState, sportState } from '../types'
import { AppDispatch } from '@/lib/slices/newsSlice'
import Layout from './layouts/Layout'
import Loader from './components/UI/Loader'

const API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY

const Page = () => {
	const [event, setEvent] = useState<EventType[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()
	const searchParams = useSearchParams()

	const category = searchParams.get('category')

	const { status } = useSelector((state: RootState) => state.news)
	const { category: sport } = useSelector((state: sportState) => state.sport)

	const dispatch = useDispatch<AppDispatch>()

	const fetchData = async (sport: string) => {
		setEvent([])
		setIsLoading(true)
		try {
			const response = await axios.get('./api/oddsData/sports')

			const result: EventType[] = response.data.sports

			result.forEach(item => {
				if (item.group === sport)
					setEvent((prev: EventType[]) => [...prev, item])
			})
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		router.push(`/?category=${category}`)
		if (category) fetchData(category)
	}, [])

	useEffect(() => {
		if (sport) {
			router.push(`/?category=${sport}`)
			fetchData(sport)
		}
	}, [router, sport])

	return (
		<Layout>
			<h2>Категории спорта</h2>
			{isLoading && <Loader />}
			{event.length === 0 && <h3>Данных по данному спорту нет</h3>}
			{event.length > 0 && <SportItem event={event} />}
		</Layout>
	)
}

export default Page
