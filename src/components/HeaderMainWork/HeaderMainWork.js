import styles from './HeaderMainWork.module.css'
import clsx from 'clsx'
import { memo } from 'react'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import StringTooltip from '../tooltip/StringTooltip/StringTooltip'
import ExportButton from '../button/headerWorkSpace/ExportButton/ExportButton'
import ShortcutButton from '../button/ShortcutButton/ShortcutButton'
import PresentationButton from '../button/headerWorkSpace/presentationButton/PresentationButton'
import ListItemBtn from './ListItemBtn/ListItemBtn'
import { useTranslation } from 'react-i18next'


function HeaderMainWork({setIsPreview}) {
    const { t, i18n } = useTranslation();

    return (
        <div className={clsx(styles.headerWorkSpace)}>
            <StringTooltip content={t('homebtn')} position={'bottom'}>
                <NavLink className={styles.logo} to="/"><img className={styles.logoImg} src={logo} alt="a" ></img></NavLink>
            </StringTooltip>
            <div className={styles.btnList}>
                <ListItemBtn/> 
                {/* <ShortcutButton/> */}
                <PresentationButton setIsPreview={setIsPreview}/>
                <StringTooltip content={t('exportbtntooltip')} position={'bottom'}>
                    <ExportButton />
                </StringTooltip>
            </div>
        </div>
    )
}

export default memo(HeaderMainWork)