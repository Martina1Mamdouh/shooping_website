import { React, useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useNavigate } from "react-router-dom";
import { getBasketTotal } from "../Context/AppReducer";
import { useAuth } from "../Context/GlobalState";
import CheckoutProduct from "./CheckoutProduct";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import "./Payment.css";
import axios from "./axios";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
const Payment = () => {
  const { basket, user, dispatch } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const [error, seterror] = useState(null);
  const [disble, setdisable] = useState(true);
  const [succeded, setsuccsed] = useState(false);
  const [proccessing, setprocessing] = useState("");
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total= ${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
      return response;
    };
    getClientSecret();
  }, [basket]);
  const handlSubmit = async (e) => {
    e.preventDefault();
    setprocessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
        setDoc(ref, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        setsuccsed(true);
        seterror(null);
        setprocessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders", { replace: true });
      });
  };
  const handlChange = (e) => {
    setdisable(e.empty);
    seterror(error ? error.message : "");
  };
  return (
    <div className="Payment">
      <div className="Payment-container">
        <h1>
          Checkout(<Link to="/checkout">{basket.length} items</Link>)
        </h1>
        <div className="Payment-section">
          <div className="Payment-title">
            <h3>Address</h3>
          </div>
        </div>
        <div className="Payment-address">
          <p>{user?.email}</p>
          <p>Eygpt</p>
        </div>
        <div className="Payment-section">
          <div className="Payment-title">
            <h3>Review Items</h3>
          </div>
        </div>
        <div className="Payment-Items">
          {basket.map((item) => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
        <div className="Payment-section">
          <h3>Payment Method</h3>
          <div className="Payment-details">
            <form onSubmit={handlSubmit}>
              <CardElement onChange={handlChange} />
              <div className="Payment-priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total :{value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  type="submit"
                  disabled={proccessing || disble || succeded}
                >
                  <span> {proccessing ? <p>proccessing</p> : "Checkout"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
