import 'styled-components'

declare module 'styled-components' {
	export interface DefaultFonts {
		robotoBold: string
		robotoMedium: string
		robotoRegular: string
		robotoLight: string
		slabMedium: string
		slabRegular: string
		slabLight: string
	}

	export interface DefaultStyle {
		fontSize: number
		radius?: number
		colorBg?: string
		colorText?: string
		colorLink?: string
		colorCta?: string
		colorPrimary?: string
		colorSecondary?: string
		colorBorder?: string
		colorLabel?: string
		colorHover?: string
		colorInfo?: string
		colorDisabled?: string
		colorPlaceholder?: string
		colorPositive?: string
		colorNegative?: string
		colorNeutral?: string
		buttonColor?: string
		buttonColorBg?: string
		buttonColorCtaBg?: string
		buttonActiveColor?: string
		backgroundGradient?: string
		backgroundCtaGradient?: string
		backgroundInfoGradient?: string
		backgroundWarningGradient?: string
		formBg?: string
		formInputBg?: string
		formInputBorder?: string
		cardTextColor?: string
	}

	export interface DefaultTheme {
		style: DefaultStyle
		fonts: DefaultFonts
	}
}
