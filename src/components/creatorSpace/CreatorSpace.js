import styles from './CreatorSpace.module.css'
import WorkSpace from './workSpace'
import { useState, useEffect, useRef, useContext } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { createUseGesture, dragAction } from '@use-gesture/react'
import { GlobalContext } from '../../globalState/GlobalState'
import clsx from 'clsx'
// import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import {DndContext} from '@dnd-kit/core';
import Draggable from 'react-draggable';

const useGesture = createUseGesture([dragAction])

function CreatorSpace({ showResetBtn, setShowResetBtn, pages, setPages }) {
  const value = useContext(GlobalContext)
  const page = useRef()
  const pageDetail = useRef({
    name: 'page1',
    listItem: []
  })

  useEffect(() => {
    setPages(prev => [...prev, pageDetail])
  }, [pageDetail.current]) 

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
      onDrag: ({ offset: [x, y], down, currentTarget }) => {
        if (!showResetBtn) {
          setShowResetBtn(true)
        }
        down ? currentTarget.classList.add('grabbing') : currentTarget.classList.remove('grabbing')
        api.start({ x, y })
      },
    },
    {
      target: page,
      enabled: value.isMove,
      drag: {
        from: () => {
          if (!showResetBtn) { return [0, 0] }
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
      className={clsx(styles.creatorSpace, value.isMove && styles.isMove, 'workSpace')}
      style={styleComponent}
    >
      <WorkSpace />

    </animated.div>
  )
}

export default CreatorSpace