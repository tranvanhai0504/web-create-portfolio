import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const GlobalContext = createContext()

function GlobalProvider({children}){
    const { t, i18n } = useTranslation();
    

    //===============================
    const [targetItem, setTargetItem] = useState('')
    function targetItemHandle(item){
        console.log('handle', item)
        setTargetItem(item)
    }

    useEffect(()=> {
        setListUsingElement(prev => [...prev, targetItem])
    }, [targetItem])
    //================================
    //list items in workspace

    const [listUsingElement, setListUsingElement] = useState([])
    const handleListItems = (item)=> {
        console.log.log('add')
        // setListUsingElement(prev => [...prev, item])
        selectedBtn(null)
        console.log(listUsingElement)
    }

    //handel btn 
    const [selectedBtn, setSelectedBtn] = useState(null)
    function handleClick(e) {
        if(e){
            let btn = e.target
            while (!btn.querySelector('svg')) {
                btn = btn.parentElement
            }
            if (btn.getAttribute('data-name') === selectedBtn) {
                setSelectedBtn(null);
            } else {
                setSelectedBtn(btn.getAttribute('data-name'));
            }
        }else{
            console.log('set null')
            setSelectedBtn(null);
        }
    }


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
        languagesHandle,
        selectedBtn,
        handleClick,
        handleListItems,
        listUsingElement,
        targetItemHandle,
        targetItem

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