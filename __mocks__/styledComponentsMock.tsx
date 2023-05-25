import { jest } from '@jest/globals'

const styled = () => jest.fn()
styled.button = () => jest.fn()
styled.div = () => jest.fn()
styled.link = () => jest.fn()
styled.span = () => jest.fn()
styled.h1 = () => jest.fn()
styled.h2 = () => jest.fn()
styled.h3 = () => jest.fn()
styled.h4 = () => jest.fn()
styled.header = () => jest.fn()
styled.main = () => jest.fn()
styled.aside = () => jest.fn()
styled.footer = () => jest.fn()

const createGlobalStyle = jest.fn()
const ThemeProvider = jest.fn()

export { createGlobalStyle, ThemeProvider, styled }
export default styled
