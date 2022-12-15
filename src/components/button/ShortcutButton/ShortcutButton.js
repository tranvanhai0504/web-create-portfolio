import {TbZoomQuestion} from 'react-icons/tb'
import { IconContext } from "react-icons";
import StringTooltip from '../../tooltip/StringTooltip/StringTooltip';
import Styles from './ShortcutButton.module.css'
import { GlobalContext } from '../../../globalState/GlobalState';
import clsx from 'clsx';
import { useContext } from 'react';
function ShortcutButton() {
  const value=useContext(GlobalContext)
  const handleClick=()=>{
    value.setOpen(true)
  }
    return (
           <IconContext.Provider value={{ className: Styles.shortcutButton_i}}>
            <div className={Styles.container} onClick={handleClick}>
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