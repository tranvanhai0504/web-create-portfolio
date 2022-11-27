import styles from './ExportButton.module.css'
import clsx from 'clsx'

function ExportButton(){
    return (
        <button className={clsx(styles.exportButton)}>Export File</button>
    )
}

export default ExportButton