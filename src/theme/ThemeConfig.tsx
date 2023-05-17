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
    }

    body {
        font-size: ${({ theme }) => theme.style.fontSize}px;
        color: ${({ theme }) => theme.style.colorText};
        background-color: ${({ theme }) => theme.style.colorBg};
        font-family: ${({ theme }) => theme.fonts.robotoRegular};
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
	colorBg: '#fff',
	colorText: '#160344'
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
