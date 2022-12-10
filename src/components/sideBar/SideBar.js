import { memo } from 'react'
import { useState, useContext } from 'react'
import clsx from 'clsx'
import styles from './SideBar.module.css'
import DetailObject from './DetailObject/DetailObject'
import OptionPage from './OptionPage/OptionPage'
import TemplateOption from './TempalesOption/TemplateOption'
import Trashcan from './Trashcan/Trashcan'
import { MSWContext } from '../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import { useEffect } from 'react'

const btns = [
    {
        id: 1,
        name: 'Detail'
    },
    {
        id: 2,
        name: 'Page'
    },
    {
        id: 3,
        name: 'Templates'
    }]

function SideBar() {

    const [activedBtn, setActivedBtn] = useState(btns[0].id)
    const values = useContext(MSWContext)

    function handelActiveBtn(e){
        setActivedBtn(Number(e.target.getAttribute('data-id')))
    }

    useEffect(() => {
        values.setPageSelect(values.data[0]?.name)
    })

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
                {!values.isDragging && activedBtn === 1 && <DetailObject/>}
                {!values.isDragging && activedBtn === 2 && <OptionPage/>}
                {!values.isDragging && activedBtn === 3 && <TemplateOption/>}
                {values.isDragging && <Trashcan></Trashcan>}
            </div>
        </div>
    )
}

export default memo(SideBar)