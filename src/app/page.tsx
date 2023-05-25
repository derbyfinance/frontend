import Layout from '@components/Layout'
import Content from '@components/pages/vault/Content'

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
