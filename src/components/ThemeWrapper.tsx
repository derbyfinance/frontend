import { useAppSelector } from '@hooks/ReduxStore'
import { isDarkModeState, isLargeModeState } from '@store/SettingsSlice'
import {
	darkTheme,
	largeDarkTheme,
	largeLightTheme,
	lightTheme
} from '@theme/ThemeConfig'
import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

interface Props {
	children: JSX.Element | JSX.Element[] | ReactNode
}

const ThemeWrapper = ({ children }: Props) => {
	const isDarkMode = useAppSelector<boolean | undefined>(isDarkModeState)
	const isLargeMode = useAppSelector<boolean | undefined>(isLargeModeState)

	return (
		<ThemeProvider
			theme={
				isDarkMode
					? isLargeMode
						? largeDarkTheme
						: darkTheme
					: isLargeMode
					? largeLightTheme
					: lightTheme
			}>
			{children}
		</ThemeProvider>
	)
}

export default ThemeWrapper
