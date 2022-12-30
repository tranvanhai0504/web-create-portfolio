import React from 'react'
import clsx from 'clsx'
import Draggable from 'react-draggable';
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'

function availableValue(value) {
  console.log(value, typeof value)
  if ((typeof value) === 'number') {
    return value + 'px'
  } else {
    return value
  }
}

const ImgComp = styled.img.attrs(props => {
  return {
    src: props.src
  }
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
  box-shadow: ${props => { return (props.style.shadow === 'none' || props.style.shadow === 'blurBG') ? props.style.shadow : `${availableValue(props.style.shadowX)} ${availableValue(props.style.shadowY)} ${props.style.blur}px ${props.style.shadowColor} ${props.style.shadowInner ? 'inset' : ''}  !important` }};
  width: ${props => availableValue(props.style.width)};
  height: ${props => availableValue(props.style.height)};
  border-radius: ${props => props.style.borderRadius};
  border: ${props => props.style.border};
  object-fit: cover;
  transform: ${props => props.style.transform};
  transform: rotate(${props => props.style.rotate}deg);
  opacity: ${props => props.style.opacity}
`
function ImgBox({ style, id, position, src, dev = false }) {
  const value = useContext(MSWContext)
  const [nowTarget, setNowTarget] = useState(value?.itemTarget)
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
  const [nowPosition, setNowPosition] = useState(() => {
    if (dev) {
      return {
        x: position.x * 100 / 75,
        y: position.y * 100 / 75,
      }
    } else return position
  })
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
          borderRadius: style.borderRadius * 0.75,
          shadowX: style.shadowX * 0.75,
          shadowY: style.shadowY * 0.75,
        }
      } else {
        return style
      }
    })
  }, [style])

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

  useEffect(() => {
    setNowTarget(value?.itemTarget)
  }, [value?.itemTarget])

  function HandleEventItem(e) {
    if (!value?.listLockedItem.includes(id)) {
      value?.setItemTarget(id)
      setNowTarget(id)
    }
  }

  return (<Draggable onStop={draggingEnd} onStart={draggingStart} disabled={!(nowTarget === id)} defaultPosition={{ x: 0, y: 0 }} position={{ x: nowPosition.x, y: nowPosition.y }} onDrag={(e, data) => PositionHandle(data)}>
    <div className={clsx(nowTarget === id && 'target', isHover && 'hover')} type={id} key={id} onClick={HandleEventItem} style={{ position: 'absolute', zIndex: style.zIndex, height: 'fit-content' }}>
      <ImgComp style={styleNow} src={src} />
    </div>
  </Draggable>
  )
}

export default ImgBox