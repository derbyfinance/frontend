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
        colorBg: string
        colorText: string
        // textMain: string
        // textSecondary: string
        // textTertiary: string
        // textFaded: string
        // textError: string
        // textWalletInfo: string
        // backgroundMain: string
        // backgroundMainForToggle: string
        // backgroundForTable: string
        // backgroundChart: string
        // headerMain: string
        // iconColor: string
        // buttonMain: string,
        // tabDepositWithdrawActive: string
        // buttonActive: string
        // gradientMain: string
        // gradientWallet: string
        // gradientTwo: string
        // borderMain: string
        // borderSecondary: string
        // borderTertiary: string
        // borderFaded: string
        // listHover: string
        // textBalancePositive: string
        // online: string
        // textBalanceNegative: string
        // modalOverlay: string
        // vaultTitle: string
        // errorBackground: string
        // changeLabelGreen: string
        // colorTableLabel: string
    }

    export interface DefaultTheme {
        style: DefaultStyle
        fonts: DefaultFonts
    }
}