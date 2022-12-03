import styles from './CreatorSpace.module.css'
import clsx from 'clsx'
import dropDrag from './dropDrag'
import {useEffect} from 'react'
import ProduceItems from './ProduceItems'

function WorkSpace() {

    useEffect(()=> {
        dropDrag()
        ProduceItems()
    }, [])

    let boxs= [<div className={clsx("box", styles.box)} key = "00"><div draggable={true} className={clsx(styles.element, 'target')}></div></div>]
    for(let i=1;i<30;i++) {
        for(let j= 1; j< 50; j++) 
            boxs.push(<div className={clsx("box", styles.box)} key = {`$${i*112}${j}`}></div>)
    }
    return boxs

}

export default WorkSpace