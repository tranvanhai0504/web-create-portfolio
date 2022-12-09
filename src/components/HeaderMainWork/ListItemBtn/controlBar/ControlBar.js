import React from 'react'
import styles from './ControlBar.module.css'
import { useEffect, useRef, useContext } from 'react'
import { GlobalContext } from '../../../../globalState/GlobalState'
import clsx from 'clsx'

function ControlBar({ width}) {

    const values = useContext(GlobalContext)
    const isReadyDrag = useRef(false)
    const progress = useRef()
    const progressBar = useRef()
    const progressCircle = useRef()
    const percent = useRef(values.zoom / values.MAX)

    const handleMouseDown = (e) => {
        isReadyDrag.current = true
        progress.current.classList.add(styles.isDragging)
    }

    const handleMousemove = (e) => {
        const clientX  = e.clientX
        const left = progress.current.getBoundingClientRect().left
        const width = progress.current.getBoundingClientRect().width
        const min = left
        const max =  width + min

        if(isReadyDrag.current) {
            if(clientX >= min && clientX <= max){
                percent.current = ((clientX - left) / width)
            }else if(clientX < min){
                percent.current = 0
            }else if(clientX > max){
                percent.current = 1
            }

            progressBar.current.style.width = percent.current *100 + '%'
            progressCircle.current.style.left = percent.current *100 + '%'
            if(percent.current * values.MAX >= values.MIN - 0.01) {
                values.setZoom(percent.current * values.MAX)
            }
        }
    }

    const handleMouseUp = (e) => {
        isReadyDrag.current = false
        progress.current.classList.remove(styles.isDragging)
    }

    useEffect(() => {
        document.addEventListener('mousemove',handleMousemove)
        document.addEventListener('mouseup',handleMouseUp)

        return () => {
            document.removeEventListener('mousemove',handleMousemove)
            document.removeEventListener('mouseup',handleMouseUp)
        }
    }, [])

    return (
        <div style={{ width }} className={styles.controlBarContainer}>
            <p>{values.MIN*100}</p>
            <div ref={progress} onMouseDown={handleMouseDown} className={clsx(styles.progress)}>
                <div style={{ width: values.zoom * (100/values.MAX) + '%'}} ref={progressBar} className={styles.progress_bar}></div>
                <div style={{ left: values.zoom * (100/values.MAX) + '%'}} ref={progressCircle} className={styles.progress_circle}></div>
            </div>
            <p>{Math.ceil(values.MAX*100)}</p>
        </div>
    )
}

export default ControlBar
