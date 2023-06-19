import Layout from '@components/Layout'
import Content from '@components/pages/join/Content'
import RaceBanner from '@components/pages/race/RaceBanner'

interface Props {
	params: {
		network: string
		vault: string
	}
}
export default ({ params }: Props) => {
	return (
		<Layout aside={<RaceBanner />}>
			<Content network={params.network} vault={params.vault} />
		</Layout>
	)
}
