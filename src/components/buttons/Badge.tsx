import { ButtonHTMLAttributes } from 'react'
import { styled } from 'styled-components'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>  {
    percentage: number,
    name: string
}

const Badge = ({ percentage, name, ...props }: Props) => {
return (
      <BadgeButton
        type="button"
        name={name}
        $percentage={percentage}	
        {...props}
    >
        {percentage == 100 ? 'Max' : `${percentage}%`}
    </BadgeButton>
   )
}

const BadgeButton = styled.button<{ $percentage: number }>`
	background-color: ${({ theme, $percentage }) =>
		theme.style.colorLink + `${$percentage < 100 ? $percentage : ''}`};
	font-family: ${({ theme }) => theme.fonts.slabMedium};
	color: ${({ theme }) => theme.style.buttonColor};
	border-radius: ${({ theme }) => theme.style.radius}px;
	padding: 0 0.5em;
	cursor: pointer;

	&:disabled,
	&[disabled] {
		background-color: ${({ theme, $percentage }) =>
			theme.style.colorDisabled + `${$percentage < 100 ? $percentage : ''}`};
		opacity: 0.5;
		pointer-events: none;
		cursor: hand;
	}
`

export default Badge