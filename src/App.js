import Input from './components/input/Input'
import Login from './components/login/Login'
import { useEffect, useState, useCallback } from 'react'
function App() {
	const [log, setLog] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const fetchLog = useCallback(async () => {
		setIsLoading(true)
		try {
			const response = await fetch(
				'https://login-http-react-default-rtdb.firebaseio.com/login.json',
			)
			if (!response.ok) {
				throw new Error('Something went wrong!')
			}

			const data = await response.json()
			console.log(data.key)

			if (data.key === 'isLoggedIn') {
				setLog(true)
			} else {
				setLog(false)
			}
			setIsLoading(false)
		} catch (error) {}
	}, [])
	useEffect(() => {
		fetchLog()
	}, [fetchLog])

	async function getInpLog(email, login, password) {
		console.log('login')
		// setLog((prev) => !prev)
		const response = await fetch(
			'https://login-http-react-default-rtdb.firebaseio.com/login.json',
			{
				method: 'PUT',
				body: JSON.stringify({
					key: 'isLoggedIn',
					email: email,
					login: login,
					password: password,
				}),
				headers: {
					'Content-type': 'application/json',
				},
			},
		)

		const data = await response.json()
		setLog((prev) => !prev)
	}

	async function logoutHandler() {
		setIsLoading(true)
		console.log('logout')
		const response = await fetch(
			'https://login-http-react-default-rtdb.firebaseio.com/login.json',
			{
				method: 'PUT',
				body: JSON.stringify({
					key: 'isLoggedOut',
				}),
				headers: {
					'Content-type': 'application/json',
				},
			},
		)

		const data = await response.json()

		setLog((prev) => !prev)
	}

	let content

	if (log) {
		content = <Login onLogout={logoutHandler} />
	}
	if (!log) {
		content = <Input getInpLog={getInpLog} />
	}
	return <div className='App'>{content}</div>
}

export default App
