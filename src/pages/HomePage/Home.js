import Styles from './Home.module.css'
import card from '../../assets/cardHighP.png'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GlobalContext } from '../../globalState/GlobalState'
import { useContext } from 'react'
import makeid from '../../utils/makeid'
import clsx from 'clsx'
import { Footer } from '../../components/Footer/Footer'

function Smallcard({ data }) {
    const [classes, setClasses] = useState(data.id)
    const mouseOver = () => {
        setClasses(prev => {
            const newClasses = [...prev, data.oA].filter((items) => items !== data.oO)
            return newClasses
        })
    }
    const mouseOff = () => {
        setClasses(prev => {
            const newClasses = [...prev, data.oO].filter((items) => items !== data.oA)
            return newClasses
        })
    }
    return (
        <div
            onMouseOver={mouseOver}
            onMouseLeave={mouseOff}
            className={clsx(classes)}>
            <img
                src={data.imgsrc}
                className={data.style}
                alt=''>
            </img>
        </div>
    )
}
function HomePageCard() {
    const [classes3, setClasses3] = useState([Styles.sm3])
    const mouseOver = () => {
        setClasses3(prev => {
            const newClasses = [...prev, Styles.sm3a].filter((items) => items !== Styles.sm3o)
            return newClasses
        })
    }
    const mouseOff = () => {
        setClasses3(prev => {
            const newClasses = [...prev, Styles.sm3o].filter((items) => items !== Styles.sm3a)
            return newClasses
        })
    }

    return (
        <div className={Styles.HomePageCard}>
            <div className={Styles.Bigcard}>
                <Smallcard
                    data={{
                        id: [Styles.sm1, Styles.smallcard],
                        oA: Styles.sm1a,
                        oO: Styles.sm1o,
                        imgsrc: card,
                        style: Styles.imgstyle1
                    }}
                >
                </Smallcard>
                <Smallcard
                    data={{
                        id: [Styles.sm2, Styles.smallcard],
                        oA: Styles.sm2a,
                        oO: Styles.sm2o,
                        imgsrc: card,
                        style: Styles.imgstyle2
                    }}
                ></Smallcard>
                <div className={clsx(classes3)} onMouseOver={mouseOver} onMouseLeave={mouseOff}></div>
            </div>
        </div>
    )
}
function Content() {
    const { t, i18n } = useTranslation();
    const value = useContext(GlobalContext)

    function handleClick(e) {

        const produce = {
            name: 'new produce',
            id: makeid(10),
            listPage: [{
                name: 'mainPage',
                id: makeid(10),
                style: {
                    height: 1,
                    width: 1,
                    color: {
                        type: 'solid',
                        code: '#fff'
                    }
                },
                listItem: [],
            }]
        }

        value.setProduces(prev => [...prev, produce])
        value.setProduceSelect(produce.id)
    }

    return (
        <div className={Styles.Content}>
            <div className={Styles.contentsec} id={Styles.section1}>
                <p>{t('th')} <span id={Styles.contentS}>{t('eas')} </span>{t('wtm')}</p>
                <p>{t('yp')}</p>
                <p>{t('iad')}</p></div>
            <div className={Styles.contentsec} id={Styles.section2}>
                <p>{t('Sigdes1')}</p>
                <p>{t('Sigdes2')}</p>
            </div>
            <div className={Styles.contentsec} id={Styles.section3}>
                <p>{t('fth')}</p>
                <NavLink onClick={handleClick} to="/work" className={Styles.trybtn}>{t('try')}</NavLink>
            </div>
            <Footer></Footer>
        </div>
    )
}
function Home() {
    const { t, i18n } = useTranslation();
    return (
        <div className={Styles.homePage}>
            <Content></Content>
            <HomePageCard></HomePageCard>
        </div>
    )
}


export default Home