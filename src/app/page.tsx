import Layout from '@components/layout/Layout'
import Content from '@components/pages/restake/Content'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Derby Finance - Welcome to the race'
}

const Page = () => {
	return (
		<Layout isFullPage isSmall>
			<Content />
		</Layout>
	)
}

export default Page
