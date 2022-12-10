

function FileInput(props) {
    
    return (<div>
        <input {...props} accept=".jpg" type = 'file'></input>
    </div>)
}

export default FileInput;