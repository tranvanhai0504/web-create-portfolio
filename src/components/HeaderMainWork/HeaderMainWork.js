import styles from './HeaderMainWork.module.css'
import clsx from 'clsx'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import ExportButton from '../button/headerWorkSpace/ExportButton/ExportButton'

function HeaderMainWork(){
    return (
        <div className={clsx(styles.headerWorkSpace)}>
            <NavLink className={styles.logo} to="/"><img className={styles.logoImg} src={logo} alt="a" ></img></NavLink>
            <div className={styles.btnList}>
                <ExportButton/>
            </div>
        </div>
    )
}

export default HeaderMainWork