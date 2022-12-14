import { useState, useEffect } from 'react'
import style from './DetailObject.module.css'
import StringTooltip from '../../tooltip/StringTooltip/StringTooltip'

const blockSetting = [
    {
        name: 'Position',
        element: ({ dataSelect, handleChange }) => {
            return (
                <div className={style.blockContain}>
                    <input onChange={handleChange} value={dataSelect.position?.x} id="x" className={style.inputData} />
                    <input onChange={handleChange} value={dataSelect.position?.y} id="y" className={style.inputData} />
                    <input onChange={handleChange} value={dataSelect.style?.width} id="w" className={style.inputData} />
                    <input onChange={handleChange} value={dataSelect.style?.height} id="h" className={style.inputData} />
                    <StringTooltip content={'rotation'} style={{ width: '41%' }} position={"bottom"} className={style.inputData}>
                        <input onChange={handleChange} style={{ width: '96%', border: 'unset' }} value={dataSelect.style?.rotate} id="r" />
                    </StringTooltip>
                    <StringTooltip content={'corner radius'} style={{ width: '41%' }} position={"bottom"} className={style.inputData}>
                        <input onChange={handleChange} style={{ width: '96%', border: 'unset' }} value={dataSelect.style?.borderRadius} id="b" />
                    </StringTooltip>
                </div>
            )
        }
    },
    {
        name: 'Layer',
        element: ({ data }) => {
            return (
                <div className={style.blockContain}>
                    hi
                </div>
            )
        }
    },
    {
        name: 'Fill',
        element: ({ data }) => {
            return (
                <div className={style.blockContain}>
                    hi
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

    function selectStyle() {
        const pageSelect = data.pageSelect
        const itemTarget = data.itemTarget
        let newData = {
            position: null,
            style: null
        }
        data.data.forEach(page => {
            if (page.name === pageSelect) {
                page.listItem.forEach(item => {
                    if (item.id === itemTarget) {
                        newData.style = item.style
                        newData.position = item.position
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
        const value = Number(e.target.value)
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
            default: { }
        }

    }

    useEffect(() => {
        const newData = data.data.map(page => {
            if (page.name === data.pageSelect) {
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
                            handleChange
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default DetailObject