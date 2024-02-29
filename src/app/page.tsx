import Layout from '@components/layout/Layout'
import Content from '@components/pages/restake/Content'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Akko - Welcome to Akko'
}

const Page = () => {
	return (
		<Layout isSmall>
			<Content />
		</Layout>
	)
}

export default Page
