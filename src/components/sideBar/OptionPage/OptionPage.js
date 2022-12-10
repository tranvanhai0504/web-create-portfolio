import { useEffect, useState } from 'react'
import AddPageBtn from '../../button/addMorePage/AddPageBtn'
import styles from './OptionPage.module.css'
import clsx from 'clsx'

function OptionPage({ data }) {

    const [pageSelected, setPageSelected] = useState()

    function handleClick(e) {
        
        switch (e.detail) {
            case 2: {
                if (e.target.getAttribute('data-id') === pageSelected) {
                    setPageSelected(null)
                } else {
                    setPageSelected(e.target.getAttribute('data-id'))
                }
                break
            }
            default: { }
        }
    }

    return (
        <div className={styles.optionPage}>
            <div className={styles.listPage}>
                {data.data.map((page, index) => {
                    return (
                        <div key={index} onClick={handleClick}>
                            <input
                                className={clsx(! (pageSelected === page.name) && styles.disableText, styles.page)}
                                data-id={page.name}
                                value={page.name}
                                disabled={pageSelected === page.name}
                            >
                            </input>
                        </div>
                    )
                })}
            </div>
            <AddPageBtn/>
        </div>
    )
}

export default OptionPage