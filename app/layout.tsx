import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Спортивные события в России и Мире',
	description:
		'Разбирайтесь в спорте с умом – наш сайт предоставляет высокоточные аналитические данные, помогая фанатам и ставочникам делать осознанные решения и оставаться в курсе последних трендов в мире спорта.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<StoreProvider>
			<html lang='en'>
				<body className={inter.className}>{children}</body>
			</html>
		</StoreProvider>
	)
}
