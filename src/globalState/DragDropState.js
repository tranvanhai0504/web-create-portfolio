import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../../globalState/GlobalState'

const DragDropContext = createContext()


function DragDropState(children) {
    const value = useContext(GlobalContext)
    const [listUsingElement, setListUsingElement] = useState([])
    const [taget, setTaget] = useState(false)

    function  handleAddElement(e) {
        setListUsingElement(prev=> [...prev, e])
    }
}

export { DragDropContext }