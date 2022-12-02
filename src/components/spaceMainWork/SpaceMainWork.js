import { useState, useRef } from 'react'
import styles from './SpaceMainWork.module.css'
import CreatorSpace from '../creatorSpace/CreatorSpace'

function SpaceMainWork() {
    let zoom = useRef(1);
    const ZOOM_SPEED = 0.01;
    const space = useRef()

    const zoomfunc = (e) => {
        console.log(e)
        if (e.keyCode === 113) {
            zoom.current += ZOOM_SPEED;
            space.current.children[0].style.transform = `scale(${zoom.current})`
        }
        if (e.keyCode === 119) {
            zoom.current -= ZOOM_SPEED;
            space.current.children[0].style.transform = `scale(${zoom.current})`
        }
    }

    function handleFocus(e) {
        console.log('focus')
        e.target.addEventListener('keypress', (e) => zoomfunc(e))
    }

    function handleFocusOut(e) {
        console.log('blur')
        e.target.removeEventListener('keypress',(e) => zoomfunc(e))
    }

    return (
        <div
            ref={space}
            className={styles.spaceMainWork}
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleFocusOut(e)}
            tabIndex="0"
        >
            <CreatorSpace />
        </div>
    )
}


export default SpaceMainWork