import React, { FC, useState } from 'react'
import Logo from './Logo'
import Menu from './Menu/Menu'
import Burger from './UI/Burger/Burger'
import Link from 'next/link'

const Header = () => {
	const [burger, setBurger] = useState(false)

	return (
		<header className='py-4 bg-[#181818] relative z-10'>
			<div className='container flex justify-between'>
				<Link href='/'>
					<Logo />
				</Link>
				<Burger burger={burger} setBurger={setBurger} />
				<Menu burger={burger} header={true} />
			</div>
		</header>
	)
}

export default Header
