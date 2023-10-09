// PRODUCT DETAIL COMPONENT //

/* eslint-disable react-hooks/exhaustive-deps */

import { useParams } from "react-router-dom";
import ProductDetailOrderForm from "./ProductDetailOrderForm";
import DescriptionText from "./DescriptionText";
import Nav from "../Nav/Nav";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_ITEM } from "../../api";
import { useEffect, useState } from "react";
import { cleanFetchedData } from "../../helperFunctions";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import LoadSpinner from "../LoadSpinner";

if (process.env.NODE_ENV === "development") {
  loadDevMessages();
  loadErrorMessages();
}

const ProductDetail = ({addToShoppingBag, shoppingBag, updateQuantity, altText}) => {
  const [product, setProduct] = useState({});
  const [errorMessage, setErrorMessage] = useState('We could not find the product you are looking for.');
  const productID = useParams().productID;
  const { loading, error, data } = useQuery(GET_SINGLE_ITEM, {
    variables: {
      name: productID
    }
  });

  useEffect(() => {
    if (error) {
      setErrorMessage(`${error.message} - Please try again later`);
    }
    if(!product?.name && data?.product && !loading) {
      setProduct(cleanFetchedData(data.product)[0]);
    }
  },[data, error]);
 
  return (
    <main>
      {loading && <LoadSpinner />}
      {!loading && <div className="details">
        <Nav />     
        <div className="details__header">
          <h1 className="details__header-text">Products handmade from upcycled climbing ropes in an effort to reduce waste</h1>
        </div>
        {error || !data.product.length ? <p className="details__error">{errorMessage}</p> :
        <div className="details__info">
          <div className="details__info-product">
            <div className="details__info-img-container">
              <img className="details__info-img" alt={altText[product.name]} src={product.image}/>
            </div>
            <DescriptionText description={product.description} />
          </div>
          <ProductDetailOrderForm product={product} updateQuantity={updateQuantity} shoppingBag={shoppingBag} addToShoppingBag={addToShoppingBag}/>
        </div>}
      </div>}
    </main>
  )
}

export default ProductDetail