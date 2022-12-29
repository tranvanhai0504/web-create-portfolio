import { useState, useEffect } from 'react'
import style from './DetailObject.module.css'
import clsx from 'clsx'
import StringTooltip from '../../tooltip/StringTooltip/StringTooltip'
import { FiPlus } from "react-icons/fi";
import ColorSetting from './colorSetting/ColorSetting'
import Menu from '../../menuCustom/Menu'
import DetailPage from '../DetailPage/DetailPage'
import { FiEye, FiCheck, FiBold, FiItalic, FiUnderline, FiAlignCenter, FiAlignLeft, FiAlignRight } from "react-icons/fi";
import { MdOutlineRoundedCorner, MdOutlineRotate90DegreesCcw } from "react-icons/md";
import { RxBorderWidth, RxAlignBottom, RxAlignCenterVertically, RxAlignTop } from "react-icons/rx";

function DetailObject({ data }) {
    const [dataSelect, setDataSelect] = useState(selectStyle())
    const [showMenu, setShowMenu] = useState(false)

    const blockSetting = [
        {
            name: 'Position',
            element: ({ dataSelect = {}, handleChange }) => {
                return (
                    <div className={style.blockContain}>
                        <label className={style.labelCoverInput}><p className={style.icon}>X</p><input autoComplete="off" type="number" min="0" onChange={handleChange} value={dataSelect.position?.x} id="x" className={style.inputData} /></label>
                        <label className={style.labelCoverInput}><p className={style.icon}>Y</p><input autoComplete="off" type="number" min="0" onChange={handleChange} value={dataSelect.position?.y} id="y" className={style.inputData} /></label>
                        <label className={style.labelCoverInput}><p className={style.icon}>W</p><input autoComplete="off" type="number" min="0" onChange={handleChange} value={dataSelect.style?.width} id="w" className={style.inputData} /></label>
                        <label className={style.labelCoverInput}><p className={style.icon}>H</p><input autoComplete="off" type="number" min="0" onChange={handleChange} value={dataSelect.style?.height} id="h" className={style.inputData} /></label>
                        <StringTooltip content={'rotation'} style={{ width: '41%' }} position={"bottom"} className={style.inputData}>
                            <MdOutlineRotate90DegreesCcw className={style.icon} />
                            <input autoComplete="off" type="number" min="-360" max="360" onChange={handleChange} style={{ cursor: 'default', width: '96%', border: 'unset', textAlign: 'center' }} value={dataSelect.style?.rotate} id="r" />
                        </StringTooltip>
                        {dataSelect.type !== 'text' && dataSelect.type !== 'link' ?
                            (<StringTooltip content={'corner radius'} style={{ width: '41%' }} position={"bottom"} className={style.inputData}>
                                <MdOutlineRoundedCorner className={style.icon} />
                                <input autoComplete="off" disabled={dataSelect.type === 'text'} type="number" min="0" onChange={handleChange} style={{ cursor: 'default', width: '96%', border: 'unset', textAlign: 'center' }} value={dataSelect.style?.borderRadius} id="b" />
                            </StringTooltip>)
                            :
                            (<div className={style.fakeInput}></div>)
                        }
                    </div>
                )
            }
        },
        {
            name: 'Layer',
            element: ({ dataSelect = {}, handleChange, handleClick }) => {
                return (
                    <div className={style.blockContain}>
                        <StringTooltip position={'bottom'} content={'Element with higher stats<br/> can be on top of element with lower stats'}>
                            <p className={style.contain_p}>layer number: {dataSelect.style?.zIndex}</p>
                        </StringTooltip>
                        <div className={style.layerButtonContainer}>
                            <button data-act={'increase'} value={dataSelect.style?.zIndex} onClick={handleClick} className={style.btnSettingLayer}>increase</button>
                            <button data-act={'decrease'} value={dataSelect.style?.zIndex} onClick={handleClick} className={style.btnSettingLayer}>decrease</button>
                        </div>
                        <div className={style.opacityButtonContainer}>
                            <StringTooltip style={{ marginTop: '7px', marginRight: '7px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} position={'bottom'} content={'Opacity'}>
                                <FiEye />
                            </StringTooltip>
                            <input autoComplete="off" id="o" onChange={handleChange} value={Math.round(dataSelect.style?.opacity * 100)} className={style.btnSettingOpacity} type="number" min="0" max="100" size="5"></input>
                        </div>
                    </div>
                )
            }
        },
        {
            name: 'Fill',
            element: ({ dataSelect = {}, handleChangeColor }) => {
                return (
                    <div className={style.blockContain}>
                        <div className={clsx(style.inputData, style.fillConfigBlock)}>
                            <p>{dataSelect.style?.color?.type}</p>
                            <ColorSetting hideControls={dataSelect.type === 'text'} data={dataSelect} handleChangeColor={handleChangeColor} />
                        </div>
                        {dataSelect.type === 'button' && (
                            <div className={clsx(style.inputData, style.fillConfigBlock)}>
                                <p>Text color</p>
                                <ColorSetting hideControls={true} type={'colorBtn'} data={dataSelect} handleChangeColor={handleChangeColor} />
                            </div>
                        )}
                    </div>
                )
            }
        },
        {
            name: 'Text',
            element: ({ dataSelect = {}, handleChange, handleClick }) => {
                return (
                    <div className={style.blockContain}>
                        <select value={dataSelect.style?.fontFamily} onChange={handleChange} id="fm" className={clsx(style.inputData)}>
                            <option value='"Times New Roman"'>Times New Roman</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Garamond">Garamond</option>
                            <option value="Arial">Arial</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value='"Courier New"'>Courier New</option>
                            <option value="Lucida Console">Lucida Console</option>
                            <option value="Monaco">Monaco</option>
                            <option value='"Brush Script MT"'>Brush Script MT</option>
                            <option value='"Lucida Handwriting"'>Lucida Handwriting</option>
                            <option value="Copperplate">Copperplate</option>
                            <option value="Papyrus">Papyrus</option>
                        </select>
                        <div className={style.btnListText}>
                            <button onClick={handleClick} className={clsx(style.btn, dataSelect.style.fontWeight > 500 && style.active)} data-act={'textBold'}><FiBold /></button>
                            <button onClick={handleClick} className={clsx(style.btn, dataSelect.style.textItalic && style.active)} data-act={'textIta'}><FiItalic /></button>
                            <button onClick={handleClick} className={clsx(style.btn, dataSelect.style.textUnderLine && style.active)} data-act={'textUnd'}><FiUnderline /></button>
                        </div>
                        <input autoComplete="off" type="number" min="0" onChange={handleChange} value={dataSelect.style?.fontSize} id="fz" className={clsx(style.inputData, style.inputFontSize)} />
                        <div className={clsx(style.btnListText, style.btnTextAlignList)}>
                            <button onClick={handleClick} className={clsx(style.btn, dataSelect.style.textAlign === 'center' && style.active)} data-act={'textACen'}><FiAlignCenter /></button>
                            <button onClick={handleClick} className={clsx(style.btn, dataSelect.style.textAlign === 'left' && style.active)} data-act={'textALef'}><FiAlignLeft /></button>
                            <button onClick={handleClick} className={clsx(style.btn, dataSelect.style.textAlign === 'right' && style.active)} data-act={'textArig'}><FiAlignRight /></button>
                        </div>
                        <div className={clsx(style.btnListText, style.btnTextAlignList, style.offBorder)}>
                            <button onClick={handleClick} className={clsx(style.btn, dataSelect.style.justifyContent === 'flex-end' && style.active)} data-act={'textABott'}><RxAlignBottom /></button>
                            <button onClick={handleClick} className={clsx(style.btn, dataSelect.style.justifyContent === 'center' && style.active)} data-act={'textACenVer'}><RxAlignCenterVertically /></button>
                            <button onClick={handleClick} className={clsx(style.btn, dataSelect.style.justifyContent === 'flex-start' && style.active)} data-act={'textATop'}><RxAlignTop /></button>
                        </div>
                        {dataSelect.type === 'link' && (
                            <label className={clsx(style.labelCoverInput, style.coverLinkInput)}><p className={style.icon}>URL</p><input autoComplete="off" type="url" onChange={handleChange} value={dataSelect.href?.href} id="hr" className={clsx(style.inputData, style.inputLink)} /></label>
                        )}
                    </div>
                )
            }
        },
        {
            name: 'Border',
            element: ({ dataSelect = {}, handleClick, handleChange, handleChangeColor, setBorderSide, showMenu, setShowMenu }) => {
                return (
                    <div className={style.blockContain}>
                        {dataSelect.style?.border === 'unset' ? (
                            <div onClick={handleClick} data-act="addborder" className={clsx(style.inputData, style.btnAddBorder)}><FiPlus /></div>
                        ) : (
                            <div className={clsx(style.fillConfigBlock)}>
                                <div className={clsx(style.fillConfigBlock)}>
                                    <select onChange={handleChange} value={dataSelect.style?.boxSizing} id="sb" className={clsx(style.selectTypeBox, style.inputData)}>
                                        <option value="content-box">outside</option>
                                        <option value="border-box">inside</option>
                                        <option value="unset">unset</option>
                                    </select>
                                </div>
                                <select value={dataSelect.style?.borderType} onChange={handleChange} id="bt" className={clsx(style.selectTypeBoder, style.inputData)}>
                                    <option value="solid">solid</option>
                                    <option value="dashed">dashed</option>
                                    <option value="dotted">dotted</option>
                                    <option value="double">double</option>
                                    <option value="groove">groove</option>
                                    <option value="ridge">ridge</option>
                                    <option value="inset">inset</option>
                                </select>
                                <div className={style.changeBorderColor}>
                                    <p>{dataSelect.style?.borderColor}</p>
                                    <ColorSetting hideControls={true} type={'border'} data={dataSelect} handleChangeColor={handleChangeColor} position={dataSelect.type === 'button'} />
                                </div>
                                <div className={style.sizeSettingContainer}>
                                    <label className={style.labelCoverInput}><input min="1" type="number" id="bs" onChange={handleChange} value={dataSelect.style?.borderSize} className={clsx(style.inputData, style.inputBorderSize)}></input><RxBorderWidth className={style.iconRight} /></label>
                                    <button onClick={() => { setShowMenu(!showMenu) }} className={clsx(style.selectTypeBoder, style.inputData)}>
                                        {showMenu && <Menu
                                            direction={"down"}
                                            isAbsolute={true}
                                            position={{ x: 0, y: 15, id: 'a' }}
                                            children={[
                                                {
                                                    name: 'top',
                                                    icon: !dataSelect.style?.unBorderTop && <FiCheck />,
                                                    func: setBorderSide
                                                },
                                                {
                                                    name: 'bottom',
                                                    icon: !dataSelect.style?.unBorderBottom && <FiCheck />,
                                                    func: setBorderSide
                                                },
                                                {
                                                    name: 'left',
                                                    icon: !dataSelect.style?.unBorderLeft && <FiCheck />,
                                                    func: setBorderSide
                                                },
                                                {
                                                    name: 'right',
                                                    icon: !dataSelect.style?.unBorderRight && <FiCheck />,
                                                    func: setBorderSide
                                                }
                                            ]}
                                        />}
                                        set side
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        },
        {
            name: 'Effect',
            element: ({ dataSelect = {}, handleChangeColor, handleChange, handleClick }) => {
                return (
                    <div className={style.blockContain}>
                        {(dataSelect.style?.shadow === 'none') ? (
                            <div onClick={handleClick} data-act="addEffect" className={clsx(style.inputData, style.btnAddBorder)}><FiPlus /></div>
                        ) : (
                            <>
                                <select onChange={handleChange} id="st" className={clsx(style.inputData)}>
                                    <option value="shadowO">Shadow outer</option>
                                    {dataSelect.type !== 'text' && dataSelect.type !== 'img' && dataSelect.type !== 'link' && (
                                        <option value='shadowI'>Shadow inner</option>
                                    )}
                                    {dataSelect.type !== 'text' && dataSelect.type !== 'img' && dataSelect.type !== 'link' && (
                                        <option value="blurBG">Blur Background</option>
                                    )}
                                    <option value="unset">Unset</option>
                                </select>

                                {dataSelect.style.shadow !== 'none' && dataSelect.style.shadow !== 'blurBG' &&
                                    <div className={style.containerPositionShadow}>
                                        <label className={style.labelCoverInput}><p className={style.icon}>X</p><input autoComplete="off" type="number" onChange={handleChange} value={dataSelect.style.shadowX} id="sx" className={style.inputData} /></label>
                                        <label className={style.labelCoverInput}><p className={style.icon}>Y</p><input autoComplete="off" type="number" onChange={handleChange} value={dataSelect.style.shadowY} id="sy" className={style.inputData} /></label>
                                    </div>
                                }
                                <div className={clsx(style.containerPositionShadow, style.coverInputBlur)}>
                                    <label className={clsx(style.labelCoverInput)}><p className={style.icon}>Blur</p><input autoComplete="off" type="number" min="0" onChange={handleChange} value={dataSelect.style.blur} id="bl" className={style.inputData} /></label>
                                    {dataSelect.style.shadow !== 'none' && dataSelect.style.shadow !== 'blurBG' && (<div className={clsx(style.changeBorderColor, style.changeShadowColor)}>
                                        <p className={style.colorShadow}>{dataSelect.style?.shadowColor}</p>
                                        <ColorSetting hideControls={true} type={'shadow'} data={dataSelect} handleChangeColor={handleChangeColor} position={true} />
                                    </div>)}
                                </div>
                            </>
                        )}
                    </div>
                )
            }
        },
    ]

    function selectStyle() {
        const pageSelect = data.pageSelect
        const itemTarget = data.itemTarget
        let newData
        if (itemTarget) {
            newData = {
                position: null,
                style: null,
                type: '',
                href: null
            }
            data.data.forEach(page => {
                if (page.id === pageSelect) {
                    page.listItem.forEach(item => {
                        if (item.id === itemTarget) {
                            newData.style = item.style
                            newData.position = item.position
                            newData.type = item.type
                            newData.href = item.href
                        }
                    })
                }
            })
        } else {
            newData = {
                style: null,
            }
        }

        return newData
    }

    useEffect(() => {
        setDataSelect(selectStyle())
    }, [data.itemTarget, data.pageSelect])

    function handleChange(e) {
        const type = e.target.getAttribute('id')
        let value = Number(e.target.value) ? Number(e.target.value) : e.target.value
        let newDataItem = {}

        switch (type) {
            case 'x': {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        position: {
                            ...prev.position,
                            x: value
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'y': {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        position: {
                            ...prev.position,
                            y: value
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'h': {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            height: value
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'w': {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            width: value
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'r': {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            rotate: value
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'b': {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            borderRadius: value
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'o': {
                value = value / 100
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            opacity: value
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'bs': {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            borderSize: value
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'bt': {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            borderType: value
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'sb': {
                if (value !== 'unset') {
                    setDataSelect(prev => {
                        newDataItem = {
                            ...prev,
                            style: {
                                ...prev.style,
                                boxSizing: value
                            }
                        }

                        return newDataItem
                    })
                } else {
                    setDataSelect(prev => {

                        newDataItem = {
                            ...prev,
                            style: {
                                ...prev.style,
                                border: value,
                                unBorderLeft: false,
                                unBorderRight: false,
                                unBorderTop: false,
                                unBorderBottom: false,
                            }
                        }

                        return newDataItem
                    })
                }

                break
            }
            case 'fm': {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            fontFamily: value
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'fz': {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            fontSize: value
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'st': {
                console.log(value)
                setDataSelect(prev => {
                    if (value === 'unset') {
                        newDataItem = {
                            ...prev,
                            style: {
                                ...prev.style,
                                shadow: 'none',
                                shadowInner: false,
                            }
                        }
                    } else if (value === 'shadowI') {
                        newDataItem = {
                            ...prev,
                            style: {
                                ...prev.style,
                                shadow: 'shadowI',
                                shadowInner: true,
                            }
                        }
                    } else if (value === 'shadowO') {
                        newDataItem = {
                            ...prev,
                            style: {
                                ...prev.style,
                                shadow: 'shadowO',
                                shadowInner: false,
                            }
                        }
                    } else if (value === 'blurBG') {
                        newDataItem = {
                            ...prev,
                            style: {
                                ...prev.style,
                                shadow: 'blurBG',
                                shadowInner: false,
                                backGroundBlur: 1
                            }
                        }
                    }


                    return newDataItem
                })
                break
            }
            case 'sx': {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            shadowX: value
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'sy': {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            shadowY: value
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'bl': {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            blur: value
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'hr': {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                        href: { href: value }
                    }

                    return newDataItem
                })
                break
            }
            default: {
                setDataSelect(prev => {
                    newDataItem = {
                        ...prev,
                    }

                    return newDataItem
                })
            }
        }

    }

    function handleClick(e) {
        const value = Number(e.target.value)
        let action = e.target.getAttribute('data-act')
        while (!action) {
            e.target = e.target.parentElement
            action = e.target.getAttribute('data-act')
        }

        let newDataItem

        setDataSelect(prev => {
            if (action === 'increase') {
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        zIndex: value + 1
                    }
                }
            } else if (action === 'decrease') {
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        zIndex: value - 1
                    }
                }
            } else if (action === 'addborder') {
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        border: 'set',
                        borderType: 'solid',
                    }
                }
            } else if (action === 'textBold') {
                let weight
                if (prev.style.fontWeight > 500) {
                    weight = 500
                } else {
                    weight = 900
                }
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        fontWeight: weight
                    }
                }
            } else if (action === 'textIta') {
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        textItalic: !prev.style.textItalic
                    }
                }
            } else if (action === 'textUnd') {
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        textUnderLine: !prev.style.textUnderLine
                    }
                }
            } else if (action === 'textACen') {
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        textAlign: 'center'
                    }
                }
            } else if (action === 'textALef') {
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        textAlign: 'left'
                    }
                }
            } else if (action === 'textArig') {
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        textAlign: 'right'
                    }
                }
            } else if (action === 'textATop') {
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        justifyContent: 'flex-start'
                    }
                }
            } else if (action === 'textACenVer') {
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        justifyContent: 'center'
                    }
                }
            } else if (action === 'textABott') {
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        justifyContent: 'flex-end'
                    }
                }
            } else if (action === 'addEffect') {
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        shadow: 'shadowO'
                    }
                }
            }
            return newDataItem
        })

    }

    function handleChangeColor(codeColor, isGradient, type, valueToHex) {

        if (codeColor !== undefined) {
            let typeFill = isGradient ? 'liner' : 'solid'

            switch (type) {
                case 'fill': {
                    dataSelect.style.color = {
                        type: typeFill,
                        code: codeColor
                    }
                    break
                }
                case 'border': {
                    dataSelect.style.borderColor = valueToHex()
                    break
                }
                case 'shadow': {
                    dataSelect.style.shadowColor = valueToHex()
                    break
                }
                case 'colorBtn': {
                    dataSelect.style.fontColor = codeColor
                }
                default: { }
            }

            const newData = data.data.map(page => {
                if (page.id === data.pageSelect) {
                    return {
                        ...page,
                        listItem: page.listItem.map(item => {
                            if (item.id === data.itemTarget) {
                                return {
                                    ...item,
                                    style: dataSelect.style
                                }
                            }
                            return item
                        })
                    }
                }
                return page
            })

            data.setData(newData)

        }
    }

    useEffect(() => {
        const newData = data.data.map(page => {
            if (page.id === data.pageSelect) {
                return {
                    ...page,
                    listItem: page.listItem.map(item => {
                        if (item.id === data.itemTarget) {
                            if (dataSelect === undefined) {
                                return {
                                    ...item
                                }
                            }
                            return {
                                ...item,
                                position: dataSelect.position,
                                style: dataSelect.style,
                                href: dataSelect.href
                            }
                        }
                        return item
                    })
                }
            }
            return page
        })

        data.setData(newData)
    }, [dataSelect])

    function setBorderSide(e) {
        const func = e.target.getAttribute('data-func')

        switch (func) {
            case 'top': {
                setDataSelect(prev => {
                    const newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            unBorderTop: !prev.style.unBorderTop
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'bottom': {
                setDataSelect(prev => {
                    const newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            unBorderBottom: !prev.style.unBorderBottom
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'left': {
                setDataSelect(prev => {
                    const newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            unBorderLeft: !prev.style.unBorderLeft
                        }
                    }

                    return newDataItem
                })
                break
            }
            case 'right': {
                setDataSelect(prev => {
                    const newDataItem = {
                        ...prev,
                        style: {
                            ...prev.style,
                            unBorderRight: !prev.style.unBorderRight
                        }
                    }

                    return newDataItem
                })
                break
            }
            default: { }
        }
    }

    return (
        data.itemTarget ?
            (<div className={style.detailObject}>
                {blockSetting.map((block, index) => {
                    if (dataSelect.type === 'block' || dataSelect.type === 'button') {
                        if (block.name !== 'Text' && dataSelect.type === 'block') {
                            return (
                                <div className={style.blockOptionDetail} key={index}>
                                    <p className={style.blockName}>{block.name}</p>
                                    {block.element({
                                        dataSelect,
                                        handleChange,
                                        handleClick,
                                        handleChangeColor,
                                        showMenu,
                                        setShowMenu,
                                        setBorderSide
                                    })}
                                </div>
                            )
                        } else {
                            if (dataSelect.type === 'button') {
                                return (
                                    <div className={style.blockOptionDetail} key={index}>
                                        <p className={style.blockName}>{block.name}</p>
                                        {block.element({
                                            dataSelect,
                                            handleChange,
                                            handleClick,
                                            handleChangeColor,
                                            showMenu,
                                            setShowMenu,
                                            setBorderSide
                                        })}
                                    </div>
                                )
                            }
                        }
                    } else if (dataSelect.type === 'text') {
                        if (block.name !== 'Border') {
                            return (
                                <div className={style.blockOptionDetail} key={index}>
                                    <p className={style.blockName}>{block.name}</p>
                                    {block.element({
                                        dataSelect,
                                        handleChange,
                                        handleClick,
                                        handleChangeColor,
                                        showMenu,
                                        setShowMenu,
                                        setBorderSide
                                    })}
                                </div>
                            )
                        }
                    } else if (dataSelect.type === 'img') {
                        if (block.name !== 'Fill' && block.name !== 'Text') {
                            return (
                                <div className={style.blockOptionDetail} key={index}>
                                    <p className={style.blockName}>{block.name}</p>
                                    {block.element({
                                        dataSelect,
                                        handleChange,
                                        handleClick,
                                        handleChangeColor,
                                        showMenu,
                                        setShowMenu,
                                        setBorderSide
                                    })}
                                </div>
                            )
                        }
                    } else if (dataSelect.type === 'link') {
                        if (block.name !== 'Border') {
                            return (
                                <div className={style.blockOptionDetail} key={index}>
                                    <p className={style.blockName}>{block.name}</p>
                                    {block.element({
                                        dataSelect,
                                        handleChange,
                                        handleClick,
                                        handleChangeColor,
                                        showMenu,
                                        setShowMenu,
                                        setBorderSide
                                    })}
                                </div>
                            )
                        }
                    }
                })}
            </div>) :
            (<DetailPage data={data} />)
    )
}

export default DetailObject