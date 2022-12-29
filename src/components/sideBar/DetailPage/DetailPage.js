import style from './DetailPage.module.css'
import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import StringTooltip from '../../tooltip/StringTooltip/StringTooltip'
import { FiSquare, FiType, FiImage, FiLink2 } from "react-icons/fi";
import { CgPlayButtonR } from "react-icons/cg";
import { HiLockClosed } from "react-icons/hi";
import { TbLockOpen } from "react-icons/tb";
import Menu from '../../menuCustom/Menu'
import makeid from '../../../utils/makeid';
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

    const selectListItem = (data) => {
        const pageSelect = data.pageSelect
        let listItem = []
        data.data.forEach(page => {
            if (page.id === pageSelect) {
                listItem = page.listItem
            }
        })
        return listItem
    }

    const [detailData, setDetailData] = useState(selectStyle())
    const [listItem, setListItem] = useState(selectListItem(data))
    const [isActiveMenu, setIsActiveMenu] = useState(false)
    const [positionMenu, setPositionMenu] = useState({ x: 0, y: 0 })

    useEffect(() => {
        setListItem(selectListItem(data))
    }, data.data)

    useEffect(() => {
        setDetailData(selectStyle())
    }, [data.pageSelect])

    useEffect(() => {
        function turnOffMenu(e) {
            setIsActiveMenu(false)
        }
        document.addEventListener('click', turnOffMenu)

        return () => {
            document.removeEventListener('click', turnOffMenu)
        }
    }, [])

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

    function handleClickLock(id) {
        if (data.listLockedItem.includes(id)) {
            data.setListLockedItem(prev => {
                return prev.filter(idItem => {
                    return idItem !== id
                })
            })
        } else {
            data.setListLockedItem(prev => [...prev, id])
        }
    }

    function handleMouseEnter(id) {
        data.setItemHover(id)
    }

    function handleClickItem(e, id) {
        if (!e.target.classList.contains('lock') && !data.listLockedItem.includes(id)) {
            data.setItemTarget(id)
            data.setItemHover(undefined)
        }
    }

    function handleMouseDown(e) {

        let parent = e.target
        while(!parent.classList.contains(style.item)){
            parent = parent.parentElement
        }
        const type = parent.getAttribute('data-type')

        function turnOnMenu(e) {
            if (type !== 'button') {
                setIsActiveMenu(true)
                const x = parent.getBoundingClientRect().left + parent.getBoundingClientRect().width
                const y = parent.getBoundingClientRect().top - 15
                setPositionMenu({
                    id: parent.getAttribute('data-id'),
                    x: x,
                    y: y
                })
            } else {
                setIsActiveMenu(false)
                parent.classList.add('errorButton')
                setTimeout(() => {
                    parent.classList.remove('errorButton')
                }, 1000)
            }
            e.preventDefault()
        }

        if (e.button === 2) {
            e.target.addEventListener('contextmenu', turnOnMenu)
        }
    }

    function handleClickBtnMenu(e, data) {

        const func = e.target.getAttribute('data-func')
        const id = e.target.getAttribute('id')
        const targetPage = data.pageSelect

        switch (func) {
            case 'Delete': {
                const newData = data.data.map(page => {
                    if (targetPage === page.id) {
                        return {
                            ...page,
                            listItem: page.listItem.filter(item => {
                                return item.id !== id
                            }),
                        }
                    }
                    return page
                })
                data.setData(newData)
                data.setItemTarget(null)
                data.setIsDragging(false)
                break
            } case 'Copy': {
                let newItem

                data.data.forEach(page => {
                    page.listItem.forEach(item => {
                        if (item.id === id) {
                            newItem = {
                                ...item,
                                id: makeid(10),
                            }
                        }
                    })
                })

                const newData = data.data.map(page => {
                    if (targetPage === page.id) {
                        return {
                            ...page,
                            listItem: [...page.listItem, JSON.parse(JSON.stringify(newItem))]
                        }
                    }
                    return page
                })
                data.setData(newData)
                data.setItemTarget(null)
                data.setIsDragging(false)
                break
            }
            default: { }
        }
    }

    let listButtonMenu = useRef([
        {
            name: 'Delete',
            func: handleClickBtnMenu
        },
        {
            name: 'Copy',
            func: handleClickBtnMenu
        }
    ])

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
                <p className={style.blockName}>List item</p>
                <div className={style.blockContain}>
                    {listItem.map(item => {
                        return (
                            <div data-type={item.type} key={item.id} data-id={item.id} onMouseDown={handleMouseDown} onClick={(e) => { handleClickItem(e, item.id) }} onMouseLeave={() => { data.setItemHover(undefined) }} onMouseEnter={(e) => { handleMouseEnter(item.id) }} className={clsx(style.item)}>
                                <div className={style.containerText}>
                                    {item.type === 'block' && <FiSquare className={style.icon} />}
                                    {item.type === 'text' && <FiType className={style.icon} />}
                                    {item.type === 'img' && <FiImage className={style.icon} />}
                                    {item.type === 'link' && <FiLink2 className={style.icon} />}
                                    {item.type === 'button' && <CgPlayButtonR className={style.icon} />}
                                    <p>{item.type}</p>
                                </div>
                                {data.listLockedItem.includes(item.id) ? <HiLockClosed onClick={(e) => { handleClickLock(item.id) }} className={clsx(style.iconLock, 'lock')} /> : <TbLockOpen onClick={(e) => { handleClickLock(item.id) }} className={clsx(style.iconLock, 'lock')} />}
                            </div>
                        )
                    })}
                    {isActiveMenu && <Menu children={listButtonMenu.current} setIsActive={setIsActiveMenu} data={data} position={positionMenu} direction={'right'}></Menu>}
                </div>
            </div>
        </div>
    )
}

export default DetailPage