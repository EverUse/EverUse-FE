import { useParams } from "react-router-dom";
import ProductDetailOrderForm from "./ProductDetailOrderForm";
import DescriptionText from "./DescriptionText";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_ITEM } from "../../api";
import { useEffect, useState } from "react";

const ProductDetail = ({itemsForDisplay, addToShoppingBag, shoppingBag, updateQuantity}) => {
  const [product, setProduct] = useState({});
  const productID = useParams().productID;
  const { loading, error, data } = useQuery(GET_SINGLE_ITEM, {
    variables: {
      name: productID
    }
  })

  useEffect(() => {
    if(!product.name && data?.product && !loading) {
      setProduct(data.product)
    }
  },[data])

 
  return (
    <>
      <div className="details">
        <div className="details__header">
          <h2 className="details__header-text">Products handmade from upcycled climbing ropes in an effort to reduce waste</h2>
        </div>
        <div className="details__info">
          <div className="details__info-img-container">
            <img className="details__info-img" alt={product.name} src={product.image}/>
          </div>
          <DescriptionText description={product.description} />
          <ProductDetailOrderForm product={product} updateQuantity={updateQuantity} shoppingBag={shoppingBag} addToShoppingBag={addToShoppingBag}/>
        </div>
      </div>
    </>
  )
}

export default ProductDetail