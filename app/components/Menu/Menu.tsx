import Link from 'next/link'
import React, { FC } from 'react'

import styles from './Menu.module.css'

const navLink = [
	{
		name: 'Главная',
		link: '/',
	},
	{
		name: 'Категории спорта',
		link: '/sportCategory',
	},
	{
		name: 'Спортивные события',
		link: '/sportEvents',
	},
	{
		name: 'Новости',
		link: '/all-news',
	},
]

type MenuProps = {
	burger?: boolean
	header?: boolean
}

const Menu: FC<MenuProps> = ({ burger, header }) => {
	return (
		<nav
			className={`${styles.nav} ${burger ? styles.active : ''} ${
				header ? styles.headerNav : styles.nav
			}`}
		>
			<ul className='flex items-center justify-center gap-7'>
				{navLink.map(item => (
					<li key={item.link}>
						<Link href={item.link}>{item.name}</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Menu
