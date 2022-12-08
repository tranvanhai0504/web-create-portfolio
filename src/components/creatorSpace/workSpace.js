import styles from './CreatorSpace.module.css'
import clsx from 'clsx'
import {useEffect, useState, useRef, useContext} from 'react'
import { GlobalContext } from '../../globalState/GlobalState'
import './style.css'
import Block from '../items/Block/Block'
import Text from '../items/Text/Text'
import ImgBox from '../items/ImgBox/ImgBox'
import Draggable from 'react-draggable';

function BackgroundGrid({listItem}) {
    const [listItemStore, setListItemStore] = useState(listItem)

    function handleListItem(item) {
        listItem.push(item)
        setListItemStore(prev=>{
            return [...prev, item]})
    }

    let boxsQuery = document.querySelector('.workSpace')
    const value = useContext(GlobalContext)

    function HandleEventItem() {
        listItemStore.forEach(item=> {
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
            handleListItem(item)
            boxsQuery.removeEventListener('click', handleEvent, true)
            value.handleClick(null)
        }
    }

    useEffect(()=> {
        boxsQuery = document.querySelector('.workSpace')
        if(boxsQuery) ProduceItems()
        if(listItemStore) HandleEventItem()
    }, [value.selectedBtn])

    function handleDragEnd () {
        console.log('dragend')
      }
      function DragHandle (data) {
        console.log('x: ', data.x)
        console.log('y: ', data.y)
    }
    return <>
        {listItemStore.map(item=> item)}
        </>
}

export default BackgroundGrid