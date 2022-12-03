import styles from './CreatorSpace.module.css'
import { useState, useEffect } from 'react'
import WorkSpace from './backgroundGrid'
import clsx from 'clsx'
import dropDrag from './dropDrag'

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
      <WorkSpace></WorkSpace>
        </div>
  )
}

export default CreatorSpace