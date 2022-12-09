import React from 'react'
import styles from './ImgBox.module.css'
import clsx from 'clsx'
import Draggable from 'react-draggable';

function ImgBox() {
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  } 
  return (<Draggable>
    <div>
      <div 
        type={makeid(10 )}
        draggable='true' 
        className={clsx(styles.imgBlock, 'workspaceItem', styles.workspaceItem)}></div>
      </div>
  </Draggable>
    
  )
}

export default ImgBox