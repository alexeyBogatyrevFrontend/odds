import React from 'react'
import { fetchSports } from '../action'

const page = async () => {
	const sports = await fetchSports()
	console.log(sports)

	return <div>page</div>
}

export default page
