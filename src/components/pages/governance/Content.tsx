'use client'

import Notification from '@components/Notification'
import useDidMountEffect from '@hooks/UseDidMountEffect'
import { toast } from 'react-toastify'

const Content = () => {
	useDidMountEffect(() => {
		toast.info(
			<Notification
				title="Governance"
				notification="Welcome to the goverance page"
			/>
		)
	}, [])

	return <h1>Governance</h1>
}

export default Content
