export const deviceSize = {
	mobile: '360px',
	tablet: '768px',
	laptop: '1024px',
	desktop: '1366px'
}

export const device = {
	mobile: `(min-width: ${deviceSize.mobile})`,
	tablet: `(min-width: ${deviceSize.tablet})`,
	laptop: `(min-width: ${deviceSize.laptop})`,
	desktop: `(min-width: ${deviceSize.desktop})`
}
