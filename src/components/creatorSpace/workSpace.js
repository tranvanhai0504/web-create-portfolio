import { useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../../globalState/GlobalState'
import './style.css'
import Block from '../items/Block/Block'
import Text from '../items/Text/Text'
import ImgBox from '../items/ImgBox/ImgBox'
import images from '../../assets/defaultAvatar.png'
function WorkSpace({ listItem, page }) {
    const value = useContext(GlobalContext)
    const [listItemCurrent, setListItemCurrent] = useState(listItem)

    function handleListItem(item) {
        listItem.push(item)
    }

    function ProduceItems(value) {
        if (value !== null) {
            page.current.addEventListener('click', handleEvent)
        }
    }

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function handleEvent(e) {
        let item = ''
        switch (value.selectedBtn) {
            case 'block': {
                const id = makeid(10)
                item = {
                    type: 'block',
                    id,
                    style: {
                        borderRadius: 0,
                        backgroundColor: 'red',
                        border: 'unset',
                        width: 100,
                        height: 100,
                        zIndex: 3,
                        rotate: 0,
                        opacity: 1
                    },
                    position: { x: 0, y: 0 }
                }
                break
            }
            case 'text': {
                const id = makeid(10)
                item = {
                    type: 'text',
                    id,
                    style: {
                        fontSize: 24,
                        color: 'green',
                        fontWeight: 500,
                        display: 'inline-block',
                        width: 100,
                        height: 60,
                        zIndex: 1,
                        rotate: 0,
                        opacity: 1
                    },
                    position: { x: 0, y: 0 },
                    text: { text: 'hello' }
                }
                break
            }
            case 'imgBlock': {
                const id = makeid(10)
                const src = `${value.image.current || images}`
                item = {
                    type: 'img',
                    id,
                    style: {
                        width: 60,
                        height: 60,
                        borderRadius: 0,
                        border: 'solid 1px #ccc',
                        zIndex: 1,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        rotate: 0,
                        opacity: 1
                    },
                    position: { x: 0, y: 0 },
                    source: { src: src }
                }
                break
            }
            default: {

            }
        }
        if (item !== '' && value.selectedBtn != null) {
            handleListItem(item)
            page.current.removeEventListener('click', handleEvent)
            value.handleClick(null)
        }
    }

    useEffect(() => {
        if (page || value.selectedBtn !== null) {
            ProduceItems(value.selectedBtn)
        }

        return () => {
            page.current?.removeEventListener('click', handleEvent)
        }
    }, [value.selectedBtn])

    useEffect(() => {
        setListItemCurrent(listItem)
    }, [listItem])

    useEffect(() => {
        
    }, [listItemCurrent])

    return <>
        {listItemCurrent.map(item => {
            if (item.type === 'block') {
                return (<Block position={item.position} style={item.style} id={item.id} />)
            } else if (item.type === 'text') {
                return (<Text text={item.text} position={item.position} style={item.style} id={item.id} />)
            } else if (item.type === 'img') {
                return (<ImgBox src={item.source.src} text={item.text} position={item.position} style={item.style} id={item.id} />)
            }
        })}
    </>
}

export default WorkSpace