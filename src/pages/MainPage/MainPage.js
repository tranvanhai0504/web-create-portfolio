import { Routes, Route } from 'react-router-dom'
import Header from "../../components/Header/Header";
import HomePage from "../HomePage/Home";
import AboutPage from "../AboutPage/About";
import StoragePage from "../StoragePage/Storage";
import Styles from './MainPage.module.css'
import { Footer } from '../../components/Footer/Footer';

function MainPage(){
    return (
        <div className={Styles.mainPage}>
        <Header></Header>
        <div className={Styles.content}>
          <Routes>
            <Route path="/pages/home" element={<HomePage />}></Route>
            <Route path="/pages/storage" element={<StoragePage />}></Route>
            <Route path="/pages/about" element={<AboutPage />}></Route>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
          <Footer></Footer>

        </div>
      </div>
    )
}

export default MainPage