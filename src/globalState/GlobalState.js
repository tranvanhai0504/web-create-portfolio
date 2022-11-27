import { createContext } from 'react'
import { useState, useEffect } from 'react'

const GlobalContext = createContext()

function GlobalProvider({children}){
    const data = JSON.parse(localStorage.getItem('theme'))||'light'
    const [theme, setTheme] = useState(data)
    const toggleTheme = () => {
        setTheme(theme==='light'? 'dark' : 'light')
    }

    useEffect(()=>{
        localStorage.setItem('theme', JSON.stringify(theme))
    }, [theme])
    const value = {
        theme,
        toggleTheme
    }
    return (
        <GlobalContext.Provider
            value={value}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalProvider, GlobalContext }