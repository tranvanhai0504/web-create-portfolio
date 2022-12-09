import React from 'react'
import styles from './Block.module.css'
import clsx from 'clsx'
import { useState, useRef, useEffect, memo } from 'react';
import  styled  from 'styled-components'
import Draggable from 'react-draggable';
import { use } from 'i18next';
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import {useContext} from 'react'

function Block({style, id, position}) {
  const value = useContext(MSWContext)
  const [nowPosion, setNowPositon] = useState(position)
  console.log('id: ',id)
  const BlockComp = styled.div`
    border-radius: ${style.borderRadius};
    background-color: ${style.backgroundColor};
    border: ${style.border};
    width: ${style.width};
    height: ${style.height};
    z-index: ${style.zIndex};
    transform: rotate(${style.rotate})
  `
  console.log(
    position
  )

  const PositionHandle = (data)=> {
    console.log(position)
    position.x =  data.x
    position.y =  data.y
    setNowPositon({x: data.x, y: data.y})
  }
  
  function HandleEventItem(e) {
    console.log(id+ "=========" + value.itemTarget)
    if(value.itemTarget === id) {
      // e.target.classList.remove('target')
      // console.log('remove target',  e.target)
      value.setItemTarget(null)
    }else{
      // e.target.classList.add('target') 
      value.setItemTarget(id)
      // console.log('add target', e.target)
    }
  }

  console.log('re-render')

  return (
    <Draggable disabled={!(value.itemTarget === id)} defaultPosition={{x: 0, y: 0}} position={{x: nowPosion.x, y: nowPosion.y}} style={{height: 'fit-content'}} onDrag= {(e,data)=> PositionHandle(data)}>
      <div className={clsx(value.itemTarget === id && 'target')} type={id} key={id} onClick={HandleEventItem} style={{height: 'fit-content'}}>
        <BlockComp/>
      </div>
    </Draggable>
  )
}

export default memo(Block)