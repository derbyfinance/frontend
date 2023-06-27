import { styled } from 'styled-components'

import { LeadingZero } from '@functions/NumberFunction'

import CountdownModel from '@models/internal/CountdownModel'

interface Props {
	countdown?: CountdownModel
}
export default ({ countdown }: Props) => {
	return (
		<Timer>
			<span>
				{countdown?.days && countdown.days >= 2
					? LeadingZero(countdown?.days) + 'd\u00A0/ '
					: null}
			</span>
			<span>
				{LeadingZero(
					(countdown?.hours ?? 0) +
						(countdown?.days && countdown.days <= 1 ? countdown.days * 24 : 0)
				) + 'h\u00A0/ '}
			</span>
			<span>{LeadingZero(countdown?.minutes ?? 0) + 'm\u00A0/ '}</span>
			<span>{LeadingZero(countdown?.seconds ?? 0) + 's'}</span>
		</Timer>
	)
}

const Timer = styled.div`
	font-family: ${({ theme }) => theme.fonts.robotoMedium};
	font-size: 1.75em;
`
