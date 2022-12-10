import { createContext, useState,useRef } from 'react';

const MSWContext = createContext()

function MSWProvider({children}){
    const [data, setData] = useState([])
    const [itemTarget, setItemTarget] = useState()
    const [pageSelect, setPageSelect] = useState()
    const [isDragging, setIsDragging] = useState(false)
    const image = useRef(null)

    const value = {
        data,
        setData,
        itemTarget,
        setItemTarget,
        pageSelect,
        setPageSelect,
        isDragging,
        setIsDragging,
        image

    }

    return (
        <MSWContext.Provider value={value}>
            {children}
        </MSWContext.Provider>
    )
}

export {MSWProvider, MSWContext}