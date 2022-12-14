import styles from './CreatorSpace.module.css'
import clsx from 'clsx'
import { useEffect, useState, useRef, useContext } from 'react'
import { GlobalContext } from '../../globalState/GlobalState'
import { MSWContext } from '../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import './style.css'
import Block from '../items/Block/Block'
import Text from '../items/Text/Text'
import ImgBox from '../items/ImgBox/ImgBox'
import images from '../../assets/defaultAvatar.png'
function WorkSpace({ listItem, page }) {
    const value = useContext(GlobalContext)
    const dataValue = useContext(MSWContext)
    const [listItemCurrent, setListItemCurrent] = useState(listItem)

    function handleListItem(item) {
        listItem.push(item)
    }

    function ProduceItems() {
        page.current.addEventListener('click', handleEvent, true)
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
                    id,
                    style: {
                        borderRadius: 5,
                        backgroundColor: 'red',
                        border: 'unset',
                        width: 100,
                        height: 100,
                        zIndex: 3,
                        rotate: 0
                    },
                    component() { return (<Block position={this.position} style={this.style} id={this.id} />) },
                    position: { x: 0, y: 0 }
                }
                break
            }
            case 'text': {
                const id = makeid(10)
                item = {
                    id,
                    style: {
                        fontSize: '24px',
                        color: 'green',
                        fontWeight: '500',
                        display: 'inline-block',
                        border: 'solid 1px #ccc',
                        width: '100px',
                        height: '60px',
                        zIndex: 1,
                        transform: 'rotate(0deg)'
                    },
                    component() { return (<Text text={this.text} position={this.position} style={this.style} id={this.id} />) },
                    position: { x: 0, y: 0 },
                    text: { text: 'hello' }
                }
                break
            }
            case 'imgBlock': {
                const id = makeid(10)
                const src = `${value.image.current || images}`
                item = {
                    id,
                    _this: this,
                    style: {
                        width: '60px',
                        height: '60px',
                        borderRadius: '4px',
                        border: 'solid 1px #ccc',
                        zIndex: 1,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        transform: 'rotate(0deg)',
                    },
                    component() { return (<ImgBox src={src} text={this.text} position={this.position} style={this.style} id={this.id} />) },
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
            page.current.removeEventListener('click', handleEvent, true)
            value.handleClick(null)
        }
    }

    useEffect(() => {
        if (page) ProduceItems()
    }, [value.selectedBtn])

    useEffect(() => {
        console.log(dataValue.data)
        const namePage = page.current.getAttribute('data-name')
        if (namePage) {
            setListItemCurrent((prev, page) => {
                const pageCurrent = dataValue.data.filter(pageElement => {
                    return namePage === pageElement.name
                })
                return pageCurrent[0].listItem
            })
        }

    }, [dataValue.data])

    return <>
        {listItemCurrent.map(item => {
            return item.component()
        })}
    </>
}

export default WorkSpace