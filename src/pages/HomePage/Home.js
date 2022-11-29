import Styles from './Home.module.css'
import { useTranslation } from 'react-i18next';
function Home(){
    const { t, i18n } = useTranslation();
    return (
        <div className={Styles.homePage}>
            {t('Home')}
        </div>
    )
}

export default Home