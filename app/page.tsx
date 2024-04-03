import { fetchSports } from './action'
import SportItem from './components/SportItem/SportItem'
import Layout from './layouts/Layout'

const Page = async () => {
	const sports = await fetchSports('Soccer')

	return (
		<Layout>
			<>
				<h1>Матч-центр</h1>
				<SportItem event={sports} />
			</>
		</Layout>
	)
}

export default Page
