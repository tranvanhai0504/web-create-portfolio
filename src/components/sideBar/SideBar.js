import { memo } from 'react'
import { useState, useContext, useEffect  } from 'react'
import clsx from 'clsx'
import styles from './SideBar.module.css'
import DetailObject from './DetailObject/DetailObject'
import OptionPage from './OptionPage/OptionPage'
import TemplateOption from './TempalesOption/TemplateOption'
import Trashcan from './Trashcan/Trashcan'
import { useTranslation } from 'react-i18next'
import { MSWContext } from '../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'

function SideBar({setModalOn}) { 
    const { t, i18n } = useTranslation();
    const btns = [
    {
        id: 1,
        name: t('sideworkdetail')
    },
    {
        id: 2,
        name: t('sideworkpage')
    },
    {
        id: 3,
        name: t('sideworktemplate')
    }]

    const [activedBtn, setActivedBtn] = useState(btns[0].id)
    const [isEnterTrash, setIsEnterTrash] = useState(false)
    const values = useContext(MSWContext)

    function handelActiveBtn(e) {
        setActivedBtn(Number(e.target.getAttribute('data-id')))
    }

    useEffect (() => {
        if(values.itemTarget){
            setActivedBtn(btns[0].id)
        }
    }, [values.itemTarget])

    return (
        <div className={styles.sidebar}>
            <div className={styles.headerSideBar}>
                {btns.map((btn, index) => {
                    return (
                        <div
                            key={index}
                            className={clsx(styles.btnHeaderSideBar, btn.id === activedBtn && styles.actived)}
                            onClick={e => handelActiveBtn(e)}
                            data-id={btn.id}
                        >
                            {btn.name}
                        </div>
                    )
                })}
            </div>
            <div className={styles.sideBarContent}>
                {activedBtn === 1 && <DetailObject data={values} />}
                {activedBtn === 2 && <OptionPage data={values} />}
                {activedBtn === 3 && <TemplateOption data={values} />}
                {(values.isDragging || isEnterTrash) && <Trashcan setModalOn={setModalOn} setIsEnterTrash={setIsEnterTrash}></Trashcan>}
            </div>
        </div>
    )
}

export default memo(SideBar)