import Styles from './Trashcan.module.css'
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import { useContext } from 'react'
import { IconContext } from "react-icons";
import {BsTrash} from 'react-icons/bs'
function Trashcan({setIsEnterTrash}) {

    const value = useContext(MSWContext)
    console.log(value)

    function handleMouseUp(e){
        const targetId = value.itemTarget
        const targetPage = value.pageSelect

        const newData = value.data.map(page => {
            if(targetPage === page.name){
                return {
                    ...page,
                    listItem: page.listItem.filter(item => {
                        return item.id !== targetId
                    }),
                }
            }
            return page
        })

        value.setData(newData)
        console.log('trash end')

        value.setItemTarget(null)
        value.setIsDragging(false)
    }

    return (
        <IconContext.Provider value={{ className: Styles.Trash_icon}}>
            <div className={Styles.Trashcan} onMouseEnter={(e) => {setIsEnterTrash(true)}} onMouseLeave={(e) => {setIsEnterTrash(false)}} onMouseUp={handleMouseUp}>
                <BsTrash/>
            </div>
        </IconContext.Provider>
    )
}
export default Trashcan