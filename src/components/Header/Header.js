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

const listButtonHeader = [{ name: 'Home', href: "/pages/home" }, { name: 'Storage', href: "/pages/storage" }, { name: 'About', href: "/pages/about" }]


function Header() {
    const value = useContext(GlobalContext)

    const [btnActived, setBtnActived] = useState(listButtonHeader[0].name);

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
                            {btn.name}
                        </span>
                    </NavLink>
                        {btn.name === 'Storage' && <MiniModal />}
                    </div>)
                })}
            </div>
            <div className={clsx(styles.btnFuncList)}>
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
                <NavLink to="/work" className={clsx(styles.btnStart, styles.btnFunc)}>Get Started</NavLink>
            </div>
        </div>
    )
}

export default memo(Header)