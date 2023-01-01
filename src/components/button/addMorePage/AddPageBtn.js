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

    const listDirectButton = data.data.map(page => {
      const item = {
        type: 'button',
        id: makeid(10),
        style: {
          borderRadius: 0,
          color: {
            type: 'solid',
            code: '#ccc'
          },
          fontSize: 14,
          fontColor: 'white',
          fontWeight: 500,
          fontFamily: '"Times New Roman"',
          textItalic: false,
          textUnderLine: false,
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'flex-start',
          verticalAlign: 'text-bottom',
          boxSizing: 'content-box',
          border: 'unset',
          borderColor: 'black',
          borderType: '',
          borderSize: 1,
          unBorderLeft: false,
          unBorderRight: false,
          unBorderTop: false,
          unBorderBottom: false,
          width: 50,
          height: 20,
          shadow: 'none',
          shadowX: 5,
          shadowY: 5,
          blur: 0,
          shadowColor: 'black',
          shadowInner: false,
          zIndex: 3,
          rotate: 0,
          opacity: 1
        },
        position: { x: 0, y: 0 },
        direct: page.id,
        name: page.name
      }
      return item
    })

    if (e.target.value !== '') {
      const page = {
        id: makeid(10),
        name: e.target.value,
        listItem: [],
        style: {
          height: 1,
          width: 1,
          color: {
            type: 'solid',
            code: '#fff'
          }
        },
      }

      const item = {
        type: 'button',
        id: makeid(10),
        style: {
          borderRadius: 0,
          color: {
            type: 'solid',
            code: '#ccc'
          },
          fontColor: 'white',
          fontSize: 14,
          fontWeight: 500,
          fontFamily: '"Times New Roman"',
          textItalic: false,
          textUnderLine: false,
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'flex-start',
          verticalAlign: 'text-bottom',
          boxSizing: 'content-box',
          border: 'unset',
          borderColor: 'black',
          borderType: '',
          borderSize: 1,
          unBorderLeft: false,
          unBorderRight: false,
          unBorderTop: false,
          unBorderBottom: false,
          width: 50,
          height: 20,
          shadow: 'none',
          shadowX: 5,
          shadowY: 5,
          blur: 0,
          shadowColor: 'black',
          shadowInner: false,
          zIndex: 3,
          rotate: 0,
          opacity: 1
        },
        position: { x: 0, y: 0 },
        direct: page.id,
        name: page.name
      }
      listDirectButton.push(item)

      if (listDirectButton.length > 1) {
        data.data.forEach(page => {
          item.id = makeid(10)
          if(data.data.length === 1){
            const newListBtn = JSON.parse(JSON.stringify([...listDirectButton]))
            newListBtn.forEach(item => {item.id = makeid(10)})
            page.listItem = [...page.listItem, ...newListBtn]
          }else{
            page.listItem = [...page.listItem, JSON.parse(JSON.stringify(item))]
          }
        })
        page.listItem = [...listDirectButton]
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