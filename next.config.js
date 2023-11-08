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
    },
    exclude: [
        'certificates',
        'server.js'
    ],
    async rewrites() {
        return [
            {
                source: '/subgraph/:slug*',
                destination: `${process.env.NEXT_PUBLIC_SUBGRAPH_URL}`,
                basePath: false
            },
        ]
    },
    webpack: (config) => {
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    }
}