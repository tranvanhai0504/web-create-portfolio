import { useRouteError } from "react-router-dom";
import Styles from './ErrorPage.module.css'
import image from '../../assets/Illu404 (1).png'
import curve from '../../assets/Shape-background (2).png'
import textimg from '../../assets/Text (1).png'
import { NavLink } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className={Styles.errorpage}>
      <div className={Styles.body}>
        <div className={Styles.section1}>
          <img src={textimg} alt='' style={{width:'110%',margin:'-5% 0 0 35%',paddingBottom:'15%'}}></img>
          <NavLink className={Styles.btn} to="/">Back to home</NavLink>
        </div>
        <img src={image} alt='' style={{width:'35%',margin:'0 0 0 15%'}}></img>
      </div>
      <img src={curve} alt='' style={{width:'22%',height:'90%',position:"absolute",left:'0',bottom:'0'}}></img>
    </div>
  );
}