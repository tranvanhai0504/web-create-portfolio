import styled from 'styled-components'
import Draggable from 'react-draggable';
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import { memo, useState, useEffect, useContext } from 'react'
import clsx from 'clsx'

const ButtonComp = styled.button.attrs((props) => {

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
    box-shadow: ${props => { return (props.style.shadow === 'none' || props.style.shadow === 'blurBG') ? props.style.shadow : `${props.style.shadowX}px ${props.style.shadowY}px ${props.style.blur}px ${props.style.shadowColor} ${props.style.shadowInner ? 'inset' : ''}  !important` }};
    box-sizing: ${props => props.style.boxSizing};
    border-radius: ${props => props.style.borderRadius}%;
    background: ${props => props.style.color.code};
    width: ${props => props.style.width}px;
    height: ${props => props.style.height}px;
    transform: rotate(${props => props.style.rotate}deg);
    backdrop-filter: blur(${props => props.style.blur}px);
    opacity: ${props => props.style.opacity};
    word-wrap: break-word;
  `

function Button({ style, id, position, name }) {

    const value = useContext(MSWContext)
    const [nowPosition, setNowPosition] = useState(position)
    const [nowTarget, setNowTarget] = useState(value.itemTarget)

    const PositionHandle = (data) => {
        position.x = data.x
        position.y = data.y
        setNowPosition({ x: data.x, y: data.y })
    }

    useEffect(() => {
        setNowTarget(value.itemTarget)
    }, [value.itemTarget])

    useEffect(() => {
        setNowPosition({ x: position.x, y: position.y })
    }, [position])

    function draggingStart(e) {
        value.setIsDragging(true);
    }

    function draggingEnd(e) {
        value.setIsDragging(false);
        value.forceUpdate()
    }

    function HandleEventItem(e) {
        value.setItemTarget(id)
        setNowTarget(id)
    }
    return (
        <Draggable onStop={draggingEnd} onStart={draggingStart} disabled={!(nowTarget === id)} defaultPosition={{ x: 0, y: 0 }} position={{ x: nowPosition.x, y: nowPosition.y }} onDrag={(e, data) => PositionHandle(data)}>
            <div type={id} key={id} onClick={HandleEventItem} style={{ position: 'absolute', height: 'fit-content', zIndex: style.zIndex }} className={clsx(nowTarget === id && 'target')}>
                <ButtonComp style={style}>{name}</ButtonComp>
            </div>
        </Draggable>
    )
}

export default memo(Button)