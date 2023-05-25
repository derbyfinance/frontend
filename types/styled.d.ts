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
        radius: number
        colorBg: string
        colorText: string
        colorCta: string
        colorSecondary: string
        colorBorder: string
        colorLabel: string
        buttonColor: string
        buttonColorBg: string
        buttonColorCtaBg: string
        backgroundGradient: string
        backgroundCtaGradient: string
    }

    export interface DefaultTheme {
        style: DefaultStyle
        fonts: DefaultFonts
    }
}