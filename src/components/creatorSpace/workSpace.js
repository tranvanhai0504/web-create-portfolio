import { useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../../globalState/GlobalState'
import './style.css'
import Block from '../items/Block/Block'
import Text from '../items/Text/Text'
import ImgBox from '../items/ImgBox/ImgBox'
import Link from '../items/Link/Link'
import images from '../../assets/defaultAvatar.png'
import Button from '../items/Button/Button'

function WorkSpace({ listItem, page, dev = false, isPreviewNow = false }) {
    function getListItem() {
        const scWidth = 100 / document.documentElement.clientWidth
        const scHeight = 100 / document.documentElement.clientHeight

        if (isPreviewNow) {
            return listItem.map(item => {
                return {
                    ...item,
                    position: {
                        x: item.position.x / 75 * 100,
                        y: item.position.y / 75 * 100
                    }
                }
            })
        }
        if (isDev) return listItem
        else {
            return listItem.map(item => {
                return {
                    ...item,
                    position: {
                        x: item.position.x / 75 * 100 * scWidth + 'vw',
                        y: item.position.y / 75 * 100 * scHeight + 'vh'
                    }
                }
            })
        }
    }
    const value = useContext(GlobalContext)
    const [isDev, setIsDev] = useState(dev)
    const [listItemCurrent, setListItemCurrent] = useState(getListItem())

    useEffect(() => {
        if (!dev) {
            setIsDev(false)
        } else {
            setIsDev(true)
        }
    }, [dev])

    useEffect(() => {
        setListItemCurrent(getListItem())
    }, [isDev])

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
        let zIndex = 0
        listItemCurrent.forEach(item => {
            if (item.style.zIndex > zIndex) {
                zIndex = item.style.zIndex + 1
            }
        })
        let item = ''
        switch (value?.selectedBtn) {
            case 'block': {
                const id = makeid(10)
                item = {
                    type: 'block',
                    id,
                    style: {
                        borderRadius: 0,
                        color: {
                            type: 'solid',
                            code: 'red'
                        },
                        boxSizing: 'content-box',
                        border: 'unset',
                        borderColor: 'black',
                        borderType: '',
                        borderSize: 1,
                        unBorderLeft: false,
                        unBorderRight: false,
                        unBorderTop: false,
                        unBorderBottom: false,
                        width: 100,
                        height: 100,
                        shadow: 'none',
                        shadowX: 5,
                        shadowY: 5,
                        blur: 1,
                        shadowColor: 'black',
                        shadowInner: false,
                        zIndex: zIndex,
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
                        color: {
                            code: 'green'
                        },
                        fontWeight: 500,
                        fontFamily: '"Times New Roman"',
                        textItalic: false,
                        textUnderLine: false,
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        verticalAlign: 'text-bottom',
                        width: 100,
                        shadow: 'none',
                        shadowX: 5,
                        shadowY: 5,
                        blur: 1,
                        shadowColor: 'black',
                        height: 60,
                        zIndex: zIndex,
                        rotate: 0,
                        opacity: 1
                    },
                    position: { x: 0, y: 0 },
                    text: { text: 'text' }
                }
                break
            }
            case 'imgBlock': {
                const id = makeid(10)
                const src = `${value?.image.current || images}`
                console.log(src)
                item = {
                    type: 'img',
                    id,
                    style: {
                        width: 60,
                        height: 60,
                        borderRadius: 0,
                        border: 'solid 1px #ccc',
                        zIndex: zIndex,
                        boxSizing: 'content-box',
                        border: 'unset',
                        borderColor: 'black',
                        borderType: '',
                        borderSize: 1,
                        unBorderLeft: false,
                        unBorderRight: false,
                        unBorderTop: false,
                        unBorderBottom: false,
                        shadow: 'none',
                        shadowX: 5,
                        shadowY: 5,
                        blur: 1,
                        shadowColor: 'black',
                        rotate: 0,
                        opacity: 1
                    },
                    position: { x: 0, y: 0 },
                    source: { src: src }
                }
                break
            }
            case 'link': {
                const id = makeid(10)
                item = {
                    type: 'link',
                    id,
                    style: {
                        fontSize: 24,
                        color: {
                            code: 'blue'
                        },
                        fontWeight: 500,
                        fontFamily: '"Times New Roman"',
                        textItalic: true,
                        textUnderLine: true,
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        verticalAlign: 'text-bottom',
                        width: 100,
                        shadow: 'none',
                        shadowX: 5,
                        shadowY: 5,
                        blur: 1,
                        shadowColor: 'black',
                        height: 60,
                        zIndex: zIndex,
                        rotate: 0,
                        opacity: 1
                    },
                    position: { x: 0, y: 0 },
                    text: { text: 'link' },
                    href: { href: 'http://www.google.com' }
                }
                break
            }
            default: {

            }
        }
        if (item !== '' && value?.selectedBtn != null) {
            handleListItem(item)
            page.current.removeEventListener('click', handleEvent)
            value?.handleClick(null)
        }
    }

    useEffect(() => {
        if (page || value?.selectedBtn !== null) {
            ProduceItems(value?.selectedBtn)
        }

        return () => {
            page.current?.removeEventListener('click', handleEvent)
        }
    }, [value?.selectedBtn])

    useEffect(() => {
        setListItemCurrent(listItem)
    }, [listItem])

    return <>
        {listItemCurrent.map(item => {
            if (item.type === 'block') {
                return (<Block dev={isDev} key={item.id} position={item.position} style={item.style} id={item.id} />)
            } else if (item.type === 'text') {
                return (<Text dev={isDev} key={item.id} text={item.text} position={item.position} style={item.style} id={item.id} />)
            } else if (item.type === 'img') {
                return (<ImgBox dev={isDev} key={item.id} src={item.source.src} position={item.position} style={item.style} id={item.id} />)
            } else if (item.type === 'link') {
                return (<Link dev={isDev} key={item.id} href={item.href} text={item.text} position={item.position} style={item.style} id={item.id} />)
            } else if (item.type === 'button') {
                return (<Button dev={isDev} key={item.id} position={item.position} style={item.style} id={item.id} name={item.name} href={item.direct} />)
            }
        })}
    </>
}

export default WorkSpace