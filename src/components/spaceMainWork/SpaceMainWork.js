import { useState, useRef, useEffect, useContext, memo } from 'react'
import styles from './SpaceMainWork.module.css'
import CreatorSpace from '../creatorSpace/CreatorSpace'
import {GlobalContext} from '../../globalState/GlobalState'
import { MSWContext } from '../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'

function SpaceMainWork() {
    const value = useContext(GlobalContext)
    const dataValue = useContext(MSWContext)
    const [showResetBtn, setShowResetBtn] = useState(false)
    console.log(showResetBtn)
    const pages = useRef([{
        name: 'mainPage',
        listItem: [],
        page({key}){return <CreatorSpace listItem={this.listItem} key={key} showResetBtn={showResetBtn} setShowResetBtn={setShowResetBtn}/>}
    }])

    console.log(pages)

    useEffect(() => {
        dataValue.setData(pages.current)
    }, [pages.current])

    const space = useRef()

    //zoom
    let zoom = useRef(value.zoom);
    const ZOOM_SPEED = value.ZOOM_SPEED;
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
                value.setZoom(zoom.current)
            }
        }
        if ((e.keyCode === 87 && e.shiftKey) || (e.keyCode === 431 && e.shiftKey)) {
            if(zoom.current > value.MIN){
                zoom.current -= ZOOM_SPEED;
                value.setZoom(zoom.current)
            }
        }
        if(e.keyCode === 69 && e.shiftKey){
            zoom.current = 1;
            value.setZoom(zoom.current)
        }
    }


    return (
        <div
        key={Math.random()}
            ref={space}
            className={styles.spaceMainWork}
        >
            {pages.current.map( (page, index) => {
                return(
                    page.page(index)
                )
            })}
            {showResetBtn && <button onClick={(e) => setShowResetBtn(false)} className={styles.resetPositionBtn}>reset</button>}
        </div>
    )
}
export default memo(SpaceMainWork)