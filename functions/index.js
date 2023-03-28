const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//app config
const app = express();
//midllewares
app.use(cors({ origin: true }));
app.use(express.json());

//api routes

app.get("/", (req, res) => res.status(200).send("Hello World"));
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  //created

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//example endpoint
//http://127.0.0.1:5001/fir-d3772/us-central1/api
//http://127.0.0.1:5001/fir-d3772/us-central1/api
exports.api = functions.https.onRequest(app);
