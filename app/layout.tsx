import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Спортивные события в России и Мире',
	description:
		'Разбирайтесь в спорте с умом – наш сайт предоставляет высокоточные аналитические данные, помогая фанатам и ставочникам делать осознанные решения и оставаться в курсе последних трендов в мире спорта.',
	robots: 'all',
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
