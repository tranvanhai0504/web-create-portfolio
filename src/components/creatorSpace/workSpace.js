import styles from './CreatorSpace.module.css'
import clsx from 'clsx'
import {useEffect, useState, useRef, useContext} from 'react'
import { GlobalContext } from '../../globalState/GlobalState'
import './style.css'
import { renderToString } from 'react-dom/server'
import CreateItem from './CreateItem'
import ReactDOMServer from 'react-dom/server';

import Block from '../items/Block/Block'
import Text from '../items/Text/Text'
import ImgBox from '../items/ImgBox/ImgBox'
import {Droppable} from './DragDrop/Droppable'
import {DndContext} from '@dnd-kit/core';
import Draggable from 'react-draggable';

function BackgroundGrid() {
    const [listItem, setListItem] = useState([])

    function handleListItem(item) {
        setListItem(prev=>{
            return [...prev, item]})
    }

    let itemsQuery = document.querySelectorAll('.workspaceItem')
    let boxsQuery = document.querySelector('.workSpace')
     document.addEventListener('mousemove', function(e){
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
        }
        if(item!='' && value.selectedBtn!=null){
            handleListItem(item)
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

    function handleDragEnd () {
        console.log('dragend')
      }
      function DragHandle (data) {
        console.log('x: ', data.x)
        console.log('y: ', data.y)
    }
    console.log('call:', listItem)
    return <>
        {listItem.map(item=> item)}
        </>
}

export default BackgroundGrid