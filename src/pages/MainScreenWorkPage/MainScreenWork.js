import { useState, useContext, useEffect } from 'react'
import HeaderMainWork from "../../components/HeaderMainWork/HeaderMainWork"
import SpaceMainWork from '../../components/spaceMainWork/SpaceMainWork'
import SideBar from '../../components/sideBar/SideBar'
import styles from './MainScreenWork.module.css'
import { MSWProvider } from './MainScreenWorkProvider/MSWProvider'
import { GlobalContext } from '../../globalState/GlobalState'

function MainScreenWork() {
    const value = useContext(GlobalContext)
    const [produce, setProduce] = useState(() => {

        let idProduceSelect = value.produceSelect
        if (idProduceSelect === undefined) {
            idProduceSelect = value.produces[0].id
            value.setProduceSelect(idProduceSelect)
        }

        return value.produces.filter(produce => {
            return produce.id === idProduceSelect
        })[0]
    })

    useEffect(() => {
        value.setProduces(prev => {
            return prev.map(produceTemp => {
                if (produceTemp.id === value.produceSelect) {
                    return produce
                } else {
                    return produceTemp
                }
            })
        })
    }, [produce, value.ignored])

    return (
        <div>
            <HeaderMainWork />
            <div className={styles.mainSpace}>
                <MSWProvider>
                    <SideBar />
                    <SpaceMainWork setProduce={setProduce} listPage={produce.listPage} />
                </MSWProvider>
            </div>
        </div>
    )
}

export default MainScreenWork