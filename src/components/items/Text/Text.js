import React from 'react'
import styles from './Text.module.css'
import Draggable from 'react-draggable';

import clsx from 'clsx'

function Text() {
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  } 
  return (
    <Draggable>
      <div>
        <textarea 
        type={makeid(10)}
        className={clsx(styles.inputText, 'workspaceItem', styles.workspaceItem)} 
        draggable='true'>
      </textarea>
      </div>
    </Draggable>
  )
}

export default Text