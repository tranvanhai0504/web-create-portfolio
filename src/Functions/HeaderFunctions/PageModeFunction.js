import {GlobalContext} from '../../globalState/GlobalState'
import clsx from 'clsx'
import { useContext } from 'react'
import { FiSun, FiMoon } from "react-icons/fi";
import { ImSun } from "react-icons/im";
import './Header.css'
import styles from '../../components/Header/Header.module.css'

function PageModeFunction() {
    const value = useContext(GlobalContext)
    return (
        <label className={clsx("switch", styles.btnFunc)}>
            <input
                onChange={() => value.toggleTheme()}
                type='checkbox'
                checked={value.checked}

            />
            <span className="slider">
                <div className={clsx(value.checked && "switchDark", "sliderSwitch")}>
                    {!value.checked && <span className='lightBtn modeLabel'><ImSun /></span>}
                    {value.checked && <span className='dark modeLabel'><FiMoon /></span>}
                </div>
            </span>
        </label>
    )
    
}


export default PageModeFunction