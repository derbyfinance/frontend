interface Props {
	width?: string
	height?: string
}
const LogoIcon = ({ width = '121', height = '86' }: Props) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 121 86"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg">
			<path d="M14.7057 24.5024L12.368 34.6128L24.0368 36.6349L15.633 73.0323L3.03041 75.0544L0.699219 85.1648H24.9642L30.5667 60.8999H54.8317L57.633 48.7674H33.368L36.1693 36.6349H72.5667L71.7875 48.7674H81.8979L87.5005 24.5024H14.7057Z" />
			<path d="M93.1026 0.237305H20.3077L17.9766 10.3477L29.6454 12.3698H90.3077C96.4319 12.3698 101.629 15.2805 104.939 20.5676C106.684 23.3495 107.811 26.6274 108.294 30.3045C108.809 34.2069 108.564 38.3799 107.566 42.701C106.568 47.022 104.887 51.1885 102.569 55.0975C100.386 58.7746 97.7456 62.0524 94.7125 64.8344C88.9618 70.1214 82.4191 73.0322 76.2949 73.0322H39.8974L37.0962 85.1646H73.4936C93.5984 85.1646 114.283 66.1545 119.692 42.701C125.108 19.2474 113.201 0.237305 93.1026 0.237305Z" />
		</svg>
	)
}

export default LogoIcon
