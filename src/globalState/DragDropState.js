import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const DragDropContext = createContext()

function DragDropState() {
    const [taget, setTaget] = useState(false)
    return (<GlobalContext.Provider
        value={value}
>
    {children}
</GlobalContext.Provider>)
}