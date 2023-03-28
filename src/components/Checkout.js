import React from "react";
import { useAuth } from "../Context/GlobalState";
import adlogo from "../images/adlogo.jpg";
import CheckoutProduct from "../components/CheckoutProduct";
import "./Checkout.css";
import Subtotal from "./Subtotal";
export const Checkout = () => {
  const { user, basket } = useAuth();
  return (
    <div className="Checkout">
      <div className="Checkout-left">
        <img className="Checkout-ad" src={adlogo} />
        <div>
          <h3 style={{ marginLeft: "9%" }}>Hello,{user?.email}</h3>
          <h2 className="Checkout-title"> Your basket shopping </h2>
          {basket.length > 0 ? (
            basket.map((item) => (
              // props
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))
          ) : (
            <p>
              There is no items in your basket .To buy items "Add to basket"
            </p>
          )}
        </div>
      </div>
      <div
        className="Checkout-Right"
        style={{ marginleft: "3%", margintop: "2%" }}
      >
        <Subtotal />
      </div>
    </div>
  );
};
export default Checkout;
