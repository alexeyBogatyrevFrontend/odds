import React from 'react'
import Logo from '../Logo'
import Menu from '../Menu/Menu'
import styles from './Footer.module.css'
import Link from 'next/link'

const Footer = () => {
	return (
		<footer className='py-4 bg-[#181818]'>
			<div
				className={`container flex justify-between ${styles.footer__container}`}
			>
				<Link href='/'>
					<Logo />
				</Link>
				<div
					className={`flex flex-col items-end gap-4 ${styles.footer__bottom}`}
				>
					<Menu header={false} />
					<span className={`text-[#777] ${styles.copy}`}>
						Copyright &copy; 2008-2023
					</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer
