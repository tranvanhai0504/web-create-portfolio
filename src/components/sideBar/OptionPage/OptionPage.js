import { useEffect, useState, useRef } from 'react'
import AddPageBtn from '../../button/addMorePage/AddPageBtn'
import styles from './OptionPage.module.css'
import ElementTooltip from '../../tooltip/elementTooltip/ElementTooltip'
import { FiMoreVertical } from "react-icons/fi";
import clsx from 'clsx'

function OptionPage({ data }) {

    const [pageSelectedRename, setPageSelectedRename] = useState()
    const [pageSelectMouseEnter, setPageSelectMouseEnter] = useState()
    const [optionMoreSelect, setOptionMoreSelect] = useState()

    function handleClick(e) {

        switch (e.detail) {
            case 1: {
                data.setPageSelect(e.target.getAttribute('data-id'))
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

    function handleMouseDown(e, id) {

        function turnOnMenu(e) {
            setOptionMoreSelect(id)
            e.preventDefault()
        }

        if (e.button === 2) {
            e.target.addEventListener('contextmenu', turnOnMenu)
            // window.removeEventListener('contextmenu', turnOnMenu)
        }
    }

    return (
        <div className={styles.optionPage}>
            <div className={styles.listPage}>
                {data.data.map((page, index) => {
                    return (
                        <ElementTooltip isActive={data.pageSelect === page.id && optionMoreSelect === page.id} position={"right"} element={<p>hi</p>}>
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
                            </div>
                        </ElementTooltip>
                    )
                })}
            </div>
            <AddPageBtn data={data} />
        </div>
    )
}

export default OptionPage