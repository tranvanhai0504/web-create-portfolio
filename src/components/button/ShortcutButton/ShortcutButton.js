import {TbZoomQuestion} from 'react-icons/tb'
import { IconContext } from "react-icons";
import StringTooltip from '../../tooltip/StringTooltip/StringTooltip';
import Dialogtooltip from '../../Dialog/Dialogtooltip';
import Styles from './ShortcutButton.module.css'
import { GlobalContext } from '../../../globalState/GlobalState';
import clsx from 'clsx';
import { useContext } from 'react';
function ShortcutButton() {
  const value=useContext(GlobalContext)
  const handleClick=()=>{
    value.setOpen(true)
  }
  function ShortcutDialog(){
    return (
    <div 
      className={Styles.dialog}>
      {
        shortcuts.map
        (
          (shortcut) => 
          {
            return <p>{shortcut.keyword + ':\t' + shortcut.describe}</p>
          }
        )
      }
    </div>)
  }
  const shortcuts=[
    {
        keyword:"CTRL+Z",
        describe:"Undo an action that you just made"
    },
    {
        keyword:"CTRL+J",
        describe:"Redo an action that you just made"
    },
    {
        keyword:"CTRL+Z",
        describe:"Undo an action that you just made"
    },
    {
        keyword:"CTRL+J",
        describe:"Redo an action that you just made"
    },
    {
      keyword:"CTRL+J",
      describe:"Redo an action that you just made"
    },
    {
      keyword:"CTRL+J",
      describe:"Redo an action that you just made"
    },
    {
      keyword:"CTRL+Z",
      describe:"Undo an action that you just made"
    },
    {
        keyword:"CTRL+J",
        describe:"Redo an action that you just made"
    },
    {
        keyword:"CTRL+Z",
        describe:"Undo an action that you just made"
    },
    {
        keyword:"CTRL+J",
        describe:"Redo an action that you just made"
    },
    {
      keyword:"CTRL+J",
      describe:"Redo an action that you just made"
    },
    {
      keyword:"CTRL+J",
      describe:"Redo an action that you just made"
    },

  ]
    return (
           <IconContext.Provider value={{ className: Styles.shortcutButton_i}}>
            <div className={Styles.container}>
                <Dialogtooltip content={ShortcutDialog()} position='bottom' >
                 <div className={Styles.shortcutButton}>
                   <TbZoomQuestion />
                 </div>
                </Dialogtooltip>
            </div>
           </IconContext.Provider>
    )
}

export default ShortcutButton