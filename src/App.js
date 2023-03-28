import { React, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import Login from "./components/Login";
import Orders from "./components/Orders";
import { useAuth } from "./Context/GlobalState";
import { auth } from "./Firebase";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
export const App = () => {
  const { dispatch } = useAuth();
  const stripePromis = loadStripe(
    "pk_test_51MmfQJBeo0kg5LgKxfrpf15xrBAHGmKenDSL0aBPPMHEbGsubISFsu6e0BDTwY9HSTjK6wEWPtrKNWYdK0V0UiYh00uQEBhEwb"
  );
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="APP">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Elements stripe={stripePromis}>
                <Payment />
              </Elements>
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>page Not Found</h1>} />
      </Routes>
    </div>
  );
};
export default App;
