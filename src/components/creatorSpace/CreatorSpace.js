import styles from './CreatorSpace.module.css'
import { useState, useEffect } from 'react'
import clsx from 'clsx'

const style = {
    height: '20%',
    width: '20%',
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundColor: 'green'
}

function CreatorSpace() {
    const [isTarget, setIsTarget] = useState(false)

    function handleClick(e){
        console.log('click' + isTarget);
        setIsTarget(!isTarget)
    }

  return (
    <div className={styles.creatorSpace}>
        <div onClick={handleClick} className={clsx(isTarget && styles.targeted)} draggable={isTarget} style={style}></div>
    </div>
  )
}

export default CreatorSpace