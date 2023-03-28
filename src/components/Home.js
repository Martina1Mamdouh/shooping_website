import React from "react";
import cover from "../images/Cover.jpg";
import Product from "./Product";
import "./Home.css";
import headphone from "../images/headphone.jpg";
import shortid from "shortid";
export const Home = () => {
  return (
    <div className="Home">
      <div className="Home-container">
        <img
          className="home-img"
          src={cover}
          alt="home-img"
          width="100%"
          height="100%"
          style={{ marginTop: "-1%" }}
        />
        <div className="home-row">
          <Product
            id={shortid.generate()}
            image={headphone}
            price={64}
            title="mobile phone 6.8 GB"
            rating={3}
          />
          <Product
            id={shortid.generate()}
            image={headphone}
            price={6400}
            title="mobile phone 6.8 GB"
            rating={2}
          />
        </div>
        <div className="home-row">
          <Product
            id={shortid.generate()}
            image={headphone}
            price={64}
            title="mobile phone 6.8 GB"
            rating={5}
          />
          <Product
            id={shortid.generate()}
            image={headphone}
            price={64}
            title="mobile phone 6.8 GB"
            rating={5}
          />
          <Product
            id={shortid.generate()}
            image={headphone}
            price={64}
            title="mobile phone 6.8 GB"
            rating={5}
          />
        </div>
        <div className="home-row">
          <Product
            id={shortid.generate()}
            image={headphone}
            price={64}
            title="mobile phone 6.8 GB"
            rating={5}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
