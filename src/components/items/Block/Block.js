import React from 'react'
import styles from './Block.module.css'
import clsx from 'clsx'
import { useState, useRef } from 'react';
import  styled  from 'styled-components'
import Draggable from 'react-draggable';

function Block({style}) {
  const [position, setPosition] = useState({y: 0, x: 0})
  // const BlockComp = styled.div`
  //   border-radius: ${style.borderRadius};
  //   background-color: ${style.backgroundColor};
  //   border: ${style.border};
  //   width: ${style.width};
  //   height: ${style.height};
  //   z-index: ${style.zIndex};
  //   transform: rotate(${style.rotate})
  // `

  const PositionHandle = (data)=> {
    setPosition({x: data.x, y: data.y})
  }
  

  return (
    <Draggable onDrag= {(e,data)=> PositionHandle(data)} style={{'position': 'absolute', 'top':position.y, 'left': position.x}}>
      <div>
        {/* <BlockComp/> */}
      </div>
    </Draggable>
  )
}

export default Block