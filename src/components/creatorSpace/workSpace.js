import styles from './CreatorSpace.module.css'
import clsx from 'clsx'
import {useEffect, useState, useContext} from 'react'
import { GlobalContext } from '../../globalState/GlobalState'
import './style.css'
import { renderToString } from 'react-dom/server'
import CreateItem from './CreateItem'
import ReactDOMServer from 'react-dom/server';
import Block from '../items/Block/Block'
import Text from '../items/Text/Text'
import ImgBox from '../items/ImgBox/ImgBox'
// import Draggable from './DragDrop/Draggable'
import {Droppable} from './DragDrop/Droppable'
import {DndContext} from '@dnd-kit/core';
import Draggable from 'react-draggable';



function BackgroundGrid() {
    const [listItem, setListItem] = useState([])
    let itemsQuery = document.querySelectorAll('.workspaceItem')
    let boxsQuery = document.querySelector('.workSpace')

    document.addEventListener('mousemove', function(e){
        // console.log(e.pageX, e.pageY);
    })
    console.log(boxsQuery)
    const value = useContext(GlobalContext)

    function HandleEventItem() {
        itemsQuery.forEach(item=> {
            item.addEventListener('mouseover', ()=> {
                value.targetItemHandle(item)
            })
        })
    }

    // useEffect(()=> {
    //     if(value.targetItem) dropDrag(value.targetItem)
    // }, [value.targetItem])
    
    function ProduceItems() {
        boxsQuery.removeEventListener('click',handleEvent, true)     
        boxsQuery.addEventListener('click',handleEvent, true)     
    }
    
    function handleEvent(e) {
        console.log(e.target)
        let item = ''
        switch(value.selectedBtn){
            case 'block' : {
                item = (<Block></Block>) 
                break
            }
            case 'text': {
                item  = (<Draggable><div><Text></Text></div></Draggable>)
                break
            }
            case 'imgBlock': {
                item = (<Draggable><div><ImgBox></ImgBox></div></Draggable>)
                break
            }
            default: {

            }
        }
        if(item!='' && value.selectedBtn!=null){
            console.log(ReactDOMServer.renderToStaticMarkup(item))
            boxsQuery.innerHTML += (ReactDOMServer.renderToStaticMarkup(item))
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
    function handleDragEnd () {
        console.log('dragend')
      }
    let boxs= [<div className={clsx(styles.box, 'box')}><div className={clsx(styles.imgBlock, 'workspaceItem', styles.workspaceItem)}></div></div>]
    // for(let i=1;i<40;i++) {
    //     for(let j= 1; j< 40; j++) 
    //         boxs.push(<div
    //                 data-row={i} data-col={j} 
    //                 id={`$${i*112}${j}`}
    //                 className={clsx(styles.box, 'box')} 
    //                 key = {`$${i*112}${j}`}               
    //                 ></div>
                
    //      )
         

    // }
    return <Draggable ><div className='box'><Block></Block></div></Draggable>

}

export default BackgroundGrid