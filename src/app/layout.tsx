import '../theme/globalImports.css'

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
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
