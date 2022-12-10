import style from './AddPage.module.css'
import { FiPlus } from "react-icons/fi";

function AddPageBtn() {
  return (
    <div className={style.AddPageBtn}>
      <FiPlus/>
    </div>
  )
}

export default AddPageBtn