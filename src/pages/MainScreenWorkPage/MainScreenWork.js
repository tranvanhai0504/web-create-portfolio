import HeaderMainWork from "../../components/HeaderMainWork/HeaderMainWork"
import SpaceMainWork from '../../components/spaceMainWork/SpaceMainWork'
import SideBar from '../../components/sideBar/SideBar'
import styles from './MainScreenWork.module.css'

function MainScreenWork() {
    return (
        <div>
            <HeaderMainWork />
            <div className={styles.mainSpace}>
                <SideBar />
                <SpaceMainWork />
            </div>
        </div>
    )
}

export default MainScreenWork