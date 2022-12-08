import { useState, useRef, useEffect, useContext, useImperativeHandle } from 'react'
import styles from './SpaceMainWork.module.css'
import CreatorSpace from '../creatorSpace/CreatorSpace'
import {GlobalContext} from '../../globalState/GlobalState'

function SpaceMainWork() {
    const value = useContext(GlobalContext)
    let zoom = useRef(value.zoom);
    const ZOOM_SPEED = value.ZOOM_SPEED;
    const space = useRef()
    const [showResetBtn, setShowResetBtn] = useState(false)
    const [pages, setPages] = useState([])

    zoom.current =  value.zoom
    useEffect(() => {
        space.current.children[0].style.transform = `scale(${zoom.current})`
    }, [zoom.current])

    useEffect(() => {
        document.addEventListener('keypress', (e) => zoomfunc(e))

        return () => {
            document.removeEventListener('keypress', (e) => zoomfunc(e))
        }
    }, []) 

    const zoomfunc = (e) => { 
        if (e.keyCode === 81 && e.shiftKey) {
            if(zoom.current < value.MAX){
                zoom.current += ZOOM_SPEED;
                space.current.children[0].style.transform = `scale(${zoom.current})`
                value.setZoom(zoom.current)
            }
        }
        if ((e.keyCode === 87 && e.shiftKey) || (e.keyCode === 431 && e.shiftKey)) {
            if(zoom.current > value.MIN){
                zoom.current -= ZOOM_SPEED;
                space.current.children[0].style.transform = `scale(${zoom.current})`
                value.setZoom(zoom.current)
            }
        }
        if(e.keyCode === 69 && e.shiftKey){
            zoom.current = 1;
            space.current.children[0].style.transform = `scale(${zoom.current})`
            value.setZoom(zoom.current)
        }
    }


    return (
        <div
            ref={space}
            className={styles.spaceMainWork}
        >
            <CreatorSpace pages={pages} setPages={setPages} showResetBtn={showResetBtn} setShowResetBtn={setShowResetBtn}/>
            {showResetBtn && <button onClick={(e) => setShowResetBtn(false)} className={styles.resetPositionBtn}>reset</button>}
        </div>
    )
}
export default SpaceMainWork