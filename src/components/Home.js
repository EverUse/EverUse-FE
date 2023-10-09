// HOME COMPONENT //
  // eslint-disable-next-line no-unused-vars

import Landing from './Landing';
import Products from './Products';
import About from './About';
import Nav from './Nav/Nav';
import LoadSpinner from './LoadSpinner';
import { useQuery } from '@apollo/client';
import { GET_ALL_ITEMS } from '../api';
import { useEffect, useState } from 'react';

const Home = ({itemsForDisplay, setItems}) => {
  const { loading, error, data } = useQuery(GET_ALL_ITEMS);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (error) {  
      setErrorMessage(`${error.message} - Please try again later`);
      console.log(error)
    }
    if (!itemsForDisplay.length && !loading && !error) {
      setItems(data.products);
    }
  }, [data, itemsForDisplay.length, loading, error, setItems]);

  return (
    <main>
      {loading && <>
        <LoadSpinner />
      </>}
      
      {!loading && <>
      <Nav open={open} setOpen={setOpen}/>
      <Landing setOpen={setOpen}/>
      <Products setOpen={setOpen} itemsForDisplay={itemsForDisplay} errorMessage={errorMessage}/>
      <About setOpen={setOpen}/>
      </>}
    </main>
  )
};

export default Home;