import { useState, useEffect } from 'react'
import styles from './tooltip.module.css'
import clsx from 'clsx'

function ElementTooltip({ content, children, position = 'top', isActive = false, element }) {

    const [show, setShow] = useState(isActive)

    useEffect(() => {
        setShow(isActive)
    }, [isActive])
    

    function choosePosition(position){
        switch(position){
            case 'top':
                return styles.top
            case 'bottom':
                return styles.bottom
            case 'right':
                return styles.right
            case 'left':
                return styles.left
            default:
                return ''
        }
    }

    return (
        <div className={styles.tooltip}>
            {show && <div
                className={clsx(styles.tooltip_content, choosePosition(position))}
            >{show && element}</div>}
            {children}
        </div>
    )
}

export default ElementTooltip