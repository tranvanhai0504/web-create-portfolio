import React from 'react'
import clsx from 'clsx'
import { useState, useEffect, memo } from 'react';
import styled from 'styled-components'
import Draggable from 'react-draggable';
import { use } from 'i18next';
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import { useContext } from 'react'

const BlockComp = styled.div.attrs((props) => {

})`

    border-radius: ${props => props.style.borderRadius}%;
    background-color: ${props => props.style.backgroundColor};
    border: ${props => props.style.border};
    width: ${props => props.style.width}px;
    height: ${props => props.style.height}px;
    transform: rotate(${props => props.style.rotate}deg);
    opacity: ${props => props.style.opacity}
  `

function Block({ style, id, position }) {
  const value = useContext(MSWContext)
  const [nowPosition, setNowPosition] = useState(position)
  const [nowTarget, setNowTarget] = useState(value.itemTarget)

  const PositionHandle = (data) => {
    position.x = data.x
    position.y = data.y
    setNowPosition({ x: data.x, y: data.y })
  }

  useEffect(() => {
    setNowTarget(value.itemTarget)
  }, [value.itemTarget])

  useEffect(() => {
    setNowPosition({ x: position.x, y: position.y })
  }, [position])

  function draggingStart(e) {
    value.setIsDragging(true);
  }

  function draggingEnd(e) {
    value.setIsDragging(false);
    value.forceUpdate()
  }

  function HandleEventItem(e) {
    const workSpaceWidth = e.target.parentElement.parentElement.clientWidth
    const workSpaceHeight = e.target.parentElement.parentElement.clientHeight
    const itemWidth = e.target.clientWidth
    const itemHeight = e.target.clientHeight
    style.width = itemWidth
    style.height = itemHeight
    value.setItemTarget(id)
    setNowTarget(id)
  }

  return (
    <Draggable onStop={draggingEnd} onStart={draggingStart} disabled={!(nowTarget === id)} defaultPosition={{ x: 0, y: 0 }} position={{ x: nowPosition.x, y: nowPosition.y }} onDrag={(e, data) => PositionHandle(data)}>
      <div type={id} key={id} onClick={HandleEventItem} style={{position: 'absolute', height: 'fit-content', zIndex: style.zIndex}} className={clsx(nowTarget === id && 'target')}>
        <BlockComp style={style}></BlockComp>
      </div>
    </Draggable>
  )
}
export default memo(Block)