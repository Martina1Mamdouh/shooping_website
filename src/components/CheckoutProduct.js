import React from "react";
import { useAuth } from "../Context/GlobalState";
import starIcon from "../images/star.png";
import "./CheckoutProduct.css";
export const CheckoutProduct = ({
  hiddenButton,
  id,
  rating,
  image,
  price,
  title,
}) => {
  const { dispatch } = useAuth();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="CheckoutProduct">
      <img className="CheckoutProduct-image" src={image} />
      <div className="CheckoutProduct-info">
        <p className="CheckoutProduct-title">{title}</p>
        <p className="CheckoutProduct-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="CheckoutProduct-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>
                <img src={starIcon} />
              </p>
            ))}
        </div>
        {!hiddenButton && (
          <button onClick={removeFromBasket}>Remove Item</button>
        )}
      </div>
    </div>
  );
};
export default CheckoutProduct;
