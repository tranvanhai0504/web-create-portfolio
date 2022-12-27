import styles from './CreatorSpace.module.css'
import WorkSpace from './workSpace'
import { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react'
import { useTrail, animated } from '@react-spring/web'
import { createUseGesture, dragAction } from '@use-gesture/react'
import { GlobalContext } from '../../globalState/GlobalState'
import { MSWContext } from '../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import clsx from 'clsx'

const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useGesture = createUseGesture([dragAction])

function CreatorSpace({ listItem, id, forceUpdate, style, render = false }) {
  const value = useContext(GlobalContext)
  const valueData = useContext(MSWContext)
  console.log(value, valueData, render)
  const page = useRef()

  function handleClickPage(e) {
    if (e.target === page.current) {
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

  const [styleComponent, api] = useTrail(1, () => ({
    x: 0,
    y: 0,
    scale: render ? 1 : value.zoom,
    height: style.height * 75 + 'vh',
    background: style.color.code
  }))

  useIsomorphicLayoutEffect(() => {
    api.start({
      height: style.height * 75 + 'vh',
      background: style.color.code
    })
  }, [style])

  useIsomorphicLayoutEffect(() => {
    api.start({ scale: value.zoom })
  }, [value.zoom])

  useIsomorphicLayoutEffect(() => {
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
      className={clsx(styles.creatorSpace, value.isMove && styles.isMove, value.selectedBtn && value.selectedBtn !== 'zoom' && value.selectedBtn !== 'handMove' && styles.addItem)}
      style={styleComponent[0]}
      data-id={id}
    >
      <WorkSpace forceUpdate={forceUpdate} listItem={listItem} page={page} />
    </animated.div>
  )
}

export default CreatorSpace