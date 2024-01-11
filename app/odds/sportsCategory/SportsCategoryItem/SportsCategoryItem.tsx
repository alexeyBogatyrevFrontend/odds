import React, {
	Dispatch,
	FC,
	MouseEvent,
	SetStateAction,
	useEffect,
} from 'react'
import styles from './SportsCategoryItem.module.css'
import { sportsCategoryType } from '../SportsCategoryList/SportsCategoryList'
import Link from 'next/link'
import Image from 'next/image'

import { useDispatch, useSelector } from 'react-redux'
import { sportState } from '@/app/types'
import { AppDispatch } from '@/lib/slices/newsSlice'
import { setCategory } from '@/lib/slices/sportCategorySlice'

type SportsCategoryItemProps = {
	item: sportsCategoryType
	setSport?: Dispatch<SetStateAction<string | null>>
	active: string | null
	setActive: Dispatch<SetStateAction<string | null>>
}

const SportsCategoryItem: FC<SportsCategoryItemProps> = ({
	item,
	active,
	setActive,
}) => {
	const dispatch = useDispatch<AppDispatch>()

	const clickHandler = () => {
		// e.preventDefault()
		setActive(item.category)
		dispatch(setCategory(item.category))
		localStorage.setItem('sport', item.category)
	}

	useEffect(() => {
		const storageSport = localStorage.getItem('sport')
		if (storageSport) setActive(storageSport)
	}, [])

	return (
		<Link
			href='/'
			className={`${styles.block} ${
				active === item.category ? styles.active : ''
			}`}
			onClick={clickHandler}
		>
			<Image
				src={`/icons/${
					active === item.category ? 'white-' + item.img : item.img
				}.svg`}
				alt={item.img}
				width={24}
				height={24}
			/>
			<span>{item.title}</span>
		</Link>
	)
}

export default SportsCategoryItem
