import Styles from './Trashcan.module.css'
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import { useContext } from 'react'
import { useState } from 'react';
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import ImgBox from '../../items/ImgBox/ImgBox';
function Trashcan({setIsEnterTrash, setModalOn}) {
    const { t, i18n } = useTranslation();
    const value = useContext(MSWContext)
    const [pacmanclasses, setpacmanclasses] = useState([Styles.pacman])
    const [pacmanm, setpacmanm] = useState([Styles.pacmanmouth])
    const [para, setpara] = useState([Styles.para])
    const [position, setposition] = useState({ x: 240, y: 400 })

    const mouseOver = (x, y) => {
        setposition({ x: x, y: y })
        setpacmanclasses(prev => {
            const newpacmanclasses = [...prev, Styles.pacmanA]
            return newpacmanclasses
        })
        setpacmanm(prev => {
            const newpacmanm = [...prev, Styles.pacmanmouthA]
            return newpacmanm
        })
        setpara(prev => {
            const newpara = [...prev, Styles.pA]
            return newpara
        })
    }
    const mouseOff = () => {
        setpacmanclasses(prev => {
            const newpacmanclasses = [...prev].filter((item) => item !== Styles.pacmanA)
            return newpacmanclasses
        })
        setpacmanm(prev => {
            const newpacmanm = [...prev].filter((item) => item !== Styles.pacmanmouthA)
            return newpacmanm
        })
        setpara(prev => {
            const newpara = [...prev].filter((item) => item !== Styles.pA)
            return newpara
        })
    }

    function handleMouseUp(e) {
        const targetId = value.itemTarget
        const targetPage = value.pageSelect
        let typeItem
        value.data.forEach((page) => {
            if (targetPage === page.id) {
                page.listItem.forEach(item => {
                    if (item.id === targetId) {
                        typeItem = item.type
                    }
                })
            }
        })

        if (typeItem === 'button') {
            setModalOn(true)
            value.setIsCancelDelete(new Array([]))
        } else {
            const newData = value.data.map(page => {
                if (targetPage === page.id) {
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
            value.setItemTarget(null)
            value.setIsDragging(false)
        }

    }

    return (
            <div className={Styles.Trashcan} onMouseEnter={(e) => {setIsEnterTrash(true);mouseOver(e.clientX,e.clientY)}} onMouseLeave={(e) => {setIsEnterTrash(false);mouseOff()}} onMouseUp={handleMouseUp}>
                 <p className={clsx(para)}>{t('Drag here to')}</p>
                 <div className={clsx(pacmanclasses)} style={{transform: `translate(${position.x-230}px,${position.y-400}px)`,transitionDuration:'500ms'}}>
                    <div className={Styles.pacman_eye}></div>
                    <div className={clsx(pacmanm)}></div>
                 </div>
            </div>
    )
}
export default Trashcan