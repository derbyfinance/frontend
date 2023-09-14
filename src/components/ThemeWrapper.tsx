import { useAppSelector } from '@hooks/ReduxStore'
import { isDarkModeState } from '@store/SettingsSlice'
import { darkTheme, lightTheme } from '@theme/ThemeConfig'
import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

interface Props {
	children: JSX.Element | JSX.Element[] | ReactNode
}

const ThemeWrapper = ({ children }: Props) => {
	const isDarkMode = useAppSelector<boolean | undefined>(isDarkModeState)

	return (
		<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
			{children}
		</ThemeProvider>
	)
}

export default ThemeWrapper
