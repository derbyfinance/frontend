import { styled } from 'styled-components'

interface Props {
	title?: string
	notification: string
}
const Notification = ({ title, notification }: Props) => {
	return (
		<div>
			<h4>{title ?? 'notification'}</h4>
			<Context>{notification}</Context>
		</div>
	)
}

export default Notification

const Context = styled.p`
	color: inherit;
`
