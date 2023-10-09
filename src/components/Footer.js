// FOOTER COMPONENT //

import logo from '../images/logo-white.png'
import instagram from '../images/1024px-Instagram_icon.png'
import '../styles/_Footer.scss'

const Footer = () => {
  return ( 
    <div className='footer'>
      <img src={logo} alt="EverUse logo in white, curvy text" className='footer__logo' /> 
      <p className='footer__text'>© 2023 EverUse Upcycled Products</p>
      <a href='https://www.instagram.com/everuseproducts/?hl=en'><img className='footer__instagram' src={instagram} alt='instagram '/></a> 
    </div>
  )
}

export default Footer;