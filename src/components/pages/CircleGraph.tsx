import { useEffect, useState } from 'react'

interface Props {
	initial?: number
	current?: number
	color?: `#${string}`
	stroke?: number
	size?: string
}

export default ({
	color = '#FFFFFF',
	stroke = 10,
	size = '100%',
	initial = 100,
	current = 0
}: Props) => {
	const [percent, setPercent] = useState<number>(0)

	const circle = 50
	const radius = Math.max(1, circle - Math.floor(stroke / 2))

	const circumference = Math.round(radius * 2 * 3.14)

	const calculatePercent = () => {
		const result = -Math.round(((initial - current) / initial) * circumference)
		setPercent(result)
	}

	useEffect(() => {
		calculatePercent()
	}, [current])

	return (
		<svg width={size} height={size} viewBox="0 0 100 100">
			<g>
				<circle
					cx={circle}
					cy={circle}
					r={radius}
					stroke={`${color}50`}
					strokeWidth={stroke}
					fill="none"
				/>
				<circle
					cx={circle}
					cy={circle}
					r={radius}
					stroke={color}
					strokeWidth={stroke}
					fill="none"
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={percent}
					transform={`rotate(-90 ${circle} ${circle})`}
				/>
			</g>
		</svg>
	)
}
