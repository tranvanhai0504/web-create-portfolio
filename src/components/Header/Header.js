import { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Header.module.css'
import './Header.css'
import logo from '../../assets/logo.png'
import MiniModal from './MiniModal/MiniModal'
import { GlobalContext } from "../../globalState/GlobalState";
import { useContext } from 'react'
import { FiSun, FiMoon } from "react-icons/fi";
import { ImSun } from "react-icons/im";
import { useTranslation } from 'react-i18next';
import { BiGlobe } from "react-icons/bi";



const listButtonHeader = [{ name: 'Home', href: "/pages/home" }, { name: 'Storage', href: "/pages/storage" }, { name: 'About', href: "/pages/about" }]
const languages = ['vi', 'en']

function Header() {
    const value = useContext(GlobalContext)

    const [btnActived, setBtnActived] = useState(listButtonHeader[0].name);

    const { t, i18n } = useTranslation();

    function handleBtnClick(e) {
        setBtnActived(e.target.getAttribute('data-key'))
    }
    return (
        <div className={styles.header}>
            <div class={styles.logoShell}>
                <NavLink className={styles.logo} to="/"><img className={styles.logoImg} src={logo} alt="a" ></img></NavLink>
            </div>
            <div className={styles.directBtns}>
                {listButtonHeader.map((btn, index) => {
                    return (<div className={styles.btnHeader}><NavLink
                        key={index}
                        to={btn.href}
                    >
                        <span
                            className={clsx(styles.btnNavBar, (btnActived === btn.name) && styles.actived)}
                            onClick={e => handleBtnClick(e)}
                            data-key={btn.name}
                        >
                            {t(btn.name)}
                        </span>
                    </NavLink>
                        {btn.name === 'Storage' && <MiniModal />}
                    </div>)
                })}
            </div>
            <div className={clsx(styles.btnFuncList)}>
                <div class={styles.functionshell}>
                    <div className= "selectElement" onClick={value.activeHandle}>
                        <div className="selected" ><BiGlobe className={styles.globalIcon}/>{value.lang}</div>
                        <div className = {clsx("selectContent", !value.active && "unChecked")} >
                            {languages.map((lang) => (
                                <div className={clsx("selectItem", value.lang==lang && "unChecked")} onClick = {value.languagesHandle}>{lang}</div>
                            ))}
                        </div>

                    </div>
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
                </div>
                <NavLink to="/work" className={clsx(styles.btnStart, styles.btnFunc)}>{t('getstarted')}</NavLink>
            </div>
            
        </div>
    )
}

export default memo(Header)