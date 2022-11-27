import { useState, useRef } from 'react'
import './tooltip.css'
import clsx from 'clsx'

function StringTooltip({ content, children, position = 'top' }) {

    const [show, setShow] = useState(false)

    function handleMouseIn(e) {
        setShow(true)
    }

    function handleMouseOut(e) {
        setShow(false)
    }
    return (
        <div className={"tooltip"} onMouseOver={(e) => handleMouseIn(e)} onMouseLeave={(e) => handleMouseOut(e)}>
            {show && <div
                className={clsx('tooltip_content', `${position}`)}
                dangerouslySetInnerHTML={{ __html: content }}
            />}
            {children}
        </div>
    )
}

export default StringTooltip