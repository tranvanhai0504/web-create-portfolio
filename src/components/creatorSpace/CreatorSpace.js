import styles from './CreatorSpace.module.css'
import WorkSpace from './workSpace'
import { useState, useEffect, useRef, useContext } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { createUseGesture, dragAction } from '@use-gesture/react'
import { GlobalContext } from '../../globalState/GlobalState'
import clsx from 'clsx'
import Draggable from 'react-draggable';

const style = {
  height: '20%',
  width: '20%',
  position: 'absolute',
  top: '0',
  left: '0',
  backgroundColor: 'green'
}

const useGesture = createUseGesture([dragAction])

function CreatorSpace({ showResetBtn, setShowResetBtn }) {
  const [isTarget, setIsTarget] = useState(false)
  const value = useContext(GlobalContext)
  const page = useRef()

  useEffect(() => {
    const handler = e => e.preventDefault()
    document.addEventListener('gesturestart', handler)
    document.addEventListener('gesturechange', handler)
    document.addEventListener('gestureend', handler)
    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
      document.removeEventListener('gestureend', handler)
    }
  }, [])

  const [styleComponent, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: value.zoom
  }))

  useEffect(() => {
    api.start({ scale: value.zoom })
  }, [value.zoom])

  useEffect(() => {
    api.start({ x: 0, y: 0 })
  }, [showResetBtn])

  useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        if (!showResetBtn) {
          setShowResetBtn(true)
        }
        api.start({ x, y })
      },
    },
    {
      target: page,
      enabled: value.isMove,
      drag: {
        from: () => {
          if (!showResetBtn) { return [0, 0] }
          else{
            return [styleComponent.x.get(), styleComponent.y.get()]
          }
        }
      }
    }
  )


  function handleClick(e) {
    console.log('click' + isTarget);
    setIsTarget(!isTarget)
  }

  

  return (
    <animated.div
      ref={page}
      className={clsx(styles.creatorSpace, value.isMove && styles.isMove, 'workSpace')}
      style={styleComponent}
    >
         <WorkSpace/>
         
    </animated.div>
  )
}

export default CreatorSpace