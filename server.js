import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

import Cards from "./dbCards.js";

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connectionURL = `mongodb+srv://ayushmaan:Ayushmaan007@cluster0.lxajb.mongodb.net/tinderDB?retryWrites=true&w=majority`;
// Middlewares
app.use(express.json());
app.use(Cors());

// db COnfig
mongoose
  .connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log("connection to db failed"));

// Api endPOints
app.get("/", (req, res, next) => {
  res.status(200).send("Hello Clever Programmers!");
});

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) res.status(500).send(err);
    else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) res.status(500).send(err);
    else {
      res.status(200).send(data);
    }
  });
});

// listener
app.listen(port, () => {
  console.log("Listening on localhost: " + port);
});
