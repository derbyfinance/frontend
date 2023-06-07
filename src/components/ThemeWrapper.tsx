import { isDarkModeState } from '@store/SettingsSlice'
import { AppState } from '@store/Store'
import { darkTheme, lightTheme } from '@theme/ThemeConfig'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'

interface Props {
	children: JSX.Element | JSX.Element[]
}

const ThemeWrapper = ({ children }: Props) => {
	const isDarkMode = useSelector<AppState, boolean>(isDarkModeState)
	return (
		<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
			{children}
		</ThemeProvider>
	)
}

export default ThemeWrapper
