import { ToastContainer } from 'react-toastify'

const NotificationConfig = () => {
	return (
		<ToastContainer
			position="bottom-right"
			autoClose={5000}
			limit={2}
			hideProgressBar
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable={false}
			pauseOnHover
			theme="colored"
		/>
	)
}

export default NotificationConfig
