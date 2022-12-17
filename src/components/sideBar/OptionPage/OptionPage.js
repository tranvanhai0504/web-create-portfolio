import { useState, useRef, useEffect } from 'react'
import AddPageBtn from '../../button/addMorePage/AddPageBtn'
import styles from './OptionPage.module.css'
import makeid from '../../../utils/makeid'
import { FiMoreVertical } from "react-icons/fi";
import Menu from '../../menuCustom/Menu'
import clsx from 'clsx'

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
                            listItem: copyData.listItem
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
        console.log(e.target)
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