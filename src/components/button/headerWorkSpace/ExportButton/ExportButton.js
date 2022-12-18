import styles from './ExportButton.module.css'
import clsx from 'clsx'

function ExportButton(){
    return (
        <button onClick={() => {alert('sorry, this feature is not available. Thank you for try our web <3')}} className={clsx(styles.exportButton)}>Export File</button>
    )
}

export default ExportButton