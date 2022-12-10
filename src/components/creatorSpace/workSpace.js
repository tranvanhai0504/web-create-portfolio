import styles from './CreatorSpace.module.css'
import clsx from 'clsx'
import {useEffect, useState, useRef, useContext} from 'react'
import { GlobalContext } from '../../globalState/GlobalState'
import { MSWContext } from '../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import './style.css'
import Block from '../items/Block/Block'
import Text from '../items/Text/Text'
import ImgBox from '../items/ImgBox/ImgBox'
import images from '../../assets/defaultAvatar.png'
function WorkSpace({listItem}) {
    const value = useContext(GlobalContext)
    const MSWValue = useContext(MSWContext)
    const [listItemStore, setListItemStore] = useState(listItem)

    function handleListItem(item) {
        listItem.push(item)
        setListItemStore(prev=>{
            return [...prev, item]})
    }

    let boxsQuery = document.querySelector('.workSpace')

    function ProduceItems() {
        boxsQuery.removeEventListener('click',handleEvent, true)     
        boxsQuery.addEventListener('click',handleEvent, true)     
    }
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function handleEvent(e) {
        let item = ''
        switch(value.selectedBtn){
            case 'block' : {
                const id = makeid(10)
                item = {
                    id,
                    style: {borderRadius: '5px',
                    backgroundColor: 'red',
                    border: 'solid 1px #ccc',
                    width: '100px',
                    height: '100px',
                    zIndex: 1,
                    transform: '0deg'},
                    component(){return (<Block position={this.position} style={this.style} id= {this.id}/>)},
                    position: {x: 0, y: 0}
                }
                break
            }
            case 'text': {
                const id = makeid(10)
                item = {
                    id,
                    style: {fontSize: '24px',
                        color: 'green',
                        fontWeight: '500',
                        display: 'inline-block',
                        border: 'solid 1px #ccc',
                        width: '100px',
                        height: '60px',
                        zIndex: 1,
                        transform: 'rotate(0deg)'
                    },
                    component(){return (<Text text={this.text} position={this.position} style={this.style} id= {this.id}/>)},
                    position: {x: 0, y: 0},
                    text: {text: 'hello'}
                }
                break
            }
            case 'imgBlock': {
                    const id = makeid(10)
                    const src = `${value.image.current||images}`
                    item = {
                        id,
                        _this: this,
                        style: {
                            width: '60px',
                            height: '60px',
                            borderRadius: '4px',
                            border: 'solid 1px #ccc',
                            zIndex: 1,
                            backgroundImage: `url(${src})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            transform: 'rotate(0deg)',
                        },
                        component(){return (<ImgBox text={this.text} position={this.position} style={this.style} id= {this.id}/>)},
                        position: {x: 0, y: 0},
                        text: {text: 'hello'},
                        source: {src: src}
                    }
                break
            }
            default: {

            }
        }
        if(item!='' && value.selectedBtn!=null){
            handleListItem(item)
            // console.log('push to list:', ReactDOMServer.renderToStaticMarkup(item))
            boxsQuery.removeEventListener('click', handleEvent, true)
            value.handleClick(null)
        }
        console.log(item)
    }

    useEffect(()=> {
        boxsQuery = document.querySelector('.workSpace')
        if(boxsQuery) ProduceItems()
        // if(listItemStore) HandleEventItem()
    }, [value.selectedBtn])

    console.log(listItemStore[0]?.position)
    return <>
        {listItemStore.map(item => {
            return item.component()
        })}
        </>
}

export default WorkSpace