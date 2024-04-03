import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })

const months = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря',
]

const date = new Date()
export const formattedDate = `${date.getDate()} ${
	months[date.getMonth()]
} ${date.getFullYear()}`

export const metadata: Metadata = {
	robots: 'all',
	title: `Матчи на сегодня ${formattedDate} - прямая онлайн трансляция, расписание, результаты, прогнозы на спортивные события в России и Мире`,
	description:
		'Все спортивные события в России и Мире: смотреть онлайн матчи. Статистика и результаты игр, итоги соревнований, расписание турниров, прямые трансляции, прогнозы и коэффициенты',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<StoreProvider>
			<html lang='ru'>
				<body className={inter.className}>
					{children}
					{/* Yandex.Metrika counter */}
					<script
						type='text/javascript'
						dangerouslySetInnerHTML={{
							__html: `
                                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                                m[i].l=1*new Date();
                                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                            
                                ym(96725873, "init", {
                                    clickmap:true,
                                    trackLinks:true,
                                    accurateTrackBounce:true,
                                    webvisor:true
                                });
                            `,
						}}
					/>
					<noscript>
						<div>
							<img
								src='https://mc.yandex.ru/watch/96725873'
								style={{ position: 'absolute', left: '-9999px' }}
								alt=''
							/>
						</div>
					</noscript>
					{/* /Yandex.Metrika counter */}
				</body>
			</html>
		</StoreProvider>
	)
}
