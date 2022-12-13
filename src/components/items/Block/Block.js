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
    transform: rotate(${props => props.style.rotate});
    resize: ${props=>props.style.resize};
    overflow: ${props=>props.style.overflow};
    position: 'relative'; 
  `

function Block({style, id, position}) {
  const value = useContext(MSWContext)
  const [nowPosion, setNowPositon] = useState(position)
  const [nowTarget, setNowTarget] = useState(value.itemTarget.current)
  

  const PositionHandle = (data)=> {
    position.x =  data.x
    position.y =  data.y
    setNowPositon({x: data.x, y: data.y})
  }
  
  function HandleEventItem(e) {
    if(value.itemTarget.current === id) {
      value.itemTarget.current = null
      setNowTarget(null)
    }else{
      value.itemTarget.current = id
      setNowTarget(id)
    }
  }



  return (
    <Draggable disabled={!(nowTarget === id)} defaultPosition={{x: 0, y: 0}} position={{x: nowPosion.x, y: nowPosion.y}} style={{height: 'fit-content'}} onDrag= {(e,data)=> PositionHandle(data)}>
      <div className={clsx(nowTarget === id && 'target')} type={id} key={id} onClick={HandleEventItem} style={{height: 'fit-content'}}>
        <BlockComp style={style}/>
      </div>
    </Draggable>
  )
}
export default memo(Block)