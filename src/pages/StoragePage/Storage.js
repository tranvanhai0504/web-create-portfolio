
import CreatorSpace from '../../components/creatorSpace/CreatorSpace'
import { useSpring, animated } from '@react-spring/web'
import { HiOutlineTrash } from "react-icons/hi2";
import {useGesture} from '@use-gesture/react'
import styles from './Storage.module.css';
import { NavLink } from 'react-router-dom'
import { SlPlus } from "react-icons/sl";
import {useState, useContext, useEffect} from 'react'
import {GlobalContext } from '../../globalState/GlobalState'
import makeid from '../../utils/makeid'
import clsx from "clsx";


function Storage(){
    const [name, setName] = useState(null)
    const [targetItem, setTargetItem] = useState(null)
    const value  = useContext(GlobalContext)
    const [isDragging, setIsDragging] = useState(false)


    const [listTemplates, setListItemTemplates] =  useState(value.produces.map((produce, index) => {
        return (
            <NewProduct 
                id = {produce.id}
                produceName = {produce.name}
                key={index}
            >
                <div className={styles.scale}><CreatorSpace 
                    style={produce.listPage[0]?.style}
                    listItem={produce.listPage[0]?.listItem ? produce.listPage[0]?.listItem : []}
                    id={produce.id}
                    forceUpdate={()=>{}}
                /></div>
            </NewProduct>
        )
    }))

    function handleClick(e) {
        const id = e.target.getAttribute('data-id')
        value.setProduceSelect(id)
    }

    function dragHandle() {
        console.log('draggin...')
    }

    
    useEffect(()=>{
        setListItemTemplates(value.produces.map((produce, index) => {
            return (
                <NewProduct 
                    id = {produce.id}
                    produceName = {produce.name}
                    key={index}
                >
                    <div className={styles.scale}><CreatorSpace 
                        style={produce.listPage[0]?.style}
                        listItem={produce.listPage[0]?.listItem ? produce.listPage[0]?.listItem : []}
                        id={produce.id}
                        forceUpdate={()=>{}}
                    /></div>
                </NewProduct>
            )
        }))
    }, [value.produces])
    
    function handleDragStart(id) {
        setIsDragging(true)
        setTargetItem(id)
    }

    function handleFocus(value, e) {
        console.log('focus', value)
        setName(value)
        e.target.value = value
        
    }
    
    function handleBlur(id, e) {
        value.produces.forEach(produce=> {
            if(produce.id === id) {
                produce.name = e.target.value
                console.log('change: ', e.target.value)
            }else
                console.log('not', e.target.value, id)
        })
        localStorage.setItem('produces', JSON.stringify(value.produces))
    }

    function NewProduct({children, id, produceName}) {
        let [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 , scale: 0.2}))
        let bind = useGesture(
            {
                onDrag: ({ down, movement: [mx, my],offset: [ox, oy] }) =>{
                api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
                },
                onDragStart: (e)=> {handleDragStart(id)},  
            },{
                drag:{
                    pointer: {capture: false}
                }
            }
        )
        
        return (
            <animated.div  {...bind()} style={{ x, y }} className={styles.templateContainer}   onDrag={e=>{dragHandle(e)}}>
                <div className={styles.template}>
                    <NavLink onClick={handleClick} data-id={id} to="/work" draggable={false} className={styles.editMessage}>Edit</NavLink>
                    {children}
                </div>
                <input 
                    className={styles.templateName} 
                    onFocus={e=>handleFocus(produceName, e)}
                    placeholder={produceName}
                    onBlur={e=>handleBlur(id, e)}
                    value = {name}
                    draggable={false}
                />
            </animated.div>
        )
    }

    function createNewTemplate(e) { 
        const produce = {
            name: 'new produce',
            id: makeid(10),
            listPage: [{
                name: 'mainPage',
                id: makeid(10),
                style: {
                    height: 1,
                    width: 1,
                    color: {
                        type: 'solid',
                        code: '#fff'
                    }
                },
                listItem: [],
            }]
        }
        
        value.setProduces(prev => [...prev, produce])
        setListItemTemplates(value.produces.map((produce, index) => {
            return (
                <NewProduct 
                    id = {produce.id}
                    produceName = {produce.name}
                    key={index}
                >
                    <div className={styles.scale}><CreatorSpace 
                        style={produce.listPage[0]?.style}
                        listItem={produce.listPage[0]?.listItem ? produce.listPage[0]?.listItem : []}
                        id={produce.id}
                        forceUpdate={()=>{}}
                    /></div>
                </NewProduct>
            )
        }))
        setName(null)
    }
    function handleMouseUp(e) {
        const targetId = targetItem
        console.log('de:', targetId, isDragging)
        if(targetId&&isDragging) {
            value.setProduces(prev => prev.filter(produce=> produce.id !==targetId))
            setListItemTemplates(prev=> prev.filter(tp=> tp.props.id!==targetId))
            setTargetItem(null)
        }
    }


    function handleMouseLeave() {
        console.log('end')
        setIsDragging(false)
    }


    return (
        <div className={styles.container}>

            <div className={styles.rowContainer}>
                {listTemplates? (listTemplates.map((item)=> item)):''}
                <div onClick={createNewTemplate} className={styles.plusItem}>
                    <SlPlus/>
                </div>
            </div> 

            <div className={styles.trashContainer}>
                <span className={clsx(styles.trash)} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp}>
                    <HiOutlineTrash />
                </span>
            </div>

        </div>
    )
}

export default Storage