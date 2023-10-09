// PRODUCT DETAIL ORDER FORM COMPONENT //

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import SizeOptionsContainer from "./SizeOptionsContainer";
import { camelToPascalCase } from "../../helperFunctions";
import { useNavigate } from "react-router-dom";

const ProductDetailOrderForm = ({product, addToShoppingBag, shoppingBag, updateQuantity}) => {
  const [isSingleSize, setIsSingleSize] = useState(false);
  const [inputFields, setInputFields] = useState({
    "color":"",
    "size": "",
    "quantity":1
  });
  const [colorOptions, setColorOptions] = useState([]);
  const [isFormHealthy, setIsFormHealthy] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();
  const navigateToCart = (e) => {
    e.preventDefault();
    navigate('/shopping-bag')
  }
  useEffect(() => {
    setColorOptions(product?.colorOptions)
    if (product.sizeOptions?.length === 1) {
      setIsSingleSize(true);
      handleSelect('onesize', 'size');
    } else {
      setIsSingleSize(false);
    }
  }, [product]);
  
  
  useEffect(() => {
    checkFormHealth()
  }, [inputFields]);
  
  useEffect(() => {
    const total = shoppingBag.reduce((total, item) => total + item.quantity, 0);
    setTotalQuantity(total);
  }, [shoppingBag])
  
  
  const checkFormHealth = () => {
    if (inputFields.color && inputFields.size && inputFields.quantity) {
      setIsFormHealthy(true);
    } else {
      setIsFormHealthy(false);
    }
  }

  const handleSelect = (value, changedField) => {
    const clonedInputs = {...inputFields};
    clonedInputs[changedField] = value;
    setInputFields(clonedInputs);
    checkFormHealth();
  }

  const ColorOptionsCode = () => {
    const options = colorOptions?.map(color => {
      return <option key={color} value={color}> { camelToPascalCase(color) } </option>
    })
    return (
      <>
        <option value="">Choose color</option>
        {options}
      </>
    );
  }
  
  const checkForExistingMatch = (cart, item) => {
    const result = cart.find(existingItem => {
      return (existingItem.type?.toLowerCase() === item.type?.toLowerCase()) && (existingItem.size === item.size) && (existingItem.color === item.color)
    });
    return result?.id;
  };
  
  const saveItem = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),  
      type: product.name,
      color: inputFields.color,
      size: inputFields.size,
      quantity: Number(inputFields.quantity),
      price: Number(product.price).toFixed(2),
      image: `${product.image}`
    };

    const matchedProductID = checkForExistingMatch(shoppingBag, newItem);
    if (matchedProductID) {
      updateQuantity(matchedProductID, 'add', inputFields.quantity)
    } else {
      addToShoppingBag(newItem);
    }
  };

  return (
    <form className="details-order-form">
      {product?.name && <div className="details-order-form__title">
        <p>{camelToPascalCase(product.name)}</p>
        <p>${product.price}</p>
      </div>}
      <div className="details-order-form__selection-pair">
         <p className="details-order-form__selection-text">Size:</p> 
         <SizeOptionsContainer isSingleSize={isSingleSize} handleSelect={handleSelect}/>
      </div>
      <div className="details-order-form__selection-pair">
         <label htmlFor="colorOptions" className="details-order-form__selection-text details-order-form__color-options">Color:</label> 
         <select id="colorOptions" className={!inputFields.color? "details-order-form__faded":""} value={inputFields.color} onChange={(e)=> {handleSelect(e.target.value, "color")}}>
          <ColorOptionsCode />
         </select>
      </div>
      <div className="details-order-form__selection-pair">
         <label htmlFor="quantityOptions" className="details-order-form__selection-text details-order-form__quantity-options">Quantity:</label> 
         <select id="quantityOptions" className={!inputFields.quantity? "details-order-form__faded":""} value={inputFields.quantity} onChange={(e) => {handleSelect(e.target.value, "quantity")}}>
            <option value={1}> 1 </option>
            <option value={2}> 2 </option>
            <option value={3}> 3 </option>
            <option value={4}> 4 </option>
            <option value={5}> 5 </option>
            <option value={6}> 6 </option>
            <option value={7}> 7 </option>
            <option value={8}> 8 </option>
            <option value={9}> 9 </option>
         </select>
      </div>
      <div className="details-order-form__btn-container">
        <button disabled={!isFormHealthy} className={isFormHealthy? "details-order-form__submit-btn": "details-order-form__faded-btn"}  onClick={(e) => {saveItem(e)}}>
          Add to Bag
        </button>
        {/* <Link to={'/shopping-bag'}> */}
          <button onClick={(e) => {navigateToCart(e)}} disabled={!shoppingBag.length} className={shoppingBag.length? "details-order-form__submit-btn": "details-order-form__faded-btn"}>
            <p> Cart <span className={totalQuantity? "details-order-form__cart-count": "details-order-form__hidden"}>{totalQuantity? totalQuantity: ""}</span></p>
          </button>
        {/* </Link> */}
      </div>
      
    </form>
  )
}

export default ProductDetailOrderForm;