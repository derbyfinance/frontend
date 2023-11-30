import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import CardHeader from '@components/card/CardHeader'
import { useCallback, useState } from 'react'

const RaceDescription = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true)

	const handleClick = useCallback((isOpen: boolean): void => {
		setIsOpen(!isOpen)
	}, [])

	return (
		<Card>
			<CardHeader isOpen={isOpen} handleClick={() => handleClick(isOpen)}>
				<h2>Welcome to The Race</h2>
			</CardHeader>
			<CardContent isOpen={isOpen}>
				Oh no, don&apos;t touch that. That&apos;s some new specialized weather
				sensing equipment. Hey, hey, I&apos;ve seen this one, I&apos;ve seen
				this one. This is a classic, this is where Ralph dresses up as the man
				from space. Something wrong with the starter, so I hid it. Just turn
				around, McFly, and walk away. Are you deaf, McFly? Close the door and
				beat it. Well, aren&apos;t you going up to the lake tonight, you&apos;ve
				been planning it for two weeks.
			</CardContent>
		</Card>
	)
}

export default RaceDescription
