import Draggable from 'react-draggable';
import { useContext, useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import styled from 'styled-components'
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'

const TextComp = styled.p.attrs((props) => ({
  disabled: props.disabled,
  onChange: props.onChange,
  ref: props.ref,
  onClick: props.onClick,
}))`
  border: solid 2px rgb(42, 42, 255, 0);
  background-color: rgb(42, 42, 255, 0);
  color: ${props => props.style.color.code};
  font-size: ${props => props.style.fontSize};
  font-weight: ${props => props.style.fontWeight};
  font-family: ${props => props.style.fontFamily};
  width: ${props => props.style.width};
  height: ${props => props.style.height};
  display: ${props => props.style.display};
  flex-direction: column;
  ${props => {
    let string = ''
    if(props.style.textUnderLine) {
      string += 'text-decoration: underline;'
    }
    if(props.style.textItalic) {
      string += 'font-style: italic;'
    }
    return string
  }}
  justify-content: ${props => props.style.justifyContent};
  text-align: ${props=>props.style.textAlign};
  z-index: ${props => props.style.zIndex};
  transform: rotate(${props => props.style.rotate}deg);
  opacity: ${props=>props.style.opacity};
  text-shadow: ${props => { return (props.style.shadow === 'none' || props.style.shadow === 'blurBG') ? props.style.shadow : `${props.style.shadowX}px ${props.style.shadowY}px ${props.style.blur}px ${props.style.shadowColor} ${props.style.shadowInner ? 'inset' : ''}  !important` }};
  overflow: hidden;
  word-wrap: break-word;

  .targetText & {
    border: solid 2px rgb(42, 42, 255)
  }

  &:focus {
    border: solid 2px rgb(42, 42, 255, 0)
  }
`

function Text({ style, id, position, text, dev = false }) {

  const [content, setContent] = useState(text.text)
  const value = useContext(MSWContext)
  const [nowPosition, setNowPosition] = useState(() => {
    if(dev){
      return {
        x: position.x*100/75,
        y: position.y*100/75
      }
    }else return position
  })
  const [nowTarget, setNowTarget] = useState(value?.itemTarget)
  const [styleNow, setStyleNow] = useState(style)
  const [canEditable, setCanEditable] = useState(false)
  const textInput = useRef()

  useEffect(() => {
    textInput.current.innerText = content
  }, [])

  useEffect(() => {
    setStyleNow(() => {
      if(dev){
        return {
          ...style,
          fontSize: style.fontSize * 0.75,
          shadowX: style.shadowX * 0.75,
          shadowY: style.shadowY * 0.75,
          height: style.height * 0.75,
          width: style.width * 0.75
        }
      }else{
        return style
      }
    })
  }, [style, style.color])

  function contentHandle(e) {
    const data = e.target.innerText
    text.text = data
    setContent(data)
  }
  const PositionHandle = (data) => {
    position.x = data.x
    position.y = data.y
    setNowPosition({ x: data.x, y: data.y })
  }

  function draggingStart(e) {
    value?.setIsDragging(true);
  }

  function draggingEnd(e) {
    value?.setIsDragging(false);
    value?.forceUpdate()
  }

  useEffect(() => {
    setNowTarget(value?.itemTarget)
    setCanEditable(false)
  }, [value?.itemTarget])

  useEffect(() => {
    if(canEditable){
      textInput.current.focus()
    }
  }, [canEditable])

  useEffect(() => {
    setNowPosition({ x: position.x, y: position.y })
  }, [position])

  function HandleEventItem(e) {
    if (e.detail === 2) {
      if (nowTarget === value?.itemTarget) {
        setCanEditable(true)
        textInput.current.focus()
      }
    }
    value?.setItemTarget(id)
    setNowTarget(id)
  }

  return (

    <Draggable onStop={draggingEnd} onStart={draggingStart} disabled={!(nowTarget === id) || canEditable} defaultPosition={{ x: 0, y: 0 }} position={{ x: nowPosition.x, y: nowPosition.y }} onDrag={(e, data) => PositionHandle(data)}>
      <div className={clsx(nowTarget === id && 'targetText')} type={id} key={id} onClick={HandleEventItem} style={{ position: 'absolute', height: 'fit-content',  zIndex: style.zIndex }}>
        <TextComp contentEditable={canEditable} disabled={!canEditable} style={styleNow} ref={textInput} onKeyUp={(e) => contentHandle(e)} >{!dev && content}</TextComp>
      </div>
    </Draggable>
  )
}

export default Text