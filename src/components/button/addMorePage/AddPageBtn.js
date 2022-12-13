import style from './AddPage.module.css'
import clsx from 'clsx'
import { useState } from 'react'
import CreatorSpace from '../../creatorSpace/CreatorSpace'
import { FiPlus } from "react-icons/fi";

function AddPageBtn({ data }) {

  const [isAddingPage, setIsAddingPage] = useState(false)
  const [message, setMessage] = useState('')

  function handleClick(e) {
    setIsAddingPage(true)
  }

  function handleBlur(e) {
    let isAlreadyExist = false
    data.data.forEach(page => {
      if (page.name === e.target.value) {
        isAlreadyExist = true
      }
    })

    if (isAlreadyExist) {
      setMessage(prev => {
        if(prev === ''){
          return 'Exist page name'
        }else{
          return prev + '!'
        }
      })
    } else {
      if (e.target.value !== '') {
        const page = {
          name: e.target.value,
          listItem: [],
          page({ key }) { return <CreatorSpace name={this.name} listItem={this.listItem} key={key} showResetBtn={data.showResetBtn} setShowResetBtn={data.setShowResetBtn} /> }
        }

        data.setData(prev => [...prev, page])
      }

      setIsAddingPage(false)
      setMessage('')
    }

  }

  return (
    isAddingPage ?
      (
        <>
          <input className={style.AddPageInput} autoFocus onBlur={handleBlur} />
          <p className={style.errorMessage}>{message}</p>
        </>
      )
      :
      (
        <div className={style.AddPageBtn} onClick={handleClick}>
          <FiPlus />
        </div>
      )

  )
}

export default AddPageBtn