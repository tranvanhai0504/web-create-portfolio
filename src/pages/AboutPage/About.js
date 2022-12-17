import styles from './AboutPage.module.css'
import images from '../../assets/images.png'

const cards = [
    {
        id: styles.profileimg,
        img: images,
        name: "Võ Nguyên Phú Quí",
        describe: "I like music and bacon.Learning new thing is my passion",
        linkcontact: "https://www.facebook.com/profile.php?id=100022928704167"
    },
    {
        id: styles.profileimg2,
        img: images,
        name: "Trần Văn Hải",
        describe: "I like music and bacon.Learning new thing is my passion",
        linkcontact: "https://www.facebook.com/high.2.n"
    },
    {
        id: styles.profileimg3,
        img: images,
        name: "Nguyễn Trọng Phúc",
        describe: "I like music and bacon.Learning new thing is my passion",
        linkcontact: "https://www.facebook.com/profile.php?id=100027308418139"
    }
]

function Card({ card }) {
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
            <div className={styles.content}>Developer</div>
            <div className={styles.about}>About me</div>
            <div className={styles.Aboutcontent}>
                {card.describe}
            </div>
            <a target="_blank" rel="noopener noreferrer" href={card.linkcontact} className={styles.contactBtn}>
                Contact me
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