import React from 'react'
import Image from 'next/image';
import {RiSendPlaneFill} from 'react-icons/ri';
import {TiSocialTwitter, TiSocialFacebook, TiSocialLinkedin, TiSocialInstagram} from 'react-icons/ti';
import Style from './style/Footer.module.css';
import Footerlogo from 'Images/Footerlogo.jpg';

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <Image src={Footerlogo} alt="logo" height={100} width={100}/>
      </div>
      <div className={Style.footer_box}>
        <div className={Style.footer_input}>
        <input type="email" placeholder='Email'/>
        <RiSendPlaneFill/>
        </div>
      </div>
      <div className={Style.footer_box}>
        <div className={Style.footer_social}>
          <TiSocialTwitter/>
          <TiSocialFacebook/>
          <TiSocialLinkedin/>
          <TiSocialInstagram/>
        </div>
      </div>
    </div>
  )
}

export default Footer
