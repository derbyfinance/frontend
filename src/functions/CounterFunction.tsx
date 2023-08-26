import CountdownModel from '@models/internal/CountdownModel'
import { useEffect, useState } from 'react'

interface Props {
	stop?: 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su'
}
export const StartCountdown = ({
	stop = 'fr'
}: Props): CountdownModel | undefined => {
	const [countdown, setCountdown] = useState<CountdownModel | undefined>(
		undefined
	)

	const days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa']
	const secondsInWeek: number = 604800

	const selectEndDate = (now: Date, endDay: number) => {
		const endDate = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + endDay,
			23,
			59,
			59
		)
		return endDate
	}

	const getDaysTillEnd = (now: Date): number => {
		const toDay = now.getDay()
		const endDay = days.indexOf(stop)

		const first: number = endDay - toDay
		const second: number = 7 - Math.abs(endDay - toDay)

		return first < 0 ? second : first
	}

	const getRemainingTime = (start: Date, end: Date): number => {
		const remaining = Math.max(
			0,
			Math.floor((end.getTime() - start.getTime()) / 1000)
		)
		return remaining
	}

	const calculateTime = () => {
		const now = new Date()
		const endDay = getDaysTillEnd(now)
		const endDate = selectEndDate(now, endDay)
		const time = getRemainingTime(now, endDate)

		const result: CountdownModel = {
			days: Math.floor(time / (3600 * 24)),
			hours: Math.floor((time / 3600) % 24),
			minutes: Math.floor((time / 60) % 60),
			seconds: time % 60,
			time: time,
			start: secondsInWeek
		}

		setCountdown(result)
	}

	useEffect(() => {
		const interval = setInterval(calculateTime, 1000)
		return () => clearInterval(interval)
	}, [])

	return countdown
}
