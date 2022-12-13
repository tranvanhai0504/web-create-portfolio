import { useEffect, useState, useRef } from 'react'
import AddPageBtn from '../../button/addMorePage/AddPageBtn'
import styles from './OptionPage.module.css'
import clsx from 'clsx'

function OptionPage({ data }) {

    const [pageSelectedRename, setPageSelectedRename] = useState()
    const [pageSelectMouseEnter, setPageSelectMouseEnter] = useState()

    function handleClick(e) {

        switch (e.detail) {
            case 1:{
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
                            return d.name === e.target.getAttribute('data-id')
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
        if(!(pageSelectedRename?.name === e.target.getAttribute('data-id')))
            setPageSelectMouseEnter(e.target.getAttribute('data-id'))
    }

    function handleMouseLeave(e) {
        setPageSelectMouseEnter(null)
    }

    function handleOnChange(e){
        data.data.map(d => {
            if(d.name === e.target.getAttribute('data-id')){
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

    return (
        <div className={styles.optionPage}>
            <div className={styles.listPage}>
                {data.data.map((page, index) => {
                    return (
                        <div key={index}
                            onClick={handleClick}
                            data-id={page.name}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className={clsx(pageSelectMouseEnter === page.name && styles.isTargetMouseEnterPage, styles.pageOver)}
                        >
                            <input
                                className={clsx(!(pageSelectedRename?.name === page.name) && styles.disableText, styles.page, data.pageSelect === page.name && styles.pageSelect)}
                                data-id={page.name}
                                value={page.name}
                                disabled={!(pageSelectedRename?.name === page.name)}
                                onBlur={(e) => {setPageSelectedRename(null)}}
                                onChange={handleOnChange}
                            >
                            </input>
                        </div>
                    )
                })}
            </div>
            <AddPageBtn data={data}/>
        </div>
    )
}

export default OptionPage