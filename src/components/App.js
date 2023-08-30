// APP COMPONENT //

/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@apollo/client';
import { GET_ALL_ITEMS } from '../api';
import { Route, Routes, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Checkout from './Checkout';
import '../styles/_App.scss'
import ShoppingBag from './ShoppingBag';
import Home from './Home';
import ProductDetail from './ProductDetail/ProductDetail';
import { cleanFetchedData } from '../helperFunctions';

function App() {
  const [shoppingBag, setShoppingBag] = useState(
    [
      {
        id: 1,  
        type: "bracelet",
        color: "moss",
        size: 'M',
        quantity: 2,
        price: 10.00,
        image: 'https://cdn.shopify.com/s/files/1/0192/8012/products/friendship-bracelet-adjustable-camp-minimalist-rope-dowling-brothers-bangle-jewellery-740.jpg'
      },
      {
        id: 2,
        type: "bracelet",
        color: "orange plaid",
        size: 'S',
        quantity: 3,
        price: 10.00,
        image: 'https://cdn.shopify.com/s/files/1/0192/8012/products/friendship-bracelet-adjustable-camp-minimalist-rope-dowling-brothers-bangle-jewellery-740.jpg'
      },
      {
        id: 3,
        type: "leash",
        color: "lime",
        size: 'onesize',
        quantity: 1,
        price: 20.00,
        image: 'https://cdn.shopify.com/s/files/1/0192/8012/products/friendship-bracelet-adjustable-camp-minimalist-rope-dowling-brothers-bangle-jewellery-740.jpg'
      }       
    ])
    
  const { loading, error, data } = useQuery(GET_ALL_ITEMS)
  const [totalPrice, setTotalPrice] = useState(0);
  const [items, setItems] = useState([])
  const [itemsForDisplay, setItemsForDisplay] = useState([])

  const addTotalPrice = () => {
    const total = shoppingBag.reduce((price, item) => {
      return price += (item.price * item.quantity)
    }, 0)
    setTotalPrice(parseInt(total).toFixed(2))
  }

  useEffect(() => {
    addTotalPrice();
  }, [shoppingBag])

  const removeItemFromBag = id => {
    setShoppingBag(shoppingBag.filter(item => item.id !== parseInt(id)))
  }

  const updateQuantity = (id, operation = 'subtract', change) => {
    let index;
    const newItem = shoppingBag.find((item, i) => {
      index = i;
      return item.id === id
    })
    operation === 'add' ? newItem.quantity += Number(change) : newItem.quantity -= Number(change);
    !newItem.quantity ?
      removeItemFromBag(id) :
      setShoppingBag(shoppingBag => {
        const newBag = [...shoppingBag]
        newBag.splice(index, 1, newItem)
        return newBag
      })
  }
 
  const addToShoppingBag = (item) => {
    setShoppingBag([...shoppingBag, item]);
  }
    
  const getItemsForDisplay = () => {
    return cleanFetchedData(items);
  }

  // eslint-disable-next-line no-unused-vars
  useEffect(() => {
    if (!items.length && !loading && !error) {
      setItems(data.products)
    }
  }, [data]);

  useEffect(() => {
    const displayProducts = getItemsForDisplay()
    setItemsForDisplay(displayProducts)
  }, [items]);

  return (
    <div className="app">
      {!loading && !error &&
        <>
          <Routes>
            <Route path='/' element={<Home itemsForDisplay={itemsForDisplay} />} />
            <Route 
              path='/shopping-bag' 
              element={<ShoppingBag 
                shoppingBag={shoppingBag} 
                totalPrice={totalPrice} 
                removeItemFromBag={removeItemFromBag} 
                updateQuantity={updateQuantity} 
              />} 
            />
            <Route path='/checkout' element={<Checkout shoppingBag={shoppingBag} totalPrice={totalPrice}/>}/>
            <Route path='/:productID' element={<ProductDetail updateQuantity={updateQuantity} shoppingBag={shoppingBag} addToShoppingBag={addToShoppingBag} itemsForDisplay={itemsForDisplay} />}/>
          </Routes>
        </>
      }
    </div>
  );
}


export default App;

