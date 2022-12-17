import Draggable from 'react-draggable';
import { useContext, useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import styled from 'styled-components'
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'

const TextComp = styled.input.attrs((props) => ({
  disabled: props.disabled,
  onChange: props.onChange,
  ref: props.ref,
  onClick: props.onClick,
}))`
  border: solid 2px rgb(42, 42, 255, 0);
  background-color: rgb(42, 42, 255, 0);
  color: ${props => props.style.color};
  font-size: ${props => props.style.fontSize};
  font-weight: ${props => props.style.fontWeight};
  display: ${props => props.style.display};
  width: ${props => props.style.width};
  height: ${props => props.style.height};
  z-index: ${props => props.style.zIndex};
  transform: rotate(${props => props.style.rotate}deg);
  opacity: ${props=>props.style.opacity};

  .targetText & {
    border: solid 2px rgb(42, 42, 255)
  }

  &:focus {
    border: solid 2px rgb(42, 42, 255, 0)
  }
`

function Text({ style, id, position, text }) {

  const [content, setContent] = useState(text.text)
  const value = useContext(MSWContext)
  const [nowPosition, setNowPosition] = useState(position)
  const [nowTarget, setNowTarget] = useState(value.itemTarget)
  const [canEditable, setCanEditable] = useState(false)
  const textInput = useRef()

  function contentHandle(e) {
    text.text = e.target.value
    setContent(e.target.value)
  }
  const PositionHandle = (data) => {
    position.x = data.x
    position.y = data.y
    setNowPosition({ x: data.x, y: data.y })
  }

  function draggingStart(e) {
    value.setIsDragging(true);
  }

  function draggingEnd(e) {
    value.setIsDragging(false);
    value.forceUpdate()
  }

  useEffect(() => {
    setNowTarget(value.itemTarget)
    setCanEditable(false)
  }, [value.itemTarget])

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
      if (nowTarget === value.itemTarget) {
        setCanEditable(true)
      }
    }
    value.setItemTarget(id)
    setNowTarget(id)
  }

  return (

    <Draggable onStop={draggingEnd} onStart={draggingStart} disabled={!(nowTarget === id) || canEditable} defaultPosition={{ x: 0, y: 0 }} position={{ x: nowPosition.x, y: nowPosition.y }} onDrag={(e, data) => PositionHandle(data)}>
      <div className={clsx(nowTarget === id && 'targetText')} type={id} key={id} onClick={HandleEventItem} style={{ position: 'absolute', height: 'fit-content',  zIndex: style.zIndex }}>
        <TextComp disabled={!canEditable} style={style} ref={textInput} onChange={(e) => contentHandle(e)} value={content} />
      </div>
    </Draggable>
  )
}

export default Text