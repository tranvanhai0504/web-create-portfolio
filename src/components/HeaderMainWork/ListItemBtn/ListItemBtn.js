import React from 'react'
import { clsx } from 'clsx'
import { useState, useContext } from 'react'
import {GlobalContext} from '../../../globalState/GlobalState'
import { FiSquare, FiType, FiImage, FiZoomIn } from "react-icons/fi";
import styles from './ListItemBtn.module.css'
import StringTooltip from '../../tooltip/StringTooltip/StringTooltip';
import ElementTooltip from '../../tooltip/elementTooltip/ElementTooltip'
import ControlBar from './controlBar/ControlBar'
import { TbHandStop } from "react-icons/tb";

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

    const [selectedBtn, setSelectedBtn] = useState(null)
    const value = useContext(GlobalContext)

    function handleClick(e) {
        let btn = e.target
        while (!btn.querySelector('svg')) {
            btn = btn.parentElement
        }
        if (btn.getAttribute('data-name') === selectedBtn) {
            setSelectedBtn(null);
            value.setIsMove(false)
            return
        } else {
            setSelectedBtn(btn.getAttribute('data-name'));
        }

        switch(btn.getAttribute('data-name')){
            case 'handMove': {
                value.setIsMove(true)
                break;
            }
            case 'zoom': {
                value.setIsMove(false)
                break
            }
            default: return;
        }
    }

    function handleClickResetBtn(e){
        value.setZoom(1)
    }


    return (
        <div className={styles.listItemBtn}>
            {listBtn.map((btn, index) => {
                return <div key={index} className={styles.cover}>
                    {btn.name === 'zoom'
                        ?
                        (<StringTooltip isBlocked={!(selectedBtn === 'zoom')} content={btn.description} position={'bottom'}>
                            <ElementTooltip
                                position={'bottom'}
                                isActive={selectedBtn === 'zoom'}
                                element={
                                    <>
                                        <p>{Math.ceil(value.zoom * 100) + '%'}</p>
                                        <ControlBar width={'250px'} />
                                        <button onClick={handleClickResetBtn} className={styles.resetSizeBtn}>reset</button>
                                    </>
                                }
                            >
                                <div

                                    data-name={btn.name}
                                    className={clsx(styles.itemBtn, selectedBtn === btn.name && styles.selected)}
                                    onClick={function (e) { handleClick(e) }}
                                >
                                    {btn.icon}
                                </div>
                            </ElementTooltip>
                        </StringTooltip>)
                        :
                        (<StringTooltip content={btn.description} position={'bottom'}>
                            <div

                                data-name={btn.name}
                                className={clsx(styles.itemBtn, selectedBtn === btn.name && styles.selected)}
                                onClick={function (e) { handleClick(e) }}
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