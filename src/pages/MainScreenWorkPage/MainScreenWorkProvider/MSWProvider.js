import { createContext, useState, useRef, useContext, useEffect } from 'react';
import { GlobalContext } from '../../../globalState/GlobalState';

const MSWContext = createContext()

function MSWProvider({children}){
    const Globalvalue = useContext(GlobalContext)
    const [data, setData] = useState([])
    const [itemTarget, setItemTarget] = useState()
    const [pageSelect, setPageSelect] = useState()
    const [isDragging, setIsDragging] = useState(false)
    const [showResetBtn, setShowResetBtn] = useState(false)
    const [img, setImg] = useState(null)
    const [isCancelDelete, setIsCancelDelete] = useState()
    const image = useRef()

    const value = {
        data,
        setData,
        itemTarget,
        setItemTarget,
        pageSelect,
        setPageSelect,
        isDragging,
        setIsDragging,
        image,
        img,
        setImg,
        showResetBtn,
        setShowResetBtn,
        forceUpdate: Globalvalue.forceUpdate,
        isCancelDelete,
        setIsCancelDelete
    }

    return (
        <MSWContext.Provider value={value}>
            {children}
        </MSWContext.Provider>
    )
}

export {MSWProvider, MSWContext}