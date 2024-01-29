import React, { FC } from 'react'
import Link from 'next/link'
import { EventType } from '@/types'

type SportTableProps = {
	event: EventType[]
}

const SportTable: FC<SportTableProps> = ({ event }) => {
	return (
		<div>
			<div className='sportCategory'>
				<div className='sportCategory__wrapper'>
					{event.map((item, index) => (
						<Link href={`/eventspage/${item.group}&${item.key}`} key={index}>
							<div className='sportCategory__item'>
								<span>{item.title}</span>
								<span>{item.description}</span>
								<span>{item.group}</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default SportTable
