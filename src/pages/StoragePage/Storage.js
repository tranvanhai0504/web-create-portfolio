
import CreatorSpace from '../../components/creatorSpace/CreatorSpace'
import { useSpring, animated } from '@react-spring/web'
import { HiOutlineTrash } from "react-icons/hi2";
import { ConfigResolverMap, useDrag, useGesture} from '@use-gesture/react'
import styles from './Storage.module.css';
import { NavLink } from 'react-router-dom'
import { SlPlus } from "react-icons/sl";
import {useState, useContext, useEffect} from 'react'
import {GlobalContext } from '../../globalState/GlobalState'
import { MSWContext } from '../MainScreenWorkPage/MainScreenWorkProvider/MSWProvider';
import makeid from '../../utils/makeid'
import clsx from "clsx";


function Storage(){
    const [name, setName] = useState('New Template')
    const value  = useContext(GlobalContext)
    const MSWValue = useContext(MSWContext)


    const [listTemplates, setListItemTemplates] =  useState(value.produces.map((produce, index) => {
        return (
            <NewProduct 
                id = {produce.id}
                produceName = {produce.name}
                key={index}
            >
                <div className={styles.scale}><CreatorSpace 
                    style={produce.listPage[0].style}
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

    function handleInput(name, id) {
        value.produces.forEach(produce=> {
            if(produce.id  === id) {
                produce.name = name
                localStorage.setItem('produces', JSON.stringify(value.produces))
            }
        })

    }
    function handleDragStart(id) {
        MSWValue.setItemTarget(id)
    }

    function NewProduct({children, id, produceName}) {
        let [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 , scale: 0.2}))
        let bind = useGesture(
            {
                onDrag: ({ down, movement: [mx, my],offset: [ox, oy] }) =>{
                api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
                },
                onDragStart: (e)=> {handleDragStart(id)}       
            }
        )
        
        return (
            <animated.div  {...bind()} style={{ x, y }} className={styles.templateContainer}   onDrag={e=>{dragHandle(e)}}>
                <div className={styles.template}>
                    <NavLink onClick={handleClick} data-id={id} to="/work" className={styles.editMessage}>Edit</NavLink>
                    {children}
                </div>
                <span className={styles.templateName} onInput={e=> {handleInput(e.target.textContent, id)}} contentEditable={true}>{produceName}</span>
            </animated.div>
        )
    }

    function createNewTemplate(e) { 
        const produce = {
            name: 'New Template',
            id : makeid(10),
            listPage: [{
                name: 'mainPage',
                id: makeid(10),
                style: {
                    height: 100,
                    width: 75,
                    color:{
                        type: 'solid',
                        code: 'white'
                    }
                },
                listItem: [],
            }]
        }
        
        value.setProduces(prev => [...prev, produce])
        setListItemTemplates(prev => [...prev,( 
            <NewProduct 
                id={produce.id}
                produceName = {produce.name}
            >
                <div className={styles.scale}>
                    <CreatorSpace style={produce.listPage[0].style} listItem={produce.listPage[0].listItem} id={produce.id} forceUpdate={()=>{}}/>
                </div>
            </NewProduct>)])
    }
    function handleMouseUp(e) {
        console.log('e', e)
    }

    function handleDragEnter() {
        console.log('dragEnter')
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
                <span className={clsx(styles.trash)}  onMouseUp={handleMouseUp} onDragOver={handleDragEnter}>
                    <HiOutlineTrash />
                </span>
            </div>

        </div>
    )
}

export default Storage