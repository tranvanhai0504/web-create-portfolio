import styles from './CreatorSpace.module.css'
import clsx from 'clsx'
import dropDrag from './dropDrag'
import {useEffect, useState} from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../../globalState/GlobalState'
import ReactDOMServer from 'react-dom/server';
import './style.css'

let boxsQuery = document.querySelector('.workSpace')
console.log(boxsQuery)
let itemsQuery = document.querySelectorAll('.workspaceItem')
function BackgroundGrid() {
    const value = useContext(GlobalContext)

    function HandleEventItem() {
        itemsQuery.forEach(item=> {
            item.addEventListener('mouseover', ()=> {
                value.targetItemHandle(item)
            })
        })
    }

    useEffect(()=> {
        if(value.targetItem) dropDrag(value.targetItem)
    }, [value.targetItem])
    
    function ProduceItems() {
        boxsQuery.removeEventListener('click',handleEvent, true)     
        boxsQuery.addEventListener('click',handleEvent, true)     
    }
    
    function handleEvent(e) {
        console.log(e.target)
        let item = ''
        switch(value.selectedBtn){
            case 'block' : {
                item = (<div draggable='true' className={clsx('workspaceItem', styles.blockItem, styles.workspaceItem)}></div>)
                break
            }
            case 'text': {
                item  = (<textarea className={clsx(styles.inputText, 'workspaceItem', styles.workspaceItem)} draggable='true'></textarea>)
                break
            }
            case 'imgBlock': {
                item = (<div draggable='true' className={clsx(styles.imgBlock, 'workspaceItem', styles.workspaceItem)}></div>)
                break
            }
        }
        if(item!='' && value.selectedBtn!=null&&!e.target.classList.contains('workSpace')){
            e.target.innerHTML = (ReactDOMServer.renderToStaticMarkup(item))
            boxsQuery.removeEventListener('click', handleEvent, true)
            value.handleClick(null)
        }
    } 



    useEffect(()=> {
        boxsQuery = document.querySelector('.workSpace')
        itemsQuery = document.querySelectorAll('.workspaceItem')
        if(boxsQuery) ProduceItems()
        if(itemsQuery) HandleEventItem()
    }, [value.selectedBtn])
    
    // useEffect(()=> {
    //     dropDrag()
    // }, [])

    let boxs= [<div className={clsx(styles.box, 'box')}><div draggable='false' className={clsx(styles.imgBlock, 'workspaceItem', styles.workspaceItem)}></div></div>]
    for(let i=1;i<40;i++) {
        for(let j= 1; j< 40; j++) 
            boxs.push(<div
                data-row={i} data-col={j} 
                id={`$${i*112}${j}`}
                className={clsx(styles.box, 'box')} 
                key = {`$${i*112}${j}`}               
                ></div>)

    }
    return boxs

}

export default BackgroundGrid