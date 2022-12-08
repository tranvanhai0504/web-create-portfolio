import React from 'react'
import styles from './Block.module.css'
import clsx from 'clsx'
import { useState, useRef } from 'react';
import Draggable from 'react-draggable';

function Block(props) {
  const type = useRef(makeid(10))
  const localPos = (localStorage.getItem(type))??{}
  const [position, setPosition] = useState(localPos)
  console.log('pos: ', localPos)
  console.log(type.current)
  const PositionHandle = (data)=> {
    console.log('data', data)
    localStorage.setItem(type.current, JSON.stringify(localPos))
    console.log(position)
    setPosition({x: data.x, y: data.y})
  }
  
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
    <Draggable onDrag= {(e,data)=> PositionHandle(data)} style={{'position': 'absolute', 'top':position.y, 'left': position.x}}>
      <div>
        <div
          type={type}
          className={clsx('workspaceItem', styles.blockItem, styles.workspaceItem)}>
        </div>
      </div>
    </Draggable>
    

    
  )
}

export default Block