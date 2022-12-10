import { createContext, useState, useRef } from 'react';

const MSWContext = createContext()

function MSWProvider({children}){
    const [data, setData] = useState([])
    const itemTarget = useRef()
    const [pageSelect, setPageSelect] = useState()
    const [isDragging, setIsDragging] = useState(false)
    const [img, setImg] = useState(null)
    const image = useRef()

    const value = {
        data,
        setData,
        itemTarget,
        pageSelect,
        setPageSelect,
        isDragging,
        setIsDragging,
        image,
        img,
        setImg

    }

    return (
        <MSWContext.Provider value={value}>
            {children}
        </MSWContext.Provider>
    )
}

export {MSWProvider, MSWContext}