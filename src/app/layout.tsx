import '../theme/globalImports.css'

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
	icons: [
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/favicon.png'
		}
	]
}

interface Props {
	children: React.ReactNode
}

export default ({ children }: Props) => {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
