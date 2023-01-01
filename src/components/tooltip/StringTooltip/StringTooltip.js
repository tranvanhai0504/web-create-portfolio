import { useState, useRef } from 'react'
import './tooltip.css'
import clsx from 'clsx'

function StringTooltip({ style, content, children, position = 'top', isBlocked = true, className }) {

    const [show, setShow] = useState(false)

    function handleMouseIn(e) {
        setShow(true)
    }

    function handleMouseOut(e) {
        setShow(false)
    }
    return (
        <div style={style} className={clsx("tooltip", className)} onMouseOver={(e) => handleMouseIn(e)} onMouseLeave={(e) => handleMouseOut(e)}>
            {show && isBlocked && <div
                className={clsx('tooltip_content', `${position}`)}
                dangerouslySetInnerHTML={{ __html: content }}
            />}
            {children}
        </div>
    )
}

export default StringTooltip