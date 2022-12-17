import React from 'react'
import logo from '../../assets/iconFinal.png'

export const Footer = () => {
    return (
        <footer style={{
            paddingTop: "3%",
            marginLeft:"-3%"
        }} >
            <div style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
            }}>
                <img style={{paddingRight:"2.5%"}} src={logo} alt="ICON Academic Club" width="110" height="65" /> 
                <span >W4U</span>
            </div>
        </footer>   
    );
}