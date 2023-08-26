import { jest } from '@jest/globals'

const styled = () => jest.fn()
const css = () => jest.fn()
styled.button = () => jest.fn()
styled.div = () => jest.fn()
styled.link = () => jest.fn()
styled.span = () => jest.fn()
styled.h1 = () => jest.fn()
styled.h2 = () => jest.fn()
styled.h3 = () => jest.fn()
styled.h4 = () => jest.fn()
styled.p = () => jest.fn()
styled.header = () => jest.fn()
styled.main = () => jest.fn()
styled.aside = () => jest.fn()
styled.footer = () => jest.fn()
styled.table = () => jest.fn()
styled.thead = () => jest.fn()
styled.tfoot = () => jest.fn()
styled.tr = () => jest.fn()
styled.td = () => jest.fn()
styled.th = () => jest.fn()
styled.input = () => jest.fn()
styled.select = () => jest.fn()
styled.option = () => jest.fn()
styled.label = () => jest.fn()

const createGlobalStyle = jest.fn()
const ThemeProvider = jest.fn()

export { ThemeProvider, createGlobalStyle, css, styled }
export default styled
