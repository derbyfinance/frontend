import Layout from '@components/layout/Layout'
import Content from '@components/pages/join/Content'

interface Props {
	params: {
		network: string
		vault: string
	}
}
const Page = ({ params }: Props) => {
	return (
		<Layout>
			<Content network={params.network} vault={params.vault} />
		</Layout>
	)
}

export default Page