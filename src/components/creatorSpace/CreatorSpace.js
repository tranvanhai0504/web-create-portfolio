import styles from './CreatorSpace.module.css'
import WorkSpace from './workSpace'
import { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { createUseGesture, dragAction } from '@use-gesture/react'
import { GlobalContext } from '../../globalState/GlobalState'
import { MSWContext } from '../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import clsx from 'clsx'

const useGesture = createUseGesture([dragAction])

function CreatorSpace({ listItem, id, forceUpdate, style, render = false, dev }) {
  const value = useContext(GlobalContext)
  const valueData = useContext(MSWContext)
  const page = useRef()
  // useEffect(()=> {
  //   document.addEventListener('keydown', handleKeyDown)
  //   function handleKeyDown({ repeat, ctrlKey, key }) {
  //     if (repeat) return
  //     if ((ctrlKey) && key === 'z') {
  //       let length = value.listUndo.current.length
  //       let data 
  //       if(length){
  //         data = value.listUndo.current[length-1]
  //         console.log('undo: ', data)
  //         value.setProduces(data) 
  //       }
  //     }
  //     console.log(value.listUndo.current)
  //   }
  //   return ()=> {
  //     document.removeEventListener('keydown', handleKeyDown)
  //   }
  // },[])

  function handleClickPage(e) {
    if (e.target === page.current) {
      valueData?.setItemTarget(null)
    }
  }

  useEffect(() => {
    const handler = e => e.preventDefault()
    document.addEventListener('gesturestart', handler)
    document.addEventListener('gesturechange', handler)
    document.addEventListener('gestureend', handler)

    page.current.addEventListener('click', handleClickPage)

    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
      document.removeEventListener('gestureend', handler)
    }
  }, [])

  const [styleComponent, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: render ? 1 : value.zoom,
    height: dev ? style.height * 75 + 'vh' : style.height * 100 + 'vh',
    width: dev ? style.width * 75 + 'vw' : style.width * 100 + 'vw',
    background: style.color.code
  }))

  useEffect(() => {
    api.start({
      height: style.height * 75 + 'vh',
      background: style.color.code
    })
  }, [style])

  useEffect(() => {
    api.start({ scale: value?.zoom })
  }, [value?.zoom])

  useEffect(() => {
    if (valueData?.showResetBtn === false)
      api.start({ x: 0, y: 0 })
  }, [valueData?.showResetBtn])

  useGesture(
    {
      onDrag: ({ offset: [x, y], down, currentTarget }) => {
        valueData?.setShowResetBtn(true)
        down ? currentTarget.classList.add('grabbing') : currentTarget.classList.remove('grabbing')
        api.start({ x, y })
      },
    },
    {
      target: page,
      enabled: value?.isMove,
      drag: {
        from: (valueData) => {
          if (valueData?.showResetBtn) {
            return [0, 0]
          }
          else {
            return [styleComponent.x.get(), styleComponent.y.get()]
          }
        }
      }
    }
  )

  return (
    <animated.div
      ref={page}
      className={clsx(styles.creatorSpace, value?.isMove && styles.isMove, value?.selectedBtn && value?.selectedBtn !== 'zoom' && value?.selectedBtn !== 'handMove' && styles.addItem)}
      style={styleComponent}
      data-id={id}
    >
      <WorkSpace dev={dev} forceUpdate={forceUpdate} listItem={listItem} page={page} />
    </animated.div>
  )
}

export default CreatorSpace