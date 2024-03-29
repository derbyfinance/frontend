import {
	DefaultFonts,
	DefaultStyle,
	DefaultTheme,
	createGlobalStyle
} from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        outline: none;
        list-style: none;
        border: none;
        background: none;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
        color: inherit;
    }

    html {
        height: 100%;
        scrollbar-gutter: stable;
    }

    body {
        font-size: ${({ theme }) => theme.style.fontSize}px;
        color: ${({ theme }) => theme.style.colorText};
        background-color: ${({ theme }) => theme.style.colorBg};
        font-family: ${({ theme }) => theme.fonts.robotoRegular};
        line-height: 1.75em;
        height: 100%;
        overflow: auto;
        
        &.modal-open {
            overflow: hidden;
            transition: margin-right 0.5s step-start, overflow 0.6s step-start;
        }
    }

    h1 {
        line-height: 2em;
        border-bottom: 1px solid ${({ theme }) => theme.style.colorText};
    }

    h1, h2, h3, h4 {
        font-family: ${({ theme }) => theme.fonts.slabMedium};        
        color: ${({ theme }) => theme.style.colorSecondary};
        font-size: 1.625em;
    }

    h2, h3, h4 {
        color: inherit;
    }

    h3 {
        font-size: 1.5em;
    }

    h4 {
        font-family: ${({ theme }) => theme.fonts.robotoMedium};  
        font-size: 1.25em;
    }

    p {
        font-family: ${({ theme }) => theme.fonts.robotoRegular};
        color: ${({ theme }) => theme.style.colorLabel};
        margin: 0.5em 0;
    }

    u {
        text-decoration: underline;
    }

    svg {
        display: inline-block;
        vertical-align: middle;
    }
`

const fonts: DefaultFonts = {
	robotoBold: ' Roboto-Bold',
	robotoMedium: 'Roboto-Medium',
	robotoRegular: 'Roboto-Regular',
	robotoLight: 'Roboto-Light',
	slabMedium: 'Slab-Medium',
	slabRegular: 'Slab-Regular',
	slabLight: 'Slab-Light'
}

const lightThemeStyle: DefaultStyle = {
	fontSize: 16,
	radius: 8,
	colorBg: '#fff',
	colorText: '#160344',
	colorLink: '#2775C9',
	colorCta: '#F13ABC',
	colorBorder: '#E2E2E2',
	colorPrimary: '#FE5E76',
	colorSecondary: '#5F08EE',
	colorLabel: '#A9A6AE',
	colorInfo: '#D9E7F5',
	colorHover: '#16034410',
	colorDisabled: '#A9A6AE',
	colorPlaceholder: '#959190',
	colorPositive: '#26A17B',
	colorNegative: '#e74c3c',
	colorNeutral: '#3498db',
	buttonColor: '#FFF',
	buttonColorBg:
		'linear-gradient(90deg, rgb(254, 94, 118) 0%, rgb(241, 58, 188) 100.33%)',
	buttonColorCtaBg: '#39079b',
	buttonActiveColor: '#16034475',
	backgroundGradient:
		'linear-gradient(149.11deg, #f13abc 0.41%, #5f08ee 99.26%)',
	backgroundCtaGradient: 'linear-gradient(180deg, #1D08EE 0%, #F13ABC 100%)',
	backgroundInfoGradient: 'linear-gradient(180deg, #39079B 0%, #2775C9 100%)',
	backgroundWarningGradient:
		'linear-gradient(180deg, #F13ABC 0%, #FE5E76 100%)',
	formBg: '#F4F8FC',
	formInputBg: '#fff',
	formInputBorder: '#E2E2E2',
	cardColorBg: '#ffffff',
	cardTextColor: '#160344'
}

const darkThemeStyle: DefaultStyle = {
	...lightThemeStyle,
	...{
		colorBg: '#160344',
		colorText: '#fff',
		colorHover: '#ffffff75',
		colorSecondary: '#fff',
		cardColorBg: '#100429',
		cardTextColor: '#160344',
		colorBorder: '#160344',
		buttonActiveColor: 'rgba(232, 242, 253, .75)'
	}
}

export const lightTheme: DefaultTheme = {
	style: lightThemeStyle,
	fonts
}

export const darkTheme: DefaultTheme = {
	style: darkThemeStyle,
	fonts
}

const largeStyle: DefaultStyle = { fontSize: 24 }

export const largeDarkTheme: DefaultTheme = {
	style: { ...darkThemeStyle, ...largeStyle },
	fonts: fonts
}

export const largeLightTheme: DefaultTheme = {
	style: { ...lightThemeStyle, ...largeStyle },
	fonts: fonts
}
