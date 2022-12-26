
import CreatorSpace from '../../components/creatorSpace/CreatorSpace'
import { useSpring, animated } from '@react-spring/web'
import { HiOutlineTrash } from "react-icons/hi2";
import { useDrag } from '@use-gesture/react'
import styles from './Storage.module.css';
import { NavLink } from 'react-router-dom'
import { SlPlus } from "react-icons/sl";
import {useState, useContext} from 'react'
import {GlobalContext } from '../../globalState/GlobalState'
import makeid from '../../utils/makeid'
import clsx from "clsx";


function Storage(){
    const [name, setName] = useState('New Template')
    const [itemHover, setItemHover] = useState()
    const value  = useContext(GlobalContext)
    

    const [listTemplates, setListItemTemplates] =  useState(value.produces.map((produce, index) => {
        console.log('proid: ', produce.id)
        return (
            <NewProduct 
                id = {produce.id}
                key={index}
            >
                <div className={styles.scale}><CreatorSpace 
                    listItem={produce.listPage[0]?.listItem ? produce.listPage[0]?.listItem: []} 
                    id={produce.id}
                    forceUpdate={()=>{}}
                /></div>
            </NewProduct>
        )
    }))

    function handleClick(e) {
        const id = e.target.getAttribute('data-id')
        console.log('set', id)
        value.setProduceSelect(id)
    }

    function NewProduct({children, id}) {
        let [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 , scale: 0.2}))
        let bind = useDrag(({ down, movement: [mx, my] }) => {
            api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
        }, {
            enabled: itemHover
        })
        
        return (
            <animated.div  {...bind()} style={{ x, y }} className={styles.templateContainer}>
                <div className={styles.template}>
                    <NavLink onClick={handleClick} data-id={id} to="/work" className={styles.editMessage}>Edit</NavLink>
                    {children}
                </div>
                <span className={styles.templateName} onInput={e=> {setName(e.target.textContent)}} contentEditable={true}>{name}</span>
            </animated.div>
        )
    }

    function createNewTemplate(e) { 
        const produce = {
            name: '',
            id : makeid(10),
            listPage: [{
                name: 'mainPage',
                id: makeid(10),
                listItem: [],
            }]
        }
        
        value.setProduces(prev => [...prev, produce])
        setListItemTemplates(prev => [...prev,( 
            <NewProduct id={produce.id}>
                <div className={styles.scale}><CreatorSpace listItem={produce.listPage[0].listItem} id={produce.id} forceUpdate={()=>{}}/></div>
            </NewProduct>)])
        console.log('edded')
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
                <span className={clsx(styles.trash)}>
                    <HiOutlineTrash />
                </span>
            </div>

        </div>
    )
}

export default Storage