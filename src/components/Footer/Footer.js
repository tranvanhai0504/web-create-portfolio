import React from 'react'
import clublogo from '../../assets/iconFinal.png'
import style from './Footer.module.css'
import logo from '../../assets/logo.png'
import tdtulogo from '../../assets/Logo ĐH Tôn Đức Thắng-TDT.png'
import { IconContext } from "react-icons";

import { NavLink } from 'react-router-dom'
import {BsFacebook,BsTwitter,BsInstagram} from 'react-icons/bs'

export const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.section1}>
                <div className={style.logosec}>
                    <img src={tdtulogo} style={{width:'60px',paddingRight:'2%'}} alt='tdtu logo'></img>
                    <img src={clublogo} style={{width:'60px',paddingRight:'2%'}} alt='club logo'></img>
                    <img src={logo} style={{width:'40px',paddingRigth:'2%'}} alt='logo'></img>
                </div>
                <NavLink className={style.about} to={'pages/about'}>About</NavLink>
            </div>
            <div className={style.section2}>
                <p>© 2022 W4U All rights reserved.</p>
                <IconContext.Provider value={{size:'25px',style:{padding:'10px 0px 10px 15px'}}}>
                    <div className={style.iconsec}>
                        <BsFacebook ></BsFacebook>
                        <BsTwitter></BsTwitter>
                        <BsInstagram></BsInstagram>
                    </div>  
                </IconContext.Provider>
            </div>
        </footer>   
    );
}