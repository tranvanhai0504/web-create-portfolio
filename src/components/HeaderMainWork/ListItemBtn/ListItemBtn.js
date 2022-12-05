import React from 'react'
import { clsx } from 'clsx'
import { useState } from 'react'
import { FiSquare, FiType, FiImage, FiZoomIn } from "react-icons/fi";
import styles from './ListItemBtn.module.css'
import StringTooltip from '../../tooltip/StringTooltip/StringTooltip';
import ElementTooltip from '../../tooltip/elementTooltip/ElementTooltip'
import { TbHandStop } from "react-icons/tb";
import { useContext } from 'react';
import { GlobalContext } from '../../../globalState/GlobalState';

const listBtn = [
    {
        name: 'block',
        icon: <FiSquare className={styles.hover} />,
        description: 'block'
    },
    {
        name: 'text',
        icon: <FiType className={styles.hover} />,
        description: 'text'
    },
    {
        name: 'imgBlock',
        icon: <FiImage className={styles.hover} />,
        description: 'image'
    },
    {
        name: 'zoom',
        icon: <FiZoomIn className={styles.hover} />,
        description: 'zoom in/out'
    },
    {
        name: 'handMove',
        icon: <TbHandStop className={styles.hover} />,
        description: 'hand tool'
    },

]

function ListItemBtn() {
    const value = useContext(GlobalContext)
    // const [selectedBtn, setSelectedBtn] = useState(null)

    // function handleClick(e) {
    //     let btn = e.target
    //     while (!btn.querySelector('svg')) {
    //         btn = btn.parentElement
    //     }
    //     if (btn.getAttribute('data-name') === selectedBtn) {
    //         setSelectedBtn(null);
    //     } else {
    //         setSelectedBtn(btn.getAttribute('data-name'));
    //     }
    // }

    return (
        <div className={clsx(styles.listItemBtn, 'listToolTips')}>
            {listBtn.map((btn, index) => {
                return <div key={index} className={styles.cover}>
                    {btn.name === 'zoom'
                        ?
                        (<StringTooltip isBlocked={!(value.selectedBtn === 'zoom')} content={btn.description} position={'bottom'}>
                            <ElementTooltip position={'bottom'} isActive={value.selectedBtn === 'zoom'} element={<p>element</p>}>
                                <div

                                    data-name={btn.name}
                                    className={clsx(styles.itemBtn, value.selectedBtn === btn.name && styles.selected)}
                                    onClick={function (e) { value.handleClick(e) }}
                                >
                                    {btn.icon}
                                </div>
                            </ElementTooltip>
                        </StringTooltip>)
                        :
                        (<StringTooltip content={btn.description} position={'bottom'}>
                            <div

                                data-name={btn.name}
                                className={clsx(styles.itemBtn, value.selectedBtn === btn.name && styles.selected)}
                                onClick={function (e) { value.handleClick(e) }}
                            >
                                {btn.icon}
                            </div>
                        </StringTooltip>)
                    }
                </div>
            })}
        </div>
    )
}

export default ListItemBtn