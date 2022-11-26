import styles from './MiniModal.module.css'
import { useState, useEffect } from 'react'

function MiniModal(){

    const [countSave, setCountSave] = useState(0);

    useEffect(() => {

    }, [])

    return (
        <div className={styles.miniModal}>{countSave}</div>
    )
}

export default MiniModal