import React from 'react'
import styles from './ImgBox.module.css'
import clsx from 'clsx'

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
  return (
    <div 
      type={makeid(10 )}
      draggable='true' 
      className={clsx(styles.imgBlock, 'workspaceItem', styles.workspaceItem)}></div>
  )
}

export default ImgBox