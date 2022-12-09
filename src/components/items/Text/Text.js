import styles from './Text.module.css'
import Draggable from 'react-draggable';
import { GlobalContext } from '../../../globalState/GlobalState'
import {useContext, useState, useEffect, useRef} from 'react'
import clsx from 'clsx'
import  styled  from 'styled-components'
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'

const TextComp = styled.textarea.attrs((props) => ({
  onChange: props.onChange,
  ref: props.ref
}))`
  color: ${props => props.style.color};
  font-size: ${props => props.style.fontSize};
  font-weight: ${props => props.style.fontWeight};
  display: ${props => props.style.display};
  border: ${props => props.style.border};
  width: ${props => props.style.width};
  height: ${props => props.style.height};
  z-index: ${props => props.style.zIndex};
  transform: rotate(${props => props.style.rotate})
`

function Text({style, id, position, text}) {
  console.log(text.text)
  const [content, setContent] = useState(text.text)
  const value = useContext(MSWContext)
  const [nowPosion, setNowPositon] = useState(position)
  const textInput = useRef()

  useEffect(() => {
    if(value.itemTarget === id){
      console.log(textInput)
      textInput.current.selectionStart = content.length
      textInput.current.focus()
    }
  }, [content])
  
  function contentHandle(e) {
    text.text = e.target.value
    setContent(e.target.value)
  }
  const PositionHandle = (data)=> {
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
 
  return (
    
    <Draggable disabled={!(value.itemTarget === id)} defaultPosition={{x: 0, y: 0}} position={{x: nowPosion.x, y: nowPosion.y}} style={{height: 'fit-content'}} onDrag= {(e,data)=> PositionHandle(data)}>
      
      <div className={clsx(value.itemTarget === id && 'target')} type={id} key={id} onClick={HandleEventItem} style={{height: 'fit-content'}}>
        <TextComp style={style} ref={textInput} onChange={(e) => contentHandle(e)} value={content}/>
      </div>
    </Draggable>
  )
}

export default Text