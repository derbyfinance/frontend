import Layout from '@components/Layout'
import Content from '@components/pages/join/Content'
import RaceBanner from '@components/pages/race/RaceBanner'

export default () => {
	return (
		<Layout aside={<RaceBanner />}>
			<Content network="" vault="" />
		</Layout>
	)
}
