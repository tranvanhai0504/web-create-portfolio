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
        console.log('event', e.target)
        let item = ''
        switch(value.selectedBtn){
            case 'block' : {
                item = (<Block></Block>) 
                break
            }
            case 'text': {
                item  = (<Text></Text>)
                break
            }
            case 'imgBlock': {
                item = (<ImgBox></ImgBox>)
                break
            }
        }
        if(item!='' && value.selectedBtn!=null){
            handleListItem(item)
            console.log('push to list')
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

    console.log('call:', listItem)
    return <>
        {listItem.map(item=> item)}
        </>
}

export default BackgroundGrid