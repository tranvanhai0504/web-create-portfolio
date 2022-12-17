import styles from './MiniModal.module.css'
import { useState, useEffect , useContext} from 'react'
import {GlobalContext} from '../../../globalState/GlobalState'


function MiniModal(){
    const value = useContext(GlobalContext)
    useEffect(() => {

    }, [])

    return (
        <div className={styles.miniModal}>{value.produces.length||0}</div>
    )
}

export default MiniModal