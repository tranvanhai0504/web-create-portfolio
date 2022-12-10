import Styles from './Trashcan.module.css'
import { IconContext } from "react-icons";
import {BsTrash} from 'react-icons/bs'
function Trashcan() {
    return (
        <IconContext.Provider value={{ className: Styles.Trash_icon}}>
            <div className={Styles.Trashcan}>
                <BsTrash/>
            </div>
        </IconContext.Provider>
    )
}
export default Trashcan