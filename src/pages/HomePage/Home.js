import Styles from './Home.module.css'
import card from '../../assets/cardimg.png'
import { useTranslation } from 'react-i18next'
import card2 from '../../assets/cardimg2.png'
import { NavLink } from 'react-router-dom'


function Smallcard({data})
{ 
    return (
        <div 
            className={Styles.smallcard}
            id={data.id}>
                <img
                    src={data.imgsrc}
                    style={data.style}
                    alt=''>
                </img>
        </div>
    )
}
function HomePageCard(){
    return (
        <div className={Styles.HomePageCard}>
            <div className={Styles.Bigcard}>
                <Smallcard
                  data={{
                    id:Styles.sm1,
                    imgsrc:card,
                    style:{width:'85%',height:'85%'}
                  }} 
                > 
                </Smallcard>
                <Smallcard
                  data={{
                    id:Styles.sm2,
                    imgsrc:card2,
                    style:{width:'85%',height:'85%'}
                  }}  
                ></Smallcard>
                <div id={Styles.sm3}></div>
            </div>
        </div>
    )
}
function Content(){
    const { t, i18n } = useTranslation();

    return (
        <div className={Styles.Content}>
            <div className={Styles.contentsec} id={Styles.section1}>
                <div>{t('th')} <span id={Styles.contentS}>{t('eas')} </span>{t('wtm')}</div>
                <div>{t('yp')}</div>
                <div>{t('iad')}</div></div>
            <div className={Styles.contentsec} id={Styles.section2}>
                <div>Store, fill and download your porfolio with our diversity templates.</div>
                <div>Impress recruiters and make your portfolio </div>
            </div>
            <div className={Styles.contentsec} id={Styles.section3}>
                <NavLink to="/work" className={Styles.trybtn}>{t('try')}</NavLink>
            </div>
        </div>
    )
}
function Home(){
    const { t, i18n } = useTranslation();
    return (
        <div className={Styles.homePage}>
            <Content></Content>
            <HomePageCard></HomePageCard>
        </div>
    )
}


export default Home