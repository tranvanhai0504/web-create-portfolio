import { GlobalContext } from "./globalState/GlobalState";
import { useContext } from 'react'
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/Home.js";
import AboutPage from "./pages/AboutPage/About.js";
import StoragePage from "./pages/StoragePage/Storage.js";
import TemplatesPage from "./pages/TemplatesPage/Templates.js";
import MainScreenWork from "./pages/MainScreenWorkPage/MainScreenWork.js";

function App() {

  const value = useContext(GlobalContext)
  
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
