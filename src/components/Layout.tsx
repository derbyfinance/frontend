'use client'

import { GlobalStyles, darkTheme, lightTheme } from '@theme/ThemeConfig'
import { useState } from 'react'
import { ThemeProvider } from 'styled-components'

interface Props {
	children: JSX.Element | JSX.Element[] | React.ReactNode
}

export default ({ children }: Props) => {
	const [isDark, setIsDark] = useState<boolean>(true)

	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<GlobalStyles />
			{children}
		</ThemeProvider>
	)
}
