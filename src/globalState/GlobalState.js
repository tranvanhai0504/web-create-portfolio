import { createContext } from 'react'
import { useState, useEffect } from 'react'

const GlobalContext = createContext()

function GlobalProvider({children}){
    const data = JSON.parse(localStorage.getItem('theme'))||'light'
    const dataToggle = JSON.parse(localStorage.getItem('checked'))|| false
    const [theme, setTheme] = useState(data)
    const [checked, setChecked] = useState(dataToggle)
    const toggleTheme = () => {
        setTheme(theme==='light'? 'dark' : 'light')
        setChecked(!checked)
    }
    useEffect(()=>{
        localStorage.setItem('theme', JSON.stringify(theme))
        localStorage.setItem('checked', JSON.stringify(checked))

    }, [theme])
    const value = {
        checked,
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