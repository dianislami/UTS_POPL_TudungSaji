import { createContext, useContext, useState } from 'react'

const PopupContext = createContext()

export const usePopup = () => {
    const context = useContext(PopupContext)
    if (!context) {
        throw new Error('usePopup must be used within a PopupProvider')
    }
    return context
}

export const PopupProvider = ({ children }) => {
    const [showPopup, setShowPopup] = useState(false)

    const openPopup = () => setShowPopup(true)
    const closePopup = () => setShowPopup(false)

    return (
        <PopupContext.Provider value={{
            showPopup,
            openPopup,
            closePopup
        }}>
            {children}
        </PopupContext.Provider>
    )
}