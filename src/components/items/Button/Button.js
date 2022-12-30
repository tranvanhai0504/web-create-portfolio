import styled from 'styled-components'
import Draggable from 'react-draggable';
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import { memo, useState, useEffect, useContext } from 'react'
import clsx from 'clsx'

function availableValue(value) {
    if ((typeof value) === 'number') {
        return value + 'px'
    } else {
        return value
    }
}

const ButtonComp = styled.a.attrs((props) => {
    if (props.href) {
        return {
            href: props.href
        }
    }
})`
    border: ${props => { return props.style.border === 'unset' ? props.style.border : `${props.style.borderType} ${props.style.borderSize}px ${props.style.borderColor} !important` }};
    ${props => {
        let string = ''
        if (props.style.unBorderLeft) {
            string += 'border-left: unset !important;'
        }
        if (props.style.unBorderRight) {
            string += 'border-right: unset !important;'
        }
        if (props.style.unBorderTop) {
            string += 'border-top: unset !important;'
        }
        if (props.style.unBorderBottom) {
            string += 'border-bottom: unset !important;'
        }
        return string
    }}
    color: ${props => props.style.fontColor};
    font-size: ${props => props.style.fontSize};
    font-weight: ${props => props.style.fontWeight};
    font-family: ${props => props.style.fontFamily};
    text-align: ${props => props.style.textAlign};
    display: ${props => props.style.display};
    align-items: normal;
    flex-direction: column;
    ${props => {
        let string = ''
        if (props.style.textUnderLine) {
            string += 'text-decoration: underline;'
        }
        if (props.style.textItalic) {
            string += 'font-style: italic;'
        }
        return string
    }}
    justify-content: ${props => props.style.justifyContent};
    box-shadow: ${props => { return (props.style.shadow === 'none' || props.style.shadow === 'blurBG') ? props.style.shadow : `${availableValue(props.style.shadowX)} ${availableValue(props.style.shadowY)} ${props.style.blur}px ${props.style.shadowColor} ${props.style.shadowInner ? 'inset' : ''}  !important` }};
    box-sizing: ${props => props.style.boxSizing};
    border-radius: ${props => props.style.borderRadius}%;
    background: ${props => props.style.color.code};
    width: ${props => availableValue(props.style.width)};
    height: ${props => availableValue(props.style.height)};
    transform: rotate(${props => props.style.rotate}deg);
    backdrop-filter: blur(${props => props.style.blur}px);
    opacity: ${props => props.style.opacity};
  `

function Button({ style, id, position, name, dev = false, href }) {

    function getStyle() {
        const scWidth = 100 / document.documentElement.clientWidth
        const scHeight = 100 / document.documentElement.clientHeight

        if (dev) {
            return {
                ...style,
                height: style.height * 0.75,
                width: style.width * 0.75,
                shadowX: style.shadowX * 0.75,
                fontSize: style.fontSize * 0.75,
                blur: style.blur * 0.75,
                shadowY: style.shadowY * 0.75,
                borderRadius: style.borderRadius * 0.75
            }
        } else {
            return {
                ...style,
                height: style.height * scHeight + 'vh',
                width: style.width * scWidth + 'vw',
                shadowX: style.shadowX * scWidth + 'vw',
                shadowY: style.shadowY * scHeight + 'vh',
            }
        }
    }

    const value = useContext(MSWContext)
    const [nowPosition, setNowPosition] = useState(position)
    const [isDev, setIsDev] = useState(dev)
    const [prevPosition, setPrevPosition] = useState(position)
    const [styleNow, setStyleNow] = useState(getStyle())
    const [nowTarget, setNowTarget] = useState(value?.itemTarget)
    const [isHover, setIsHover] = useState(false)

    const PositionHandle = (data) => {
        position.x = data.x
        position.y = data.y
        setNowPosition({ x: data.x, y: data.y })
    }

    useEffect(() => {
        setNowTarget(value?.itemTarget)
    }, [value?.itemTarget])

    useEffect(() => {
        setStyleNow(() => {
            if (dev) {
                return {
                    ...style,
                    height: style.height * 0.75,
                    width: style.width * 0.75,
                    fontSize: style.fontSize * 0.75,
                    blur: style.blur * 0.75,
                    borderRadius: style.borderRadius * 0.75,
                    shadowX: style.shadowX * 0.75,
                    shadowY: style.shadowY * 0.75,
                }
            } else {
                return style
            }
        })
    }, [style, style.color, style.fontColor])

    useEffect(() => {
        setNowPosition({ x: position.x, y: position.y })
    }, [position, isDev])

    useEffect(() => {
        if (!dev) {
            setIsDev(false)
        } else {
            setIsDev(true)
        }
    }, [dev])

    useEffect(() => {
        setStyleNow(getStyle())
    }, [isDev])

    useEffect(() => {
        if (value?.itemHover === id) {
            setIsHover(true)
        } else {
            setIsHover(false)
        }
    }, [value?.itemHover])

    useEffect(() => {
        console.log(prevPosition)
        position.x = prevPosition.x
        position.y = prevPosition.y
        setNowPosition(JSON.parse(JSON.stringify(prevPosition)))
    }, [value?.isCancelDelete])

    function draggingStart(e) {
        setPrevPosition(nowPosition)
        value?.setIsDragging(true);
    }

    function draggingEnd(e) {
        value?.setIsDragging(false);
        value?.forceUpdate()
    }

    function HandleEventItem(e) {
        if (!value?.listLockedItem.includes(id) && dev) {
            value?.setItemTarget(id)
            setNowTarget(id)
        }
    }
    return (
        <Draggable onStop={draggingEnd} onStart={draggingStart} disabled={!(nowTarget === id)} defaultPosition={{ x: 0, y: 0 }} position={{ x: nowPosition.x, y: nowPosition.y }} onDrag={(e, data) => PositionHandle(data)}>
            <div type={id} key={id} onClick={HandleEventItem} style={{ position: 'absolute', height: 'fit-content', zIndex: style.zIndex }} className={clsx(nowTarget === id && 'target', isHover && 'hover')}>
                <ButtonComp style={styleNow} href={!dev && `./${href}.html`}>{name}</ButtonComp>
            </div>
        </Draggable>
    )
}

export default memo(Button)