import { useState } from 'react'
import HeaderMainWork from "../../components/HeaderMainWork/HeaderMainWork"
import SpaceMainWork from '../../components/spaceMainWork/SpaceMainWork'
import SideBar from '../../components/sideBar/SideBar'
import styles from './MainScreenWork.module.css'
import { MSWProvider } from './MainScreenWorkProvider/MSWProvider'

function MainScreenWork() {

    return (
        <div>
            <HeaderMainWork />
            <div className={styles.mainSpace}>
                <MSWProvider>
                    <SideBar />
                    <SpaceMainWork />
                </MSWProvider>
            </div>
        </div>
    )
}

export default MainScreenWork