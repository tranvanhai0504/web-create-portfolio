import React from 'react'
import styles from './Block.module.css'
import clsx from 'clsx'
import { useState, useRef, useEffect, memo } from 'react';
import  styled  from 'styled-components'
import Draggable from 'react-draggable';
import { use } from 'i18next';
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import {useContext} from 'react'

const BlockComp = styled.div.attrs((props) => {

})`
    border-radius: ${props => props.style.borderRadius};
    background-color: ${props => props.style.backgroundColor};
    border: ${props => props.style.border};
    width: ${props => props.style.width};
    height: ${props => props.style.height};
    z-index: ${props => props.style.zIndex};
    transform: rotate(${props => props.style.rotate})
  `

function Block({style, id, position}) {
  const value = useContext(MSWContext)
  const [nowPosion, setNowPositon] = useState(position)

  const PositionHandle = (data)=> {
    console.log(position)
    position.x =  data.x
    position.y =  data.y
    setNowPositon({x: data.x, y: data.y})
  }
  
  function HandleEventItem(e) {
    if(value.itemTarget === id) 
      value.setItemTarget(null)
    else
      value.setItemTarget(id)
    
  }

  console.log('re-render')

  return (
    <Draggable disabled={!(value.itemTarget === id)} defaultPosition={{x: 0, y: 0}} position={{x: nowPosion.x, y: nowPosion.y}} style={{height: 'fit-content'}} onDrag= {(e,data)=> PositionHandle(data)}>
      <div className={clsx(value.itemTarget === id && 'target')} type={id} key={id} onClick={HandleEventItem} style={{height: 'fit-content'}}>
        <BlockComp style={style}/>
      </div>
    </Draggable>
  )
}

export default memo(Block)