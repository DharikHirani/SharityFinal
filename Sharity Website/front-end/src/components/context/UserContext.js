import React, { useEffect, useState } from "react"

const UserContext = React.createContext({})

const UserProvider = ({ children }) => {
	const [userSignedIn, setUserSignedIn] = useState(false)
	const [user, setUser] = useState({})
	const [ready, setReady] = useState(false)

	const signIn = (userData) => {
		setUser(userData)
		localStorage.setItem('user', JSON.stringify(userData))
		setUserSignedIn(true)
	}

	const signOut = () => {
		setUser({})
		localStorage.removeItem('user')
		setUserSignedIn(false)
	}

	useEffect(() => {
		// on first load
		// to-do: look up session id, and check with the back-end if not expired

		const currentUser = localStorage.getItem('user')
		if (currentUser) {
			setUser(JSON.parse(currentUser));
			setUserSignedIn(true);
		}

		setReady(true);
	}, [])

	return (
		<UserContext.Provider value={{ userSignedIn, user, signIn, signOut, ready }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
export { UserProvider }
