const express = require("express");
const router = express.Router();

const conexao = require("./database");

router.post("/cars", (req, res) => {
  var carro = {
    nomeCarro: "Onix",
    preco: "1000",
    combustivel: "Flex",
    marca: "Chevrolet",
    garantia: "3",
    lugares: "4",
    cambio: "Automatico",
    situacao: "Novo",
    consumo: "9.4 KM/L (urbano)",
    estoque: 1,
  };
  var query = "Insert into Carro set ?";
  conexao.beginTransaction((error) => {
    conexao.query(query, carro, (error, result) => {
      if (error) {
        console.log(error);
        conexao.rollback((error) => {
          if (error) {
            console.log(error);
          }
        });
      } else {
        console.log(result);
        var equipamentos = {
          freioABS: true,
          airbags: true,
          faroisDeNeblina: true,
          arCondicionado: true,
          kitMultimidia: true,
          retrovisoresEletricos: true,
          vidrosEletricos: true,
          volanteMultifuncional: true,
          controleDeEstabilidade: true,
          Carro_idCarro: result.insertId,
        };
        var query = "Insert into Equipamentos set ?";
        conexao.query(query, equipamentos, (error, result) => {
          if (error) {
            console.log(error);
            conexao.rollback((error) => {
              if (error) {
                console.log(error);
              }
            });
          } else {
            console.log(result);
            conexao.commit((error) => {
              if (error) {
                console.log(error);
                conexao.rollback((error) => {
                  if (error) {
                    console.log(error);
                  }
                });
              }
            });
          }
        });
      }
    });
  });
  res.send("True");
});

router.get("/cars", (req, res) => {
  //var id = req.params.idCarro;
  var query = "Select * from Carro";
  conexao.query(query, (error, result) => {
    if (error) {
      throw error;
    } else {
      console.log(result);
    }
  });
  res.send("True");
});

module.exports = router;
