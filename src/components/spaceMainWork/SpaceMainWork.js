import { useState, useRef, useEffect, useContext, memo } from 'react'
import clsx from 'clsx'
import styles from './SpaceMainWork.module.css'
import CreatorSpace from '../creatorSpace/CreatorSpace'
import {GlobalContext} from '../../globalState/GlobalState'
import { MSWContext } from '../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'

function SpaceMainWork() {
    const value = useContext(GlobalContext)
    const dataValue = useContext(MSWContext)
    const [pages, setPages] = useState([{
        name: 'mainPage',
        listItem: [],
        page({key}){return <CreatorSpace name={this.name} listItem={this.listItem} key={key}/>}
    }])

    useEffect(() => {
        dataValue.setData(pages)
        dataValue.setPageSelect(pages[0].name)
    }, [])

    useEffect(() => {
        setPages(dataValue.data)
    }, [dataValue.data])

    const space = useRef()

    //zoom
    let zoom = useRef(value.zoom);
    const ZOOM_SPEED = value.ZOOM_SPEED;
    zoom.current =  value.zoom

    useEffect(() => {
        if(space.current.children[0])
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
            ref={space}
            className={styles.spaceMainWork}
        >
            {pages.map( (page, index) => {
                return(
                    dataValue.pageSelect === page.name && page.page(index)
                )
            })}
            {dataValue.showResetBtn && <button onClick={(e) => dataValue.setShowResetBtn(false)} className={styles.resetPositionBtn}>reset</button>}
        </div>
    )
}
export default memo(SpaceMainWork)