import Layout from '@components/Layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'My Page Title'
}

export default () => {
	const isDark = true
	return (
		<Layout>
			<div>hi</div>
		</Layout>
	)
}
