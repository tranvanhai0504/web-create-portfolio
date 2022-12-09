import { createContext, useState } from 'react';

const MSWContext = createContext()

function MSWProvider({children}){
    const [data, setData] = useState([])
    const [itemTarget, setItemTarget] = useState()
    const [pageSelect, setPageSelect] = useState()
    const [isDragging, setIsDragging] = useState(false)

    const value = {
        data,
        setData,
        itemTarget,
        setItemTarget,
        pageSelect,
        setPageSelect,
        isDragging,
        setIsDragging
    }

    return (
        <MSWContext.Provider value={value}>
            {children}
        </MSWContext.Provider>
    )
}

export {MSWProvider, MSWContext}