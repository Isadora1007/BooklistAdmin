import React, { useState } from 'react'
const Ctx = React.createContext()

const createProvider = (initialState = {}) => ({ children }) => {
    //Create State variable and its set state function via Hooks  
    const [appState, setAppState] = useState(initialState)

    const setGobalValue = (key, value) => setAppState(prevState => ({
        ...prevState,
        [key]:value
    }))

    return (
    <Ctx.Provider
        value={{
            state: appState,  
            setGobalValue
        }}>
        {children}
    </Ctx.Provider>
    )
}

export { createProvider, Ctx}