

function ProduceItems() {
    const toolsList = document.querySelector('.listToolTips')
    const tooltips = toolsList.querySelectorAll('.tooltip');
    tooltips.forEach((tool) => {
        tool.addEventListener('click', (e) => {
            // if(tool.querySelector('data-name')){
                
            // }
            if(e.target.parentElement.getAttribute('data-name')=='block')
                console.log('blockkk')
            console.log(e.target.parentElement);
        })
    })
}

export default ProduceItems