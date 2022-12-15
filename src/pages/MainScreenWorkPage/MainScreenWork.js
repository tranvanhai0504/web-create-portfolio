import { useState } from 'react'
import HeaderMainWork from "../../components/HeaderMainWork/HeaderMainWork"
import SpaceMainWork from '../../components/spaceMainWork/SpaceMainWork'
import SideBar from '../../components/sideBar/SideBar'
import styles from './MainScreenWork.module.css'
import { MSWProvider } from './MainScreenWorkProvider/MSWProvider'
import ScrollDialog from '../../components/Dialog/Dialog'

function MainScreenWork() {

    return (
        <div>
            <HeaderMainWork />
            <div className={styles.mainSpace}>
                <MSWProvider>
                    <ScrollDialog/>
                    <SideBar />
                    <SpaceMainWork />
                </MSWProvider>
            </div>
        </div>
    )
}

export default MainScreenWork