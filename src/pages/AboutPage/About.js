import styles from './AboutPage.module.css'
import { useState, useEffect } from 'react'
import images from '../../assets/images.png'

const cards=[{id:styles.profileimg,img:images,name:"Võ Nguyên Phú Quí",describe:"I like music and bacon.Learning new thing is my passion",linkcontact:"https://www.facebook.com/profile.php?id=100022928704167"},{id:styles.profileimg,img:images,name:"Trần Văn Hải",describe:"I like music and bacon.Learning new thing is my passion",linkcontact:"https://www.facebook.com/high.2.n"},{id:styles.profileimg,img:images,name:"Nguyễn Trọng Phúc",describe:"I like music and bacon.Learning new thing is my passion",linkcontact:"https://www.facebook.com/profile.php?id=100027308418139"}]
function Card({card})
{
   return (
            <div>
                <div className={styles.card}>
                 <div className={styles.profilecontainer}>
                    <div className={card.id}>
                        <img src={card.img} className={styles.img}></img>
                    </div>
                 </div>
                 <div className={styles.name}>
                    {card.name}
                 </div>
                 <div className={styles.content}>Developer</div>
                 <div className={styles.about}>About me</div>
                 <div className={styles.content}>
                   {card.describe}
                 </div>
                 <a href={card.linkcontact} className={styles.contactBtn}>
                    Contact me
                 </a>
                </div>
            </div>
        )
}
function About(){
    return(
        <div className={styles.AboutContainer}>
                {cards.map((card)=>{
                    return <Card card={card}></Card>
                })}
        </div>
    )
}

export default About