import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const GlobalContext = createContext()

function GlobalProvider({children}){
    const { t, i18n } = useTranslation();
    
    //Page mode handle variables
    const data = JSON.parse(localStorage.getItem('theme'))||'light'
    const dataToggle = JSON.parse(localStorage.getItem('checked'))|| false
    const [theme, setTheme] = useState(data)
    const [checked, setChecked] = useState(dataToggle)
    
    
    //Languages handle variables
    const language = 'en'
    const [lang, setLang] = useState(language)
    
    //select element handle variables
    const [active, setActive] = useState(false)
    const [selected, setSelected] = useState()
    const  activeHandle = (e) =>{
        if(e=='false')
            setActive(false)
        else
            setActive(!active)
    }


    //Page mode handle function
    const toggleTheme = () => {
        setTheme(theme==='light'? 'dark' : 'light')
        setChecked(!checked)
    }
    useEffect(()=>{
        localStorage.setItem('theme', JSON.stringify(theme))
        localStorage.setItem('checked', JSON.stringify(checked))

    }, [theme])
    
    //Languages handle function
    const languagesHandle = () => {
        setLang(lang === 'en' ? 'vi': 'en')
    }
    
    useEffect(()=> {
        localStorage.setItem('language', JSON.stringify(lang))
        i18n.changeLanguage(lang)
    }, [lang])
    
    const value = {
        checked,
        theme,
        toggleTheme,
        active,
        activeHandle,
        lang,
        languagesHandle
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