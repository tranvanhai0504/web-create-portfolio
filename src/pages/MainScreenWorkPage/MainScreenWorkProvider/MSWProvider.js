import { createContext, useState } from 'react';

const MSWContext = createContext()

function MSWProvider({children}){
    const [data, setData] = useState([])

    const value = {
        data,
        setData
    }

    return (
        <MSWContext.Provider value={value}>
            {children}
        </MSWContext.Provider>
    )
}

export {MSWProvider, MSWContext}