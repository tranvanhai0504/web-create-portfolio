import React from 'react'
import {clsx} from 'clsx'
import { useState } from 'react'
import { FiSquare, FiType, FiImage } from "react-icons/fi";
import styles from './ListItemBtn.module.css'
import StringTooltip from '../../tooltip/StringTooltip';
import { TbHandStop } from "react-icons/tb";

const listBtn = [
    {
        name: 'block',
        icon: <FiSquare className={styles.hover} />,
        description: 'Add block element'
    },
    {
        name: 'text',
        icon: <FiType className={styles.hover} />,
        description: 'Add text element'
    },
    {
        name: 'imgBlock',
        icon: <FiImage className={styles.hover} />,
        description: 'Add image element'
    },
    {
        name: 'handMove',
        icon: <TbHandStop className={styles.hover} />,
        description: 'Add image element'
    },
]

function ListItemBtn() {

    const [selectedBtn, setSelectedBtn] = useState(null)

    function handleClick(e) {
        let btn = e.target
        while(!btn.querySelector('svg')){
            btn = btn.parentElement
        }
        if(btn.getAttribute('data-name') === selectedBtn){
            setSelectedBtn(null);
        }else{
            setSelectedBtn(btn.getAttribute('data-name'));
        }
    }
    return (
        <div className={styles.listItemBtn}>
            {listBtn.map((btn, index) => {
                return <div key={index} className={styles.cover}>
                    <StringTooltip content={btn.description} position={'bottom'}>
                        <div
                            
                            data-name={btn.name}
                            className={clsx(styles.itemBtn, selectedBtn === btn.name && styles.selected)}
                            onClick={function(e){handleClick(e)}}
                        >
                            {btn.icon}
                        </div>
                    </StringTooltip>
                </div>
            })}
        </div>
    )
}

export default ListItemBtn