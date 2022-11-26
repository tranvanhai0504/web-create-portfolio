import { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Header.module.css'
import logo from '../../assets/logo.png'
import MiniModal from './MiniModal/MiniModal'

const listButtonHeader = [{ name: 'Home', href: "/pages/home" }, { name: 'Storage', href: "/pages/storage" }, { name: 'About', href: "/pages/about" }]


function Header() {

    const [btnActived, setBtnActived] = useState(listButtonHeader[0].name);

    function handleBtnClick(e){
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
                    {btn.name == 'Storage' && <MiniModal/>}
                    </div>)
                })}
            </div>
            <NavLink to="/work" className={clsx(styles.btnStart)}>Get Started</NavLink>
        </div>
    )
}

export default memo(Header)