import React from "react";
import { useAuth } from "../Context/GlobalState";
import starIcon from "../images/star.png";
import "./Product.css";
export const Product = ({ title, price, image, rating, id }) => {
  const { dispatch } = useAuth();
  const AddToCart = () => {
    dispatch({
      type: "ADD_TO_Cart",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
      <div className="product-rating">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <p>
              <img src={starIcon} />
            </p>
          ))}
      </div>
      <img src={image} alt="product-img" />
      <button onClick={AddToCart}>Add To Cart</button>
    </div>
  );
};
export default Product;
