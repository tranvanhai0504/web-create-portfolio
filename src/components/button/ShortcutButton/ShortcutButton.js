import {TbZoomQuestion} from 'react-icons/tb'
import { IconContext } from "react-icons";
import StringTooltip from '../../tooltip/StringTooltip/StringTooltip';
import Styles from './ShortcutButton.module.css'
import clsx from 'clsx';
function ShortcutButton() {
    return (
           <IconContext.Provider value={{ className: Styles.shortcutButton_i}}>
            <div className={Styles.container}>
                <StringTooltip content={'show shortcut'} position='bottom' >
                 <div className={Styles.shortcutButton}>
                   <TbZoomQuestion />
                 </div>
                </StringTooltip>
            </div>
           </IconContext.Provider>
    )
}

export default ShortcutButton