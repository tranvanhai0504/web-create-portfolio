import styles from './CreatorSpace.module.css'
import { useState, useEffect } from 'react'

const style = {
    height: '20%',
    width: '20%',
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundColor: 'green',
    border: 'none'
}

function CreatorSpace() {
    const [isTarget, setIsTarget] = useState(false)
    const [testStyle, setTestStyle] = useState(style)

    function handleClick(e){
        setIsTarget(true)
    }

    useEffect(() => {
        // isTarget ? setTestStyle( prev => {Ơ}) : setTestStyle
        isTarget ? style.border = 'solid 2px blue' : style.border = 'unset';
    }, [isTarget])

  return (
    <div className={styles.creatorSpace}>
        <div onClick={handleClick} draggable={true} style={style}></div>
    </div>
  )
}

export default CreatorSpace