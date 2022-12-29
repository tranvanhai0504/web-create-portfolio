import style from './DetailPage.module.css'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import StringTooltip from '../../tooltip/StringTooltip/StringTooltip'
import ColorSetting from '../DetailObject/colorSetting/ColorSetting'

const blockSetting = [
    {
        name: 'Page option',
        element: ({ detailData = {}, handleClick, handleChangeColor }) => {
            return (
                <div className={style.blockContain}>
                    <div className={clsx(style.inputData, style.fillConfigBlock)}>
                        <p>{detailData.style?.color?.type}</p>
                        <ColorSetting hideControls={detailData.type === 'text'} data={detailData} handleChangeColor={handleChangeColor} />
                    </div>
                    <div className={clsx(style.fillConfigBlock)}>
                        <StringTooltip position={'bottom'} content={'A page block equal to <br> your screen size'}>
                            <p>Page Block</p>
                        </StringTooltip>
                        <div className={clsx(style.numPageBlockContainer)}>
                            <button className={style.blockNumBtn} id="add" onClick={handleClick}>+</button>
                            <input className={style.blockNum} value={detailData.style?.height} type="number" disabled={true}></input>
                            <button className={style.blockNumBtn} id="sub" onClick={handleClick}>-</button>
                        </div>
                    </div>
                </div>
            )
        }
    },
]

function DetailPage({ data }) {
    const selectStyle = () => {
        const pageSelect = data.pageSelect

        let newData = {
            style: null
        }

        data.data.forEach(page => {
            if (page.id === pageSelect) {
                newData.style = page.style
            }
        })

        return newData
    }

    const updateStyle = (style) => {

        data.setData(prev => {
            return prev.map(page => {
                if (page.id === data.pageSelect) {
                    return {
                        ...page,
                        style: style
                    }
                } else return page
            })
        })
    }
    const [detailData, setDetailData] = useState(selectStyle())

    useEffect(() => {
        setDetailData(selectStyle())
    }, [data.pageSelect])

    function handleClick(e) {
        const func = e.target.getAttribute('id')
        let newData

        if (func === 'add') {
            setDetailData(prev => {

                newData = {
                    style: {
                        ...prev.style,
                        height: Number(prev.style.height + 1)
                    }
                }

                return newData
            })
        } else if (detailData.style.height !== 1 && func === 'sub') {
            setDetailData(prev => {

                newData = {
                    style: {
                        ...prev.style,
                        height: Number(prev.style.height - 1)
                    }
                }

                return newData
            })
        }

        updateStyle(newData.style)
    }

    function handleChangeColor(codeColor, isGradient, type, valueToHex) {

        if (codeColor !== undefined) {
            let typeFill = isGradient ? 'liner' : 'solid'

            detailData.style = {
                ...detailData.style,
                color: {
                    type: typeFill,
                    code: codeColor
                }
            }

            updateStyle(detailData.style)
        }
    }

    return (
        <div className={style.pageObject}>
            {
                blockSetting.map((block) => {
                    return (
                        <div className={style.blockOptionDetail}>
                            <p className={style.blockName}>{block.name}</p>
                            {block.element({
                                detailData,
                                handleClick,
                                handleChangeColor
                            })}
                        </div>
                    )
                })
            }
            <div className={style.blockOptionDetail}>
                
            </div>
        </div>
    )
}

export default DetailPage