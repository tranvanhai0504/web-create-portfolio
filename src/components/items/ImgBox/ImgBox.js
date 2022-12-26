import React from 'react'
import clsx from 'clsx'
import Draggable from 'react-draggable';
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'

const ImgComp = styled.div.attrs(props => {

})`
  border: ${props => { return props.style.border === 'unset' ? props.style.border : `${props.style.borderType} ${props.style.borderSize}px ${props.style.borderColor} !important` }};
  ${props => {
    let string = ''
    if (props.style.unBorderLeft) {
      string += 'border-left: unset !important;'
    }
    if (props.style.unBorderRight) {
      string += 'border-right: unset !important;'
    }
    if (props.style.unBorderTop) {
      string += 'border-top: unset !important;'
    }
    if (props.style.unBorderBottom) {
      string += 'border-bottom: unset !important;'
    }
    return string
  }}
  box-sizing: ${props => props.style.boxSizing};
  box-shadow: ${props => { return (props.style.shadow === 'none' || props.style.shadow === 'blurBG') ? props.style.shadow : `${props.style.shadowX}px ${props.style.shadowY}px ${props.style.blur}px ${props.style.shadowColor} ${props.style.shadowInner ? 'inset' : ''}  !important` }};
  width: ${props => props.style.width};
  height: ${props => props.style.height};
  border-radius: ${props => props.style.borderRadius};
  border: ${props => props.style.border};
  background-position: ${props => props.style.backgroundPosition};
  background-size: ${props => props.style.backgroundSize};
  transform: ${props => props.style.transform};
  background-image: url(${props => props.src});
  transform: rotate(${props => props.style.rotate}deg);
  opacity: ${props => props.style.opacity}
`
function ImgBox({ style, id, position, src }) {
  const value = useContext(MSWContext)
  const [nowTarget, setNowTarget] = useState(value.itemTarget)
  const [nowPosition, setNowPosition] = useState(position)

  const PositionHandle = (data) => {
    position.x = data.x
    position.y = data.y
    setNowPosition({ x: data.x, y: data.y })
  }

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

  useEffect(() => {
    setNowTarget(value.itemTarget)
  }, [value.itemTarget])

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

  return (<Draggable onStop={draggingEnd} onStart={draggingStart} disabled={!(nowTarget === id)} defaultPosition={{ x: 0, y: 0 }} position={{ x: nowPosition.x, y: nowPosition.y }} onDrag={(e, data) => PositionHandle(data)}>
    <div className={clsx(nowTarget === id && 'target')} type={id} key={id} onClick={HandleEventItem} style={{ position: 'absolute', zIndex: style.zIndex, height: 'fit-content' }}>
      <ImgComp style={style} src={src} />
    </div>
  </Draggable>
  )
}

export default ImgBox