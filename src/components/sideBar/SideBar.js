import { memo } from 'react'
import { useState } from 'react'
import clsx from 'clsx'
import styles from './SideBar.module.css'

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

    function handelActiveBtn(e){
        setActivedBtn(Number(e.target.getAttribute('data-id')))
    }

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
        </div>
    )
}

export default memo(SideBar)