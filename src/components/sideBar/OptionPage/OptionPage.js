import { useState, useRef, useEffect } from 'react'
import AddPageBtn from '../../button/addMorePage/AddPageBtn'
import styles from './OptionPage.module.css'
import makeid from '../../../utils/makeid'
import { FiMoreVertical } from "react-icons/fi";
import Menu from '../../menuCustom/Menu'
import clsx from 'clsx'
import { t } from 'i18next';

function OptionPage({ data }) {

    const [pageSelectedRename, setPageSelectedRename] = useState()
    const [pageSelectMouseEnter, setPageSelectMouseEnter] = useState()
    const [isActiveMenu, setIsActiveMenu] = useState(false)
    const [positionMenu, setPositionMenu] = useState({ x: 0, y: 0 })

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

        if (!e.target.getAttribute('data-id')) {
            const func = (e.target.getAttribute('data-func'))

            switch (func) {
                case 'Delete': {
                    const id = e.target.getAttribute('id')
                    if(data.data.length === 2){
                        data.data.forEach(page => {
                            page.listItem = page.listItem.filter(item => {
                                return item.type !== 'button'
                            })
                        })
                    }else{
                        data.data.forEach(page => {
                            page.listItem = page.listItem.filter(item => {
                                return item.direct !== id
                            })
                        })
                    }

                    data.setData(prev => {
                        return prev.filter(data => {
                            return data.id !== id
                        })
                    })
                    setIsActiveMenu(false)
                    break
                }
                case 'Copy': {
                    const id = e.target.getAttribute('id')

                    data.setData(prev => {
                        const copyData = prev.filter(data => {
                            return data.id === id
                        })[0]

                        const newData = {
                            id: makeid(10),
                            name: copyData.name + ' (copy)',
                            listItem: copyData.listItem.map(item => {
                                return JSON.parse(JSON.stringify({...item, id: makeid(10)}))
                            }),
                            style: copyData.style
                        }

                        const item = {
                            type: 'button',
                            id: makeid(10),
                            style: {
                              borderRadius: 0,
                              color: {
                                type: 'solid',
                                code: '#ccc'
                              },
                              fontColor: 'white',
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: '"Times New Roman"',
                              textItalic: false,
                              textUnderLine: false,
                              textAlign: 'left',
                              display: 'flex',
                              justifyContent: 'flex-start',
                              verticalAlign: 'text-bottom',
                              boxSizing: 'content-box',
                              border: 'unset',
                              borderColor: 'black',
                              borderType: '',
                              borderSize: 1,
                              unBorderLeft: false,
                              unBorderRight: false,
                              unBorderTop: false,
                              unBorderBottom: false,
                              width: 50,
                              height: 20,
                              shadow: 'none',
                              shadowX: 5,
                              shadowY: 5,
                              blur: 1,
                              shadowColor: 'black',
                              shadowInner: false,
                              zIndex: 3,
                              rotate: 0,
                              opacity: 1
                            },
                            position: { x: 0, y: 0 },
                            direct: newData.id,
                            name: newData.name
                          }
                        if(prev.length === 1){
                            const item2 = {
                                type: 'button',
                                id: makeid(10),
                                style: {
                                  borderRadius: 0,
                                  color: {
                                    type: 'solid',
                                    code: '#ccc'
                                  },
                                  fontColor: 'white',
                                  fontSize: 14,
                                  fontWeight: 500,
                                  fontFamily: '"Times New Roman"',
                                  textItalic: false,
                                  textUnderLine: false,
                                  textAlign: 'left',
                                  display: 'flex',
                                  justifyContent: 'flex-start',
                                  verticalAlign: 'text-bottom',
                                  boxSizing: 'content-box',
                                  border: 'unset',
                                  borderColor: 'black',
                                  borderType: '',
                                  borderSize: 1,
                                  unBorderLeft: false,
                                  unBorderRight: false,
                                  unBorderTop: false,
                                  unBorderBottom: false,
                                  width: 50,
                                  height: 20,
                                  shadow: 'none',
                                  shadowX: 5,
                                  shadowY: 5,
                                  blur: 1,
                                  shadowColor: 'black',
                                  shadowInner: false,
                                  zIndex: 3,
                                  rotate: 0,
                                  opacity: 1
                                },
                                position: { x: 0, y: 0 },
                                direct: prev[0].id,
                                name: prev[0].name
                              }
                            prev[0].listItem.push(JSON.parse(JSON.stringify(item2)),JSON.parse(JSON.stringify( item)))
                            newData.listItem.push(JSON.parse(JSON.stringify(item2)),JSON.parse(JSON.stringify( item)))
                        }else{
                            prev.forEach(page => {
                                page.listItem.push(JSON.parse(JSON.stringify(item)))
                            })
                            newData.listItem.push(JSON.parse(JSON.stringify(item)))
                        }

                        return [...prev, newData]
                    })
                    setIsActiveMenu(false)

                }
                default: { }
            }
        } else {
            switch (e.detail) {
                case 1: {
                    data.setPageSelect(e.target.getAttribute('data-id'))
                    data.setItemTarget(null)
                    break
                }
                case 2: {
                    if (e.target.getAttribute('data-id') === pageSelectedRename?.name) {
                        setPageSelectedRename(null)
                    } else {
                        setPageSelectMouseEnter(null)
                        setPageSelectedRename((prev) => {
                            const [tempData] = data.data.filter((d) => {
                                return d.id === e.target.getAttribute('data-id')
                            })
                            return tempData
                        })
                        e.target.children[0].focus()
                    }
                    break
                }
                default: { }
            }
        }


    }

    function handleMouseEnter(e) {
        if (!(pageSelectedRename?.id === e.target.getAttribute('data-id')))
            setPageSelectMouseEnter(e.target.getAttribute('data-id'))
    }

    function handleMouseLeave(e) {
        setPageSelectMouseEnter(null)
    }

    function handleOnChange(e) {
        data.data.forEach(d => {
            if (d.id === e.target.getAttribute('data-id')) {
                d.name = e.target.value
            }
        })
        setPageSelectedRename((prev) => {
            return {
                ...prev,
                name: e.target.value
            }
        })
    }

    function handleBlur(e) {
        setPageSelectedRename(null)
    }

    function handleClickBtnMenu(e) {
        
    }

    let listButtonMenu = useRef([
        {
            name: t('Delete'),
            func: handleClickBtnMenu
        },
        {
            name: t('Copy'),
            func: handleClickBtnMenu
        }
    ])

    function handleMouseDown(e) {

        function turnOnMenu(e) {
            setIsActiveMenu(true)
            const x = e.target.getBoundingClientRect().left + e.target.getBoundingClientRect().width
            const y = e.target.getBoundingClientRect().top - 15
            setPositionMenu({
                id: e.target.getAttribute('data-id'),
                x: x,
                y: y
            })
            e.preventDefault()
        }

        if (e.button === 2) {
            e.target.addEventListener('contextmenu', turnOnMenu)
        }
    }

    return (
        <div className={styles.optionPage}>
            <div className={styles.listPage}>
                {data.data.map((page, index) => {
                    return (
                        <div key={index}
                            onClick={handleClick}
                            data-id={page.id}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseDown={(e) => handleMouseDown(e, page.id)}
                            className={clsx(pageSelectMouseEnter === page.id && styles.isTargetMouseEnterPage, styles.pageOver)}
                        >
                            <input
                                className={clsx(!(pageSelectedRename?.id === page.id) && styles.disableText, styles.page, data.pageSelect === page.id && styles.pageSelect)}
                                data-id={page.id}
                                value={page.name}
                                disabled={!(pageSelectedRename?.id === page.id)}
                                onBlur={handleBlur}
                                onChange={handleOnChange}
                            >
                            </input>
                            {isActiveMenu && <Menu children={listButtonMenu.current} setIsActive={setIsActiveMenu} data={data} position={positionMenu} direction={'right'}></Menu>}
                        </div>
                    )
                })}
                <AddPageBtn data={data} />
            </div>
        </div>
    )
}

export default OptionPage