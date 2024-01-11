import React, { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'

type WhatSportProps = {
	setSport: Dispatch<SetStateAction<string>>
}

const initialValue = 'American Football'

const WhatSport: FC<WhatSportProps> = ({ setSport }) => {
	const [sportValue, setSportValue] = useState(initialValue)

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setSport(sportValue)
		setSportValue(initialValue)
	}

	return (
		<form onSubmit={e => submitHandler(e)}>
			<select
				value={sportValue}
				onChange={e => setSportValue(e.target.value)}
				className='border border-black py-1 px-3'
			>
				<option value='American Football'>American Football</option>
				<option value='Basketball'>Basketball</option>
				<option value='Boxing'>Boxing</option>
				<option value='Cricket'>Cricket</option>
				<option value='Golf'>Golf</option>
				<option value='Ice Hockey'>Ice Hockey</option>
				<option value='Mixed Martial Arts'>Mixed Martial Arts</option>
				<option value='Politics'>Politics</option>
				<option value='Soccer'>Soccer</option>
			</select>
			<button className='py-1 px-3 border border-black'>All</button>
		</form>
	)
}

export default WhatSport
