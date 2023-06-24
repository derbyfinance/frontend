import { Small } from '@components/fonts/Title'
import MedalBronzeIcon from '@components/icons/medalIcons/MedalBronzeIcon'
import MedalGoldIcon from '@components/icons/medalIcons/MedalGoldIcon'
import MedalSilverIcon from '@components/icons/medalIcons/MedalSilverIcon'
import { styled } from 'styled-components'

interface Props {
	$amount: number
	$type: 'Gold' | 'Silver' | 'Bronze'
}

const RewardBox = ({ $amount, $type }: Props) => {
	return (
		<Reward $isDisabled={$amount === 0}>
			{$type === 'Gold' ? (
				<MedalGoldIcon />
			) : $type === 'Silver' ? (
				<MedalSilverIcon />
			) : (
				<MedalBronzeIcon />
			)}
			<div>
				<RewardTotal>
					{$amount}
					{$amount > 0 ? <Small>x</Small> : null}
				</RewardTotal>
				<RewardLabel>{$type}</RewardLabel>
			</div>
		</Reward>
	)
}

const Reward = styled.div<{ $isDisabled: boolean }>`
	font-family: ${({ theme }) => theme.fonts.robotoMedium};
	display: flex;
	align-items: center;

	${({ $isDisabled, theme }) =>
		$isDisabled &&
		`
        color: ${theme.style.colorDisabled};
        filter: grayscale(100%);
        opacity: 0.5;
    `}
`
const RewardTotal = styled.div`
	font-size: 2em;
`
const RewardLabel = styled.div`
	color: ${({ theme }) => theme.style.colorLabel};
`

export default RewardBox
