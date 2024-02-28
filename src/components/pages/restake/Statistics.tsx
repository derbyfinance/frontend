import { device } from '@helpers/DeviceHelper'
import { useAppSelector } from '@hooks/ReduxStore'
import TableHeaderModel from '@models/internal/TableHeaderModel'
import { getTvlState } from '@store/ExchangeSlice'
import { styled } from 'styled-components'

const Statistics = () => {
	const tvl = useAppSelector<number | undefined>(getTvlState)

	const headers: TableHeaderModel[] = [
		{ name: 'Total Value Locked', align: 'left' },
		{ name: 'APR', align: 'right' },
		{ name: 'Restaking Points', align: 'right' },
		{ name: 'Akko Points', align: 'right' }
	]

	const list: string[] = [
		`${tvl} ETH / $ 12,001,200`,
		'3.7%',
		'10,123,456,789',
		'5,123,456'
	]

	return (
		<Container>
			{headers.map(({ name }, key) => (
				<Block key={key}>
					<Title>{name}</Title>
					<Data>{list.find((_, index) => index === key)}</Data>
				</Block>
			))}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 0.5em;

	& > div {
		padding: 1em 0;

		&:not(:last-child) {
			border-bottom: 1px solid ${({ theme }) => theme.style.colorBorder};
		}
	}

	@media ${device.laptop} {
		flex-direction: row;

		& > div {
			padding: 1em;
			border-bottom: none !important;

			&:not(:last-child) {
				border-right: 1px solid ${({ theme }) => theme.style.colorBorder};
			}
		}
	}
`
const Block = styled.div``
const Title = styled.div`
	font-family: ${({ theme }) => theme.fonts.slabLight};
	text-align: center;

	@media ${device.laptop} {
		text-align: left;
	}
`
const Data = styled.div`
	font-weight: bold;
	text-align: center;

	@media ${device.laptop} {
		text-align: right;
	}
`
export default Statistics
