const express = require("express");

const conexao = require("./database");

const rotaClient = require("./client");
const rotaCarro = require("./car");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(21262, () => {
  console.log("Express started at http://localhost:21262");
});

app.use("/client", rotaClient);
app.use("/car", rotaCarro);
