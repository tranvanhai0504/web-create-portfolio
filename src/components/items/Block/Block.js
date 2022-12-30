import clsx from 'clsx'
import { useState, useEffect, memo } from 'react';
import styled from 'styled-components'
import Draggable from 'react-draggable';
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import { useContext } from 'react'

function availableValue(value){
  console.log(value, typeof value)
  if ((typeof value) === 'number') {
    return value + 'px'
  } else {
    return value
  }
}

const BlockComp = styled.div.attrs((props) => {

})`
    border: ${props => { return props.style.border === 'unset' ? props.style.border : `${props.style.borderType} ${props.style.borderSize} ${props.style.borderColor} !important` }};
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
    box-shadow: ${props => { return (props.style.shadow === 'none' || props.style.shadow === 'blurBG') ? props.style.shadow : `${availableValue(props.style.shadowX)} ${availableValue(props.style.shadowY)} ${props.style.blur}px ${props.style.shadowColor} ${props.style.shadowInner ? 'inset' : ''}  !important` }};
    box-sizing: ${props => props.style.boxSizing};
    border-radius: ${props => props.style.borderRadius}%;
    background: ${props => props.style.color.code};
    width: ${props => {
    if ((typeof props.style.width) === 'number') {
      return props.style.width + 'px'
    } else {
      return props.style.width
    }
  }};
    height: ${props => {
    if ((typeof props.style.height) === 'number') {
      return props.style.height + 'px'
    } else {
      return props.style.height
    }
  }};
    transform: rotate(${props => props.style.rotate}deg);
    backdrop-filter: blur(${props => props.style.blur}px);
    opacity: ${props => props.style.opacity}
  `

function Block({ style, id, position, dev = false }) {
  const value = useContext(MSWContext)
  const [styleNow, setStyleNow] = useState(() => {
    const scWidth = 100 / document.documentElement.clientWidth
    const scHeight = 100 / document.documentElement.clientHeight

    if (dev) {
      return {
        ...style,
        height: style.height * 0.75,
        width: style.width * 0.75,
        shadowX: style.shadowX * 0.75,
        shadowY: style.shadowY * 0.75,
        borderRadius: style.borderRadius * 0.75
      }
    } else {
      return {
        ...style,
        height: style.height * scHeight + 'vh',
        width: style.width * scWidth + 'vw',
        shadowX: style.shadowX * scWidth + 'vw',
        shadowY: style.shadowY * scHeight + 'vh',
      }
    }
  })
  const [nowPosition, setNowPosition] = useState(position)
  const [nowTarget, setNowTarget] = useState(value?.itemTarget)
  const [isHover, setIsHover] = useState(false)

  const PositionHandle = (data) => {
    position.x = data.x
    position.y = data.y
    setNowPosition({ x: data.x, y: data.y })
  }

  useEffect(() => {

    setStyleNow(() => {
      if (dev) {
        return {
          ...style,
          height: style.height * 0.75,
          width: style.width * 0.75,
          shadowX: style.shadowX * 0.75,
          shadowY: style.shadowY * 0.75,
          borderRadius: style.borderRadius * 0.75
        }
      } else return style
    })
  }, [style, style.color])

  useEffect(() => {
    setNowTarget(value?.itemTarget)
  }, [value?.itemTarget])

  useEffect(() => {
    setNowPosition({ x: position.x, y: position.y })
  }, [position])

  useEffect(() => {
    if (value?.itemHover === id) {
      setIsHover(true)
    } else {
      setIsHover(false)
    }
  }, [value?.itemHover])

  function draggingStart(e) {
    value?.setIsDragging(true);
  }

  function draggingEnd(e) {
    value?.setIsDragging(false);
    value?.forceUpdate()
  }

  function HandleEventItem(e) {
    if (!value?.listLockedItem.includes(id)) {
      value?.setItemTarget(id)
      setNowTarget(id)
    }
  }

  return (
    <Draggable onStop={draggingEnd} onStart={draggingStart} disabled={!(nowTarget === id)} defaultPosition={{ x: 0, y: 0 }} position={{ x: nowPosition.x, y: nowPosition.y }} onDrag={(e, data) => PositionHandle(data)}>
      <div type={id} key={id} onClick={HandleEventItem} style={{ position: 'absolute', height: 'fit-content', zIndex: style.zIndex }} className={clsx(nowTarget === id && 'target', isHover && 'hover')}>
        <BlockComp style={styleNow}></BlockComp>
      </div>
    </Draggable>
  )
}
export default memo(Block)