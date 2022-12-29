import styles from './AboutPage.module.css'
import images from '../../assets/images.png'
import { useTranslation } from 'react-i18next'

const cards = [
    {
        id: styles.profileimg,
        img: images,
        name: "Võ Nguyên Phú Quí",
        linkcontact: "https://www.facebook.com/profile.php?id=100022928704167"
    },
    {
        id: styles.profileimg2,
        img: images,
        name: "Trần Văn Hải",
        linkcontact: "https://www.facebook.com/high.2.n"
    },
    {
        id: styles.profileimg3,
        img: images,
        name: "Nguyễn Trọng Phúc",
        linkcontact: "https://www.facebook.com/profile.php?id=100027308418139"
    }
]

function Card({ card }) {
    const {t,i18n} = useTranslation()
    return (
        <div className={styles.card}>
            <div className={styles.profilecontainer}>
                <div className={card.id}>
                    <img src={card.img} className={styles.img} alt=""></img>
                </div>
            </div>
            <div className={styles.name}>
                {card.name}
            </div>
            <div className={styles.content}>{t('Student')}</div>
            <div className={styles.about}>{t('About me')}</div>
            <div className={styles.Aboutcontent}>
                {t('card describe')}
            </div>
            <a target="_blank" rel="noopener noreferrer" href={card.linkcontact} className={styles.contactBtn}>
                 {t('Contact me')}
            </a>
        </div>
    )
}
function About() {
    return (
        <div className={styles.AboutContainer}>
            {cards.map((card,index) => {
                return <Card key={index} card={card}></Card>
            })}
        </div>
    )
}

export default About