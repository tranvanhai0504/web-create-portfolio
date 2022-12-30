import styles from './CreatorSpace.module.css'
import WorkSpace from './workSpace'
import { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { createUseGesture, dragAction } from '@use-gesture/react'
import { GlobalContext } from '../../globalState/GlobalState'
import { MSWContext } from '../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import clsx from 'clsx'

const useGesture = createUseGesture([dragAction])

function CreatorSpace({ listItem, id, forceUpdate, style, render = false, dev, isPreview }) {
  const value = useContext(GlobalContext)
  const valueData = useContext(MSWContext)
  const [isPreviewNow, setIsPreviewNow] = useState(isPreview)
  const page = useRef()

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

  useEffect(() => {
    setIsPreviewNow(isPreview)
  }, [isPreview])

  const [styleComponent, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: render ? 1 : value.zoom,
    width: (dev && !isPreviewNow) ? style.width * 75 + 'vw' : style.width * 100 + 'vw',
    height: (dev && !isPreviewNow) ? style.height * 75 + 'vh' : style.height * 100 + 'vh',
    background: style.color.code,
    overflow: (dev && !isPreviewNow) ? 'visible' : 'hidden',
    position: isPreviewNow ? 'fixed' : 'block',
    zIndex: isPreviewNow ? 100 : 0
  }))

  useEffect(() => {
    api.start({
      scale: render ? 1 : value.zoom,
      width: (dev && !isPreviewNow) ? style.width * 75 + 'vw' : style.width * 100 + 'vw',
      height: (dev && !isPreviewNow) ? style.height * 75 + 'vh' : style.height * 100 + 'vh',
      background: style.color.code,
      overflow: (dev && !isPreviewNow) ? 'visible' : 'hidden',
      position: isPreviewNow ? 'fixed' : 'block',
      zIndex: isPreviewNow ? 100 : 0
    })
  }, [style, isPreviewNow])

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
      <WorkSpace isPreviewNow={isPreviewNow} dev={isPreviewNow ? !isPreviewNow : dev} forceUpdate={forceUpdate} listItem={listItem} page={page} />
    </animated.div>
  )
}

export default CreatorSpace