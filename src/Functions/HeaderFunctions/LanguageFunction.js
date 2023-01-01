
import {GlobalContext} from '../../globalState/GlobalState'
import clsx from 'clsx'
import { useContext } from 'react'
import { BiGlobe } from "react-icons/bi";
import styles from '../../components/Header/Header.module.css'
import './Header.css'


const languages = ['vi', 'en']

function LanguageFunction() {
    const value = useContext(GlobalContext)
    window.addEventListener('click', (e) => {
        const element = e.target
        if(!(element.classList.contains('selectElement') || element.classList.contains('selected') || element.classList.contains('selectItem'))) {
            value.activeHandle('false')
        }else {
            console.log(element)
        }
    })

    return (<div className= "selectElement" onClick={value.activeHandle}>
        <div className="selected" ><BiGlobe className={styles.globalIcon}/>{value.lang}</div>
        <div className = {clsx("selectContent", !value.active && "unChecked")} >
            {languages.map((lang) => (
                <div className={clsx("selectItem", value.lang==lang && "unChecked")} onClick = {value.languagesHandle}>{lang}</div>
            ))}
        </div>
    </div>)
}

export default LanguageFunction

