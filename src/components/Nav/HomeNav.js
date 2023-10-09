// HOMENAV COMPONENT //

import { Link } from "react-router-dom";

const HomeNav = () => {
  return (
    <Link to='/'>
      <img src={require('../../images/home.png')} alt="home icon" className="nav__burger"/>
    </Link>
  )
}

export default HomeNav;