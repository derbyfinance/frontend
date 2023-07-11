import Layout from '@components/layout/Layout'
import Content from '@components/pages/vault/Content'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Derby Finance - Welcome to the vault'
}

export default () => {
	return (
		<Layout>
			<Content />
		</Layout>
	)
}
