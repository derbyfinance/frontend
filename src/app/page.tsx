import Layout from '@components/layout/Layout'
import Content from '@components/pages/race/Content'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Derby Finance - Welcome to the race'
}

export default () => {
	return (
		<Layout>
			<Content />
		</Layout>
	)
}
