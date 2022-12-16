
import CreatorSpace from '../../components/creatorSpace/CreatorSpace'
import { useSpring, animated } from '@react-spring/web'
import { HiOutlineTrash } from "react-icons/hi2";
import { useDrag } from '@use-gesture/react'
import styles from './Storage.module.css';
import { NavLink } from 'react-router-dom'
import { SlPlus } from "react-icons/sl";
import {useState} from 'react'

import clsx from "clsx";
function Template() {
    return (
    <div>

    </div>)
}




function Storage(){
    const [listTemplates, setListItemTemplates] =  useState([])
    function createNewTemplate() {
        setListItemTemplates(prev=> [...prev, <Template/>])
    }

    function Template() {
        const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))
    
        const bind = useDrag(({ down, movement: [mx, my] }) => {
            api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
        })
        return (
            <animated.div  {...bind()} style={{ x, y }} className={styles.templateContainer}>
                <div className={styles.template}>
                    <span className={styles.editMessage}>Edit Template</span>
                </div>
                <span contentEditable={true}>New Template</span>
            </animated.div>
        )
    }


    return (
        <div className={styles.container}>

            <div className={styles.rowContainer}>
                {listTemplates? (listTemplates.map((item)=> item)):''}
                <div onClick={createNewTemplate} className={styles.plusItem}>
                    <SlPlus/>
                </div>
            </div>

            <div className={styles.trashContainer}>
                <span className={clsx(styles.trash)}>
                    <HiOutlineTrash />
                </span>
            </div>

        </div>
    )
}

export default Storage