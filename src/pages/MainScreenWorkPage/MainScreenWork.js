import { useState, useContext, useEffect } from 'react'
import HeaderMainWork from "../../components/HeaderMainWork/HeaderMainWork"
import SpaceMainWork from '../../components/spaceMainWork/SpaceMainWork'
import SideBar from '../../components/sideBar/SideBar'
import TurnBackBtn from '../../components/button/buttonTurnBack/TurnBackBtn'
import styles from './MainScreenWork.module.css'
import { MSWProvider } from './MainScreenWorkProvider/MSWProvider'
import { GlobalContext } from '../../globalState/GlobalState'
import Modal from '../../components/modal/Modal'

function MainScreenWork() {
    const value = useContext(GlobalContext)
    const [modalOn, setModalOn] = useState(false)
    const [isPreview, setIsPreview] = useState(false)
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
        <div className={styles.mainSpaceWorkContainer}>
            <MSWProvider>
                {!isPreview && <HeaderMainWork setIsPreview={setIsPreview}/>}
                <div className={styles.mainSpace}>
                    {!isPreview && <SideBar setModalOn={setModalOn}/>}
                    <SpaceMainWork isPreview={isPreview} setProduce={setProduce} listPage={produce.listPage} />
                </div>
            </MSWProvider>
            {isPreview && <TurnBackBtn onClick={() => {setIsPreview(false)}}/>}
            {modalOn && <Modal message={'This item cannot be destroyed because it contains buttons that can take you to another page. If you don\'t want to display them, you can set opacity to 0, or change the alpha index to 0 in the fill color.'} handleClick={() => {setModalOn(false)}}></Modal>}
        </div>
    )
}

export default MainScreenWork