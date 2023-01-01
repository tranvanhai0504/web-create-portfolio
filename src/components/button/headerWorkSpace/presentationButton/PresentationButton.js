import { FiAirplay } from "react-icons/fi";
import style from './PresentationButton.module.css'
import StringTooltip from "../../../tooltip/StringTooltip/StringTooltip";
import { useContext } from 'react'
import { MSWContext } from "../../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider";

function PresentationButton({setIsPreview}) {
    const value = useContext(MSWContext)

    function handleClick(e){
        value.setItemTarget(null)
        setIsPreview(true)
    }

    return (
        <div className={style.containerPButton}>
            <StringTooltip style={{alignItem: 'center', display: 'flex', borderRadius: '4px', cursor: 'pointer'}} position="bottom" content={'Presentation'}>
                <FiAirplay onClick={handleClick} className={style.button}/>
            </StringTooltip>
        </div>
    )
}

export default PresentationButton