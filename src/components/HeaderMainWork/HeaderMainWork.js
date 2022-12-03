import styles from './HeaderMainWork.module.css'
import clsx from 'clsx'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import StringTooltip from '../tooltip/StringTooltip/StringTooltip'
import ExportButton from '../button/headerWorkSpace/ExportButton/ExportButton'
import ListItemBtn from './ListItemBtn/ListItemBtn'

function HeaderMainWork() {
    return (
        <div className={clsx(styles.headerWorkSpace)}>
            <StringTooltip content={'home'} position={'bottom'}>
                <NavLink className={styles.logo} to="/"><img className={styles.logoImg} src={logo} alt="a" ></img></NavLink>
            </StringTooltip>
            <div className={styles.btnList}>
                <ListItemBtn/>
                <StringTooltip content={'export to html, css file'} position={'bottom'}>
                    <ExportButton />
                </StringTooltip>
            </div>
        </div>
    )
}

export default HeaderMainWork