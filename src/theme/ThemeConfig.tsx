import {
	DefaultFonts,
	DefaultStyle,
	DefaultTheme,
	createGlobalStyle
} from 'styled-components'

export const GlobalStyles = createGlobalStyle`

    @font-face {
        font-family: "Roboto-Bold";
        src: url("/fonts/roboto/Roboto-Bold.ttf");
        font-weight: 700;
    }

    @font-face {
        font-family: "Roboto-Medium";
        src: url("/fonts/roboto/Roboto-Medium.ttf");
        font-weight: 500;
    }

    @font-face {
        font-family: "Roboto-Regular";
        src: url("/fonts/roboto/Roboto-Regular.ttf");
        font-weight: 400;
    }

    @font-face {
        font-family: "Roboto-Light";
        src: url("/fonts/roboto/Roboto-Light.ttf");
        font-weight: 300;
    }

    @font-face {
        font-family: "Slab-Medium";
        src: url("/fonts/roboto-slab/RobotoSlab-Medium.ttf");
        font-weight: 500;
    }

    @font-face {
        font-family: "Slab-Regular";
        src: url("/fonts/roboto-slab/RobotoSlab-Regular.ttf");
        font-weight: 400;
    }

    @font-face {
        font-family: "Slab-Light";
        src: url("/fonts/roboto-slab/RobotoSlab-Light.ttf");
        font-weight: 300;
    }

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

        ::-webkit-scrollbar {
            background-color: ${({ theme }) => theme.style.colorBg};
            border: 1px solid ${({ theme }) => theme.style.colorBorder};
            border-radius: ${({ theme }) => theme.style.radius}px;
            width: ${({ theme }) => theme.style.radius + 2}px;
        }

        ::-webkit-scrollbar-thumb {
            background-color: ${({ theme }) => theme.style.colorSecondary};
            border-radius: ${({ theme }) => theme.style.radius}px;
        }
    }

    body {
        font-size: ${({ theme }) => theme.style.fontSize}px;
        color: ${({ theme }) => theme.style.colorText};
        background-color: ${({ theme }) => theme.style.colorBg};
        font-family: ${({ theme }) => theme.fonts.robotoRegular};
        line-height: 1.75em;
        height: 100%;
    }

    h1, h2, h3 {
        font-family: ${({ theme }) => theme.fonts.slabMedium};        
        color: ${({ theme }) => theme.style.colorSecondary};
        font-size: 1.625em;
    }

    h2, h3 {
        color: inherit;
    }

    h3 {
        font-size: 1.5em;
    }

    p {
        font-family: ${({ theme }) => theme.fonts.robotoMedium};
        color: ${({ theme }) => theme.style.colorLabel};
        margin: 0.5em 0;

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
	radius: 6,
	colorBg: '#fff',
	colorText: '#160344',
	colorLink: '#2775C9',
	colorCta: '#F13ABC',
	colorBorder: '#E2E2E2',
	colorSecondary: '#5F08EE',
	colorLabel: '#A9A6AE',
	colorHover: '#f5f5f5',
	colorPlaceholder: '#959190',
	buttonColor: '#FFF',
	buttonColorBg:
		'linear-gradient(90deg, rgb(254, 94, 118) 0%, rgb(241, 58, 188) 100.33%)',
	buttonColorCtaBg: '#39079b',
	backgroundGradient:
		'linear-gradient(149.11deg, #f13abc 0.41%, #5f08ee 99.26%)',
	backgroundCtaGradient: 'linear-gradient(93.03deg, #1D08EE 0%, #F13ABC 100%)',
	formBg: '#2775C905'
}

const darkThemeStyle: DefaultStyle = { ...lightThemeStyle }

export const lightTheme: DefaultTheme = {
	style: lightThemeStyle,
	fonts
}

export const darkTheme: DefaultTheme = {
	style: darkThemeStyle,
	fonts
}
