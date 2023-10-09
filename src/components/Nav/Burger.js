// BURGER COMPONENT //

const Burger = ({ openNav }) => {
  return (
    <img src={require('../../images/hamburger-menu2.png')} alt="hamburger menu icon" className="nav__burger" onClick={openNav}/>
  );
}

export default Burger;