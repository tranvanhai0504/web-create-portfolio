import { Routes, Route } from 'react-router-dom'
import Header from "../../components/Header/Header";
import HomePage from "../HomePage/Home";
import AboutPage from "../AboutPage/About";
import StoragePage from "../StoragePage/Storage";
import TemplatesPage from "../TemplatesPage/Templates";

function MainPage(){
    return (
        <div className="MainPage">
        <Header></Header>
        <div className="MainContent">
          <Routes>
            <Route path="/pages/home" element={<HomePage />}></Route>
            <Route path="/pages/storage" element={<StoragePage />}></Route>
            <Route path="/pages/about" element={<AboutPage />}></Route>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </div>
      </div>
    )
}

export default MainPage