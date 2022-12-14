import styles from './CreatorSpace.module.css'
import WorkSpace from './workSpace'
import { useState, useEffect, useRef, useContext } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { createUseGesture, dragAction } from '@use-gesture/react'
import { GlobalContext } from '../../globalState/GlobalState'
import { MSWContext } from '../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import clsx from 'clsx'

const useGesture = createUseGesture([dragAction])

function CreatorSpace({ listItem, name }) {
  const value = useContext(GlobalContext)
  const valueData = useContext(MSWContext)
  const page = useRef()

  function handleClickPage(e){
    if(e.target === page.current){
      valueData.setItemTarget(null)
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
    scale: value.zoom
  }))

  useEffect(() => {
    api.start({ scale: value.zoom })
  }, [value.zoom])

  useEffect(() => {
    if (valueData.showResetBtn === false)
      api.start({ x: 0, y: 0 })
  }, [valueData.showResetBtn])

  useGesture(
    {
      onDrag: ({ offset: [x, y], down, currentTarget }) => {
        valueData.setShowResetBtn(true)
        down ? currentTarget.classList.add('grabbing') : currentTarget.classList.remove('grabbing')
        api.start({ x, y })
      },
    },
    {
      target: page,
      enabled: value.isMove,
      drag: {
        from: (valueData) => {
          if (valueData.showResetBtn) {
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
      className={clsx(styles.creatorSpace, value.isMove && styles.isMove,)}
      style={styleComponent}
      data-name={name}
    >
      <WorkSpace listItem={listItem} page={page} />
    </animated.div>
  )
}

export default CreatorSpace