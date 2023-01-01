import { useState, useRef } from 'react'
import './Dialogtooltip.module.css'
import clsx from 'clsx'

function Dialogtooltip({ content, children, position = 'top', isBlocked = true }) {

    const [show, setShow] = useState(false)

    function handleMouseIn(e) {
        setShow(true)
    }

    function handleMouseOut(e) {
        setShow(false)
    }
    return (
        <div className={"tooltip"} onMouseOver={(e) => handleMouseIn(e)} onMouseLeave={(e) => handleMouseOut(e)}>
            {show && isBlocked && <div
                className={clsx('tooltip_content', `${position}`)}
            >{content}</div>}
            {children}
        </div>
    )
}

export default Dialogtooltip