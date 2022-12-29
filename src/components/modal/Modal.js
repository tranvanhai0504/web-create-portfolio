import style from './Modal.module.css'
import { useRef } from 'react'
import icon from '../../assets/iconModal.png'

function Modal({ message, handleClick }) {

  const overlay = useRef()

  function handleOverlayClick(e) {
    if (e.target === overlay.current) {
      handleClick()
    }
  }

  return (
    <div ref={overlay} onClick={handleOverlayClick} className={style.overlayModal}>
      <div className={style.modal}>
        <div className={style.modalContainerTitle}>
          <h2 className={style.modalTitle}>Uh lu</h2>
          <img alt="i" src={icon} className={style.modalIcon}></img>
        </div>
        <div className={style.modalMessage}>
          <p className={style.message}>{message}</p>
          <button className={style.modalButton} onClick={handleClick}>OK</button>
        </div>
      </div>
    </div>
  )
}

export default Modal