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
import { useTranslation } from 'react-i18next';

const listButtonHeader = [{ name: 'Home', href: "/pages/home" }, { name: 'Storage', href: "/pages/storage" }, { name: 'About', href: "/pages/about" }]


function Header() {
    const value = useContext(GlobalContext)

    const [btnActived, setBtnActived] = useState(listButtonHeader[0].name);

    const { t, i18n } = useTranslation();

    function handleBtnClick(e) {
        setBtnActived(e.target.getAttribute('data-key'))
    }
    return (
        <div className={styles.header}>
            <NavLink className={styles.logo} to="/"><img className={styles.logoImg} src={logo} alt="a" ></img></NavLink>
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
            <label className="switch">
                <input 
                    onChange={()=>value.toggleTheme()}
                    type='checkbox'
                    checked={value.checked}
                
                />
                
                <span className="slider">
                    <span className='lightBtn modeBtn'><FiSun /></span>
                    <span className='dark modeBtn'><FiMoon /></span>
                </span>
            </label>
            </div>
            <div className={styles.btnFuncList}>
                <NavLink to="/work" className={clsx(styles.btnStart)}>Get Started</NavLink>
            </div>
            
            <button  key="a" onClick={value.languagesHandle}>{value.lang}</button>
        </div>
    )
}

export default memo(Header)