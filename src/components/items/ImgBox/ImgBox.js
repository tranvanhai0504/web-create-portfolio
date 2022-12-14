import React from 'react'
import styles from './ImgBox.module.css'
import clsx from 'clsx'
import Draggable from 'react-draggable';
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import {useContext, useState, useEffect} from 'react'
import  styled  from 'styled-components'

const ImgComp = styled.div`
  width: ${props=>props.style.width};
  height: ${props=>props.style.height};
  border-radius: ${props=>props.style.borderRadius};
  border: ${props=>props.style.border};
  z-index: ${props=>props.style.zIndex};
  background-position: ${props=>props.style.backgroundPosition};
  background-size: ${props=>props.style.backgroundSize};
  background-image: ${props=>props.style.backgroundImage};
  transform: ${props=>props.style.transform};
  resize: ${props=>props.style.resize};
  overflow: ${props=>props.style.overflow};
  background-image: url(${props=>props.src});
  transform: ${props=>props.style.transform}
`
function ImgBox({style, id, position, src}) {
  const value = useContext(MSWContext)
  const [nowTarget, setNowTarget] = useState(value.itemTarget)
  const [nowPosion, setNowPositon] = useState(position)
  const PositionHandle = (data)=> {
    position.x =  data.x
    position.y =  data.y
    setNowPositon({x: data.x, y: data.y})
  }

  useEffect(() => {
    console.log('position change')
    console.log(position)
    setNowPositon({ x: position.x, y: position.y })
  }, value.data)

  function draggingStart(e){
    value.setIsDragging(true);
  }

  function draggingEnd(e){
    value.setIsDragging(false);
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

  return (<Draggable onStop={draggingEnd} onStart={draggingStart} disabled={!(nowTarget === id)} defaultPosition={{x: 0, y: 0}} position={{x: nowPosion.x, y: nowPosion.y}} style={{height: 'fit-content'}} onDrag= {(e,data)=> PositionHandle(data)}>
            <div className={clsx(nowTarget === id && 'target')} type={id} key={id} onClick={HandleEventItem} style={{height: 'fit-content'}}>
              <ImgComp style={style} src={src}/>
            </div>
          </Draggable>
  )
}

export default ImgBox