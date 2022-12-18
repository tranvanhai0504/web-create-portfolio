import { useState, useEffect } from 'react'
import style from './DetailObject.module.css'
import clsx from 'clsx'
import StringTooltip from '../../tooltip/StringTooltip/StringTooltip'
import { FiPlus } from "react-icons/fi";
import ColorSetting from './colorSetting/ColorSetting'
import Menu from '../../menuCustom/Menu'
import { FiEye, FiCheck } from "react-icons/fi";
import { MdOutlineRoundedCorner, MdOutlineRotate90DegreesCcw } from "react-icons/md";
import { RxBorderWidth } from "react-icons/rx";

const blockSetting = [
    {
        name: 'Position',
        element: ({ dataSelect = {}, handleChange }) => {
            return (
                <div className={style.blockContain}>
                    <label className={style.labelCoverInput}><p className={style.icon}>X</p><input autocomplete="off" type="number" min="0" onChange={handleChange} value={dataSelect.position?.x} id="x" className={style.inputData} /></label>
                    <label className={style.labelCoverInput}><p className={style.icon}>Y</p><input autocomplete="off" type="number" min="0" onChange={handleChange} value={dataSelect.position?.y} id="y" className={style.inputData} /></label>
                    <label className={style.labelCoverInput}><p className={style.icon}>W</p><input autocomplete="off" type="number" min="0" onChange={handleChange} value={dataSelect.style?.width} id="w" className={style.inputData} /></label>
                    <label className={style.labelCoverInput}><p className={style.icon}>H</p><input autocomplete="off" type="number" min="0" onChange={handleChange} value={dataSelect.style?.height} id="h" className={style.inputData} /></label>
                    <StringTooltip content={'rotation'} style={{ width: '41%' }} position={"bottom"} className={style.inputData}>
                        <MdOutlineRotate90DegreesCcw className={style.icon} />
                        <input autocomplete="off" type="number" min="-360" max="360" onChange={handleChange} style={{ cursor: 'default', width: '96%', border: 'unset', textAlign: 'center' }} value={dataSelect.style?.rotate} id="r" />
                    </StringTooltip>
                    {dataSelect.type !== 'text' ?
                        (<StringTooltip content={'corner radius'} style={{ width: '41%' }} position={"bottom"} className={style.inputData}>
                            <MdOutlineRoundedCorner className={style.icon} />
                            <input autocomplete="off" disabled={dataSelect.type === 'text'} type="number" min="0" onChange={handleChange} style={{ cursor: 'default', width: '96%', border: 'unset', textAlign: 'center' }} value={dataSelect.style?.borderRadius} id="b" />
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
                        <input autocomplete="off" id="o" onChange={handleChange} value={Math.round(dataSelect.style?.opacity * 100)} className={style.btnSettingOpacity} type="number" min="0" max="100" size="5"></input>
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
                        <ColorSetting data={dataSelect} handleChangeColor={handleChangeColor} />
                    </div>
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
                                <ColorSetting type={'border'} data={dataSelect} handleChangeColor={handleChangeColor} />
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
]

function DetailObject({ data }) {
    const [dataSelect, setDataSelect] = useState(selectStyle())
    const [showMenu, setShowMenu] = useState(false)

    function selectStyle() {
        const pageSelect = data.pageSelect
        const itemTarget = data.itemTarget
        let newData = {
            position: null,
            style: null,
            type: ''
        }
        data.data.forEach(page => {
            if (page.id === pageSelect) {
                page.listItem.forEach(item => {
                    if (item.id === itemTarget) {
                        newData.style = item.style
                        newData.position = item.position
                        newData.type = item.type
                    }
                })
            }
        })
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
        while(!action){
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
                        borderColor: '#000',
                        borderType: 'solid',
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
        <div className={style.detailObject}>
            {data.itemTarget && blockSetting.map(block => {
                return (
                    <div className={style.blockOptionDetail}>
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
            })}
        </div>
    )
}

export default DetailObject