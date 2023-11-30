import { device } from '@helpers/DeviceHelper'
import { useCallback } from 'react'
import { styled } from 'styled-components'

const PageSize = () => {
	const showFontSize = useCallback((): void => {
		const list: number[] = [
			2, 1.875, 1.75, 1.625, 1.5, 1.375, 1.25, 1.125, 1, 0.875, 0.75, 0.625,
			0.5, 0.375, 0.25, 0.125
		]

		console.log(
			'fontsize 16px / 24px: ',
			list.map((x) => `${x}em ==> ${x * 16}px / ${x * 24}px `)
		)
	}, [])

	return Boolean(JSON.parse(process.env.NEXT_PUBLIC_DEBUG ?? 'false')) ? (
		<Size onClick={showFontSize} />
	) : null
}

const Size = styled.div`
	display: block;
	padding: 0.5em;
	background-color: ${({ theme }) => theme.style.colorText};
	color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 2;
	opacity: 0.8;
	cursor: pointer;

	&::before {
		@media ${device.mobile} {
			content: 'Mobile';
		}

		@media ${device.tablet} {
			content: 'Tablet';
		}

		@media ${device.laptop} {
			content: 'Laptop';
		}

		@media ${device.desktop} {
			content: 'Desktop';
		}
	}
`
export default PageSize
