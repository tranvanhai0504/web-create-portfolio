import React from 'react'
import styles from './ImgBox.module.css'
import clsx from 'clsx'
import Draggable from 'react-draggable';
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import {useContext, useState, useRef} from 'react'
import  styled  from 'styled-components'

function ImgBox({style, id, position}) {
  const [image, setImage] = useState('')
  const value = useContext(MSWContext)
  const [nowPosion, setNowPositon] = useState(position)
  console.log('id: ',id)
  const ImgComp = styled.div`
    width: ${style.width};
    height: ${style.height};
    border-radius: ${style.borderRadius};
    border: ${style.border};
    z-index: ${style.zIndex};
    background-position: ${style.backgroundPosition};
    background-size: ${style.backgroundSize};
    background-image: ${image.preview||style.backgroundImage};
    transform: ${style.transform}
  `
  const PositionHandle = (data)=> {
    console.log(position)
    position.x =  data.x
    position.y =  data.y
    setNowPositon({x: data.x, y: data.y})
  }
  
  function HandleEventItem(e) {
    console.log(id+ "=========" + value.itemTarget)
    if(value.itemTarget === id) 
      value.setItemTarget(null)
    else
      value.setItemTarget(id)
    
  }

  function handleFile(e) {
    console.log('input')
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setImage(file)
  }


  return (<Draggable disabled={!(value.itemTarget === id)} defaultPosition={{x: 0, y: 0}} position={{x: nowPosion.x, y: nowPosion.y}} style={{height: 'fit-content'}} onDrag= {(e,data)=> PositionHandle(data)}>
            <div className={clsx(value.itemTarget === id && 'target')} type={id} key={id} onClick={HandleEventItem} style={{height: 'fit-content'}}>
              <ImgComp/>
              <input 
                type='file'
                className='customInputImg'
                onChange={e=> handleFile}
              ></input>
            </div>
            
          </Draggable>
    
  )
}

export default ImgBox