import { useState, useEffect } from 'react'
import style from './DetailObject.module.css'
import StringTooltip from '../../tooltip/StringTooltip/StringTooltip'
import { FiEye } from "react-icons/fi";

const blockSetting = [
    {
        name: 'Position',
        element: ({ dataSelect, handleChange }) => {
            return (
                <div className={style.blockContain}>
                    <input autocomplete="off" type="number" min="0" onChange={handleChange} value={dataSelect.position?.x} id="x" className={style.inputData} />
                    <input autocomplete="off" type="number" min="0" onChange={handleChange} value={dataSelect.position?.y} id="y" className={style.inputData} />
                    <input autocomplete="off" type="number" min="0" onChange={handleChange} value={dataSelect.style?.width} id="w" className={style.inputData} />
                    <input autocomplete="off" type="number" min="0" onChange={handleChange} value={dataSelect.style?.height} id="h" className={style.inputData} />
                    <StringTooltip content={'rotation'} style={{ width: '41%' }} position={"bottom"} className={style.inputData}>
                        <input autocomplete="off" type="number" min="0" max="360" onChange={handleChange} style={{ cursor: 'default', width: '96%', border: 'unset', textAlign: 'center' }} value={dataSelect.style?.rotate} id="r" />
                    </StringTooltip>
                    {dataSelect.type !== 'text' ?
                        (<StringTooltip content={'corner radius'} style={{ width: '41%' }} position={"bottom"} className={style.inputData}>
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
        element: ({ dataSelect, handleChange, handleClick }) => {
            return (
                <div className={style.blockContain}>
                    <StringTooltip position={'bottom'} content={'Element with higher stats<br/> can be on top of element with lower stats'}>
                        <p>layer number: {dataSelect.style?.zIndex}</p>
                    </StringTooltip>
                    <div className={style.layerButtonContainer}>
                        <button data-act={'increase'} value={dataSelect.style?.zIndex} onClick={handleClick} className={style.btnSettingLayer}>increase</button>
                        <button data-act={'decrease'} value={dataSelect.style?.zIndex} onClick={handleClick} className={style.btnSettingLayer}>decrease</button>
                    </div>
                    <div className={style.opacityButtonContainer}>
                        <StringTooltip style={{marginTop: '7px',marginRight: '7px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}} position={'bottom'} content={'Opacity'}>
                            <FiEye/>
                        </StringTooltip>
                        <input autocomplete="off" id="o" onChange={handleChange} value={Math.round(dataSelect.style?.opacity * 100)} className={style.btnSettingOpacity} type="number" min="0" max="100" size="5"></input>
                    </div>
                </div>
            )
        }
    },
    {
        name: 'Fill',
        element: ({ data }) => {
            return (
                <div className={style.blockContain}>
                    
                </div>
            )
        }
    },
    {
        name: 'Other',
        element: ({ data }) => {
            return (
                <div className={style.blockContain}>
                    hi
                </div>
            )
        }
    },
]

function DetailObject({ data }) {
    const [dataSelect, setDataSelect] = useState(selectStyle())
    console.log(dataSelect)

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
    }, [data.itemTarget])

    function handleChange(e) {
        const type = e.target.getAttribute('id')
        let value = Number(e.target.value)
        let newDataItem

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
                console.log(value)
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
            default: { }
        }

    }

    function handleClick(e){
        const value = Number(e.target.value)
        const action = e.target.getAttribute('data-act')
        let newDataItem

        setDataSelect(prev => {
            if(action === 'increase'){
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        zIndex: value + 1
                    }
                }
            }else{
                newDataItem = {
                    ...prev,
                    style: {
                        ...prev.style,
                        zIndex: value - 1
                    }
                }
            }

            return newDataItem
        })

    }

    useEffect(() => {
        const newData = data.data.map(page => {
            if (page.id === data.pageSelect) {
                return {
                    ...page,
                    listItem: page.listItem.map(item => {
                        if (item.id === data.itemTarget) {
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

    return (
        <div className={style.detailObject}>
            {data.itemTarget && blockSetting.map(block => {
                return (
                    <div className={style.blockOptionDetail}>
                        <p className={style.blockName}>{block.name}</p>
                        {block.element({
                            dataSelect,
                            handleChange,
                            handleClick
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default DetailObject