// HOME COMPONENT //

import { Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import Products from './Products';
import About from './About';
import Nav from './Nav';

const Home = ({itemsForDisplay}) => {
  return (
    <>
      <Nav />
      <Landing />
      <Products itemsForDisplay={itemsForDisplay} />
      <About /> 
    </>
  )
  
}

export default Home;