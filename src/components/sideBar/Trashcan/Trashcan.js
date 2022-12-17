import Styles from './Trashcan.module.css'
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import { useContext } from 'react'
import { useState } from 'react';
import clsx from 'clsx'
import ImgBox from '../../items/ImgBox/ImgBox';
function Trashcan({setIsEnterTrash}) {

    const value = useContext(MSWContext)
    const [pacmanclasses,setpacmanclasses]=useState([Styles.pacman])
    const [pacmanm,setpacmanm]=useState([Styles.pacmanmouth])
    const [para,setpara]=useState([Styles.para])
    const [position,setposition]=useState({x:0,y:0})
    
    
    const mouseOver=(x,y)=>{
        setposition({x:x,y:y})
        setpacmanclasses(prev=>{
            const newpacmanclasses=[...prev,Styles.pacmanA]
            return newpacmanclasses
        })
        setpacmanm(prev=>{
            const newpacmanm=[...prev,Styles.pacmanmouthA]
            return newpacmanm
        })
        setpara(prev=>{
            const newpara=[...prev,Styles.pA]
            return newpara
        })
    }
    const mouseOff=()=>{
        setpacmanclasses(prev=>{
            const newpacmanclasses=[...prev].filter((item)=>item!==Styles.pacmanA)
            return newpacmanclasses
        })
        setpacmanm(prev=>{
            const newpacmanm=[...prev].filter((item)=>item!==Styles.pacmanmouthA)
            return newpacmanm
        })
        setpara(prev=>{
            const newpara=[...prev].filter((item)=>item!==Styles.pA)
            return newpara
        })
    }

    function handleMouseUp(e){
        const targetId = value.itemTarget
        const targetPage = value.pageSelect

        const newData = value.data.map(page => {
            if(targetPage === page.name){
                return {
                    ...page,
                    listItem: page.listItem.filter(item => {
                        return item.id !== targetId
                    }),
                }
            }
            return page
        })

        value.setData(newData)
        console.log('trash end')

        value.setItemTarget(null)
        value.setIsDragging(false)
    }

    return (
            <div className={Styles.Trashcan} onMouseEnter={(e) => {setIsEnterTrash(true);mouseOver(e.clientX,e.clientY)}} onMouseLeave={(e) => {setIsEnterTrash(false);mouseOff()}} onMouseUp={handleMouseUp}>
                 <p className={clsx(para)}>Drag here to <br></br>delete</p>
                 <div className={clsx(pacmanclasses)} style={{transform: `translate(${position.x-230}px,${position.y-400}px)`,transitionDuration:'500ms'}}>
                    <div className={Styles.pacman_eye}></div>
                    <div className={clsx(pacmanm)}></div>
                 </div>
            </div>
    )
}
export default Trashcan