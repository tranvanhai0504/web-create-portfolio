import { MdReplay } from "react-icons/md";
import style from './TurnBackBtn.module.css'
import StringTooltip from "../../tooltip/StringTooltip/StringTooltip";

function TurnBackBtn({onClick}) {

    return (
        <div onClick={onClick} className={style.turnBackBtn}>
            <StringTooltip style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} position="left" content={'Turn back'}>
                <MdReplay />
            </StringTooltip>
        </div>
    )
}

export default TurnBackBtn