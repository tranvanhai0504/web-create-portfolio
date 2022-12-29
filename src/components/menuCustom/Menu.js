import { useState, useEffect, useRef } from 'react'
import style from './Menu.module.css'
import clsx from 'clsx'

function Menu({children, position, direction = 'down', isAbsolute = false, data}) {
  const menu = useRef()

  useEffect(() => {
    menu.current.style.left = position.x + 'px';
    menu.current.style.top = position.y + 'px';

  }, [ position ])

  return (
      <div
        className={clsx(isAbsolute && style.absolute, style.menuDropdown, direction === 'down' && style.down, direction === 'up' && style.up, direction === 'left' && style.left, direction === 'right' && style.right)}
        ref={menu}
      >
        {children.map( (child, index) => {
          return <div className={style.btn} id={position.id} data-func={child.name} key={index} onClick={(e) => {child.func(e, data)}}>{child.icon}{child.name}</div>
        })}
      </div>
  )
}

export default Menu