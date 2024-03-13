import { fetchSports } from './action'
import SportItem from './components/SportItem/SportItem'
import Layout from './layouts/Layout'

const Page = async () => {
	const sports = await fetchSports('Soccer')

	return (
		<Layout>
			<>
				<h2>Категории спорта</h2>
				<SportItem event={sports} />
			</>
		</Layout>
	)
}

export default Page
