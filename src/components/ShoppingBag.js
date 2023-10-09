// SHOPPING BAG COMPONENT //

import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { camelToPascalCase } from '../helperFunctions';
import Nav from './Nav/Nav';

const ShoppingBag = ({ shoppingBag, totalPrice, removeItemFromBag, updateQuantity, altText }) => {
  
  const items = shoppingBag.map(item => {
    return (
    <article key={item.id} className='item'>
      <div className='item__img-container'>
        <img src={item.image} alt={altText[item.type]} className='item__img' />
      </div>
      <span className='item__info'>
        <p className='item__name'>{camelToPascalCase(item.type)}</p>
        <div className='item__details'>
          <div className='item__specs'>
            <p className='item__spec'>Size: {camelToPascalCase(item.size)}</p>
            <p className='item__spec'>Color: {camelToPascalCase(item.color)}</p>
            <p className='item__spec'>Unit Price: ${item.price}</p>
          </div>
          <div className='item__counter'>
            <span className="material-icons-round counter__icon counter__minus" onClick={() => updateQuantity(item.id, 'subtract', 1)}>remove</span>
            <p className='item__quantity'>{item.quantity}</p>
            <span className="material-icons-round counter__icon counter__plus" onClick={() => updateQuantity(item.id, 'add', 1)}>add</span>
          </div>
          <p className='item__price'>${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </span>
      <span className="material-icons-round item__delete" id={item.id} onClick={(e) => removeItemFromBag(e.target.id)}>close</span>
    </article>)
  });

  return (
    <main>
    <Nav />
    <div className='bag'>
      <h1>Shopping Bag</h1>
      {shoppingBag.length ?
      <div className='bag__contents'>
        <section className='bag__items'>
          {items}
        </section>
        <section className='bag__summary'>
          <h2 className='bag__summary-header'>Request Summary</h2>
          <div className='bag__subtotal'>
            <p>Order Subtotal:</p>
            <p className='bag__total'>${totalPrice}</p>
          </div>
          <NavLink to='/checkout' className='bag__button bag__button-submit'>Continue to Request</NavLink>
        </section>
      </div>
      :
      <div className='bag__empty'>
        <h2>Your shopping bag is empty.</h2>
        <HashLink smooth to='/#products' className='bag__button'>Continue Shopping</HashLink>
      </div>
      }
    </div>
    </main>
  )
};

export default ShoppingBag;