import React from 'react'
import styles from './Block.module.css'
import clsx from 'clsx'
import { useState, useRef, useEffect, memo } from 'react';
import styled from 'styled-components'
import Draggable from 'react-draggable';
import { use } from 'i18next';
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import { useContext } from 'react'

const BlockComp = styled.div.attrs((props) => { return {
  className: props.className
}})`
    position: absolute;
    border-radius: ${props => props.style.borderRadius}%;
    background-color: ${props => props.style.backgroundColor};
    border: ${props => props.style.border};
    width: ${props => props.style.width}%;
    height: ${props => props.style.height}%;
    z-index: ${props => props.style.zIndex};
    transform: rotate(${props => props.style.rotate})
  `

function Block({ style, id, position }) {
  const value = useContext(MSWContext)
  const [nowPosion, setNowPositon] = useState(position)
  const [nowTarget, setNowTarget] = useState(value.itemTarget)

  const PositionHandle = (data) => {
    position.x = data.x
    position.y = data.y
    setNowPositon({ x: data.x, y: data.y })
  }

  useEffect(() => {
    setNowTarget(value.itemTarget)

  }, [value.itemTarget])

  useEffect(() => {
    console.log(id, 'position change')
    console.log(position)
    setNowPositon({ x: position.x, y: position.y })
  }, [value.data])

  function draggingStart(e){
    value.setIsDragging(true);
  }

  function draggingEnd(e){
    value.setIsDragging(false);
  }

  function HandleEventItem(e) {
    value.setItemTarget(id)
    setNowTarget(id)
  }

  return (
    <Draggable onStop={draggingEnd} onStart={draggingStart} disabled={!(nowTarget === id)} defaultPosition={{ x: 0, y: 0 }} position={{ x: nowPosion.x, y: nowPosion.y }} onDrag={(e, data) => PositionHandle(data)}>
      <div  type={id} key={id} onClick={HandleEventItem} style={{ positon: 'absolute', height: 'fit-content' }}>
        <BlockComp className={clsx(nowTarget === id && 'target')} style={style}>{id}</BlockComp>
      </div>
    </Draggable>
  )
}

export default memo(Block)