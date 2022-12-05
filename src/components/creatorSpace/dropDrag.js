import {} from '../../globalState/GlobalState'

async function dropDrag(target) {
    const boxs = document.querySelectorAll('.box')
    
        target.addEventListener('dragstart', dragstartHandle)

        target.addEventListener('dragend', function(e) {
            console.log('dragend')
            e.target.classList.remove('target')
            document.querySelector('.workSpace').removeEventListener('dragover', dragoverHandle)
        })

        function dragstartHandle(e) {
            document.querySelector('.workSpace').addEventListener('dragover', dragoverHandle)
            console.log('dragstart handle')
            e.target.classList.add('target')
        }
        function dragoverHandle(e) {
            e.preventDefault()
            if(e.target.classList.contains('box')) {
                e.target.appendChild(target)
            }

        }

}
export default dropDrag
//bi lap cong don 1 2 3 6
