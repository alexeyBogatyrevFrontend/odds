import React, { Dispatch, FC, ReactNode } from 'react'
import styles from './Burger.module.css'

type BurgerProps = {
	burger: boolean
	setBurger: Dispatch<React.SetStateAction<boolean>>
}

const Burger: FC<BurgerProps> = ({ burger, setBurger }) => {
	return (
		<button
			className={`${styles.burgerMenu} ${burger ? styles.open : ''}`}
			onClick={() => setBurger(!burger)}
		>
			<div className={styles.line}></div>
			<div className={styles.line}></div>
		</button>
	)
}

export default Burger
