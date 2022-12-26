import React from 'react'
import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker'
import ElementTooltip from '../../../tooltip/elementTooltip/ElementTooltip'
import style from './ColorSetting.module.css'

function ColorSetting({type = 'fill', data, handleChangeColor, hideControls, position = null }) {

    const [tooltipActive, setToolTipActive] = useState(false)
    const [isEnterMouse, setIsEnterMouse] = useState(false)
    const [color, setColor] = useState(() => {
        if(type === 'fill') return data.style?.color?.code
        if(type === 'border') return data.style?.borderColor
        if(type === 'shadow') return data.style?.shadowColor
        if(type === 'page') return data.style?.color.code
        return 'black'
    })
    const {isGradient, valueToHex} = useColorPicker(color, setColor)
    const btn = useRef()

    useEffect(() => {
        setColor(() => {
            if(type === 'fill') return data.style?.color?.code
            if(type === 'border') return data.style?.borderColor
            if(type === 'shadow') return data.style?.shadowColor
            if(type === 'page') return data.style?.color.code
        })
    }, [data.style])

    useEffect(() => {
        if(color){
            handleChangeColor(color, isGradient, type, valueToHex)
        }
    }, [color])

    function handleClick(e) {
        if ((e.target !== btn.current) && !isEnterMouse){
            setToolTipActive(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [isEnterMouse])

    return (
        <ElementTooltip customPosition={position} isActive={tooltipActive} position={'right'} element={
            <div
                onMouseEnter={() => {setIsEnterMouse(true)}}
                onMouseLeave={() => {setIsEnterMouse(false)}}
                className={style.coverColorPicker}>
                <ColorPicker
                    width={240}
                    height={90}
                    value={color}
                    hidePresets={true}
                    hideColorGuide={true}
                    hideControls={hideControls}
                    onChange={setColor}
                />
            </div>
        }>
            <div ref={btn} style={{ background: color }} className={clsx(style.blockColorBtn)} onClick={() => { setToolTipActive(!tooltipActive) }}></div>
        </ElementTooltip>
    )
}

export default ColorSetting