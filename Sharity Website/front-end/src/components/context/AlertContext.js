import React, { useEffect, useState } from "react"
import InfoAlert from "../InfoAlert"

const AlertContext = React.createContext({})

const AlertProvider = ({ children }) => {
	const [alert, setAlert] = useState(null)

	const createAlert = (text, variant = "primary") => {
		setAlert(<InfoAlert variant={variant}>{text}</InfoAlert>)

		setTimeout(() => {
			setAlert(null)
		}, 3000)
	}

	return (
		<AlertContext.Provider value={createAlert}>
			<>
				{children}
				{alert}
			</>
		</AlertContext.Provider>
	)
}

export default AlertContext
export { AlertProvider }
