import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import styles from './SportsCategoryList.module.css'
import SportsCategoryItem from '../SportsCategoryItem/SportsCategoryItem'
import { useSearchParams } from 'next/navigation'

const sportsCategory = [
	{
		title: 'Футбол',
		img: 'soccer',
		category: 'Soccer',
	},
	{
		title: 'Баскетбол',
		img: 'basketball',
		category: 'Basketball',
	},
	{
		title: 'Тенис',
		img: 'tennis',
		category: 'Tennis',
	},
	{
		title: 'Хоккей',
		img: 'hockey',
		category: 'Ice Hockey',
	},
	{
		title: 'Крикет',
		img: 'cricket',
		category: 'Cricket',
	},
	{
		title: 'Бокс',
		img: 'box',
		category: 'Boxing',
	},
]

export type sportsCategoryType = {
	title: string
	img: string
	category: string
}

type SportsCategoryListProps = {
	setSport?: Dispatch<SetStateAction<string | null>>
}

const SportsCategoryList: FC<SportsCategoryListProps> = () => {
	const searchParams = useSearchParams()
	const category = searchParams.get('category')

	const [active, setActive] = useState(category)
	return (
		<div className={`${styles.wrapper} mb-8`}>
			{sportsCategory.map(item => (
				<SportsCategoryItem
					item={item}
					key={item.title}
					active={active}
					setActive={setActive}
				/>
			))}
		</div>
	)
}

export default SportsCategoryList
