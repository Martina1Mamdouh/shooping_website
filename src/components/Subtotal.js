import React from "react";
import { useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../Context/AppReducer";
import { useAuth } from "../Context/GlobalState";
const Subtotal = () => {
  const { basket } = useAuth();
  const navigate = useNavigate();
  return (
    <div
      className="Subtotal"
      style={{ backgroundcolor: "lightgrey", borderradius: "6px" }}
    >
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal-gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button
        onClick={() => navigate("/payment")}
        style={{
          display: "flex",
          backgroundColor: "#f0c14b",
          border: "1px solid",
          borderradius: "5px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Subtotal;
