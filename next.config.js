export default {
    productionBrowserSourceMaps: true,
    onDemandEntries: {
        maxInactiveAge: 1000 * 60 * 60,
        pagesBufferLength: 5
    },
    trailingSlash: false,
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        styledComponents: true
    }
}