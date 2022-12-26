import style from './AddPage.module.css'
import clsx from 'clsx'
import { useState } from 'react'
import makeid from '../../../utils/makeid';
import { FiPlus } from "react-icons/fi";

function AddPageBtn({ data, errorMess }) {

  const [isAddingPage, setIsAddingPage] = useState(false)

  function handleClick(e) {
    setIsAddingPage(true)
  }

  function handleBlur(e) {

    if (e.target.value !== '') {
      const page = {
        id: makeid(10),
        name: e.target.value,
        listItem: [],
        style: {
          height: 100,
          width: 75,
          color: {
            type: 'solid',
            code: 'white'
          }
        },
      }

      data.setData(prev => [...prev, page])
    }

    setIsAddingPage(false)

  }

  return (
    isAddingPage ?
      (
        <>
          <input className={style.AddPageInput} autoFocus onBlur={handleBlur} />
        </>
      )
      :
      (
        <>
          <div className={style.AddPageBtn} onClick={handleClick}>
            <FiPlus />
          </div>
        </>
      )

  )
}

export default AddPageBtn