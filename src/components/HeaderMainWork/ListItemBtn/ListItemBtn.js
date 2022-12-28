import React from 'react'
import { clsx } from 'clsx'
import { useState, useContext } from 'react'
import {GlobalContext} from '../../../globalState/GlobalState'
import {MSWContext} from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import { FiSquare, FiType, FiImage, FiZoomIn, FiLink2 } from "react-icons/fi";
import styles from './ListItemBtn.module.css'
import StringTooltip from '../../tooltip/StringTooltip/StringTooltip';
import ElementTooltip from '../../tooltip/elementTooltip/ElementTooltip'
import ControlBar from './controlBar/ControlBar'
import {t, useTranslation } from 'react-i18next'
import { TbHandStop } from "react-icons/tb";

function ListItemBtn() {
    const { t, i18n } = useTranslation();
    const listBtn = [
        {
            name: 'block',
            icon: <FiSquare className={styles.hover} />,
            description: t('blockbutton')
        },
        {
            name: 'text',
            icon: <FiType className={styles.hover} />,
            description: t('txtbutton')
        },
        {
            name: 'imgBlock',
            icon: <FiImage className={clsx(styles.hover, 'imageBlockIcon')} />,
            description: t('imgbutton')
        },
        {
            name: 'link',
            icon: <FiLink2 className={clsx(styles.hover)} />,
            description: 'link'
        },
        {
            name: 'zoom',
            icon: <FiZoomIn className={styles.hover} />,
            description: t('zoombutton')
        },
        {
            name: 'handMove',
            icon: <TbHandStop className={styles.hover} />,
            description: t('handbutton')
        },
        
    ]

    const MSWValue = useContext(MSWContext)
    const value = useContext(GlobalContext)
    function handleClickResetBtn(e){
        value.setZoom(1)
    }

    function FileHandle(e) {

        function getBase64(file, cb) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                cb(reader.result)
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }

        const file = e.target.files[0]
        getBase64(file, (result) => {
            // console.log(result)
            value.image.current = result
        })
        MSWValue.setImg(file)
        // value.image.current = file.preview
    }


    return (
        <div className={clsx(styles.listItemBtn, 'listToolTips')}>
            {listBtn.map((btn, index) => {
                return <div key={index} className={styles.cover}>
                    {btn.name === 'zoom'
                        ?
                        (<StringTooltip isBlocked={!(value.selectedBtn === 'zoom')} content={btn.description} position={'bottom'}>
                            <ElementTooltip
                                position={'bottom'}
                                isActive={value.selectedBtn === 'zoom'}
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
                                onClick={function (e) { 
                                    value.handleClick(e) 
                                    if(btn.name==='imgBlock') document.querySelector('.customInputImg').click()
                                }}
                            >
                                {btn.icon}
                                {btn.name==='imgBlock'&&(<input type='file' accept='image/*' onChange={FileHandle} className={clsx('customInputImg', styles.inputImage)}></input>)}
                            </div>
                        </StringTooltip>)
                    }
                </div>
            })}
        </div>
    )
}
export default ListItemBtn
