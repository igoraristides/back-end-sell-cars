const express = require("express");
const router = express.Router();

const conexao = require("./database");

//cadastrarCarro
router.post("/", (req, res) => {
  const carro = {
    nomeCarro: req.body.nome,
    ano: req.body.ano,
    preco: req.body.preco,
    combustivel: req.body.combustivel,
    marca: req.body.marca,
    garantia: req.body.garantia,
    lugares: req.body.lugares,
    cambio: req.body.cambio,
    situacao: req.body.situacao,
    consumo: req.body.consumo,
    estoque: req.body.estoque,
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
        var equipamentos = {
          freioABS: req.body.freioABS,
          airbags: req.body.airbags,
          faroisDeNeblina: req.body.faroisDeNeblina,
          arCondicionado: req.body.arCondicionado,
          kitMultimidia: req.body.kitMultimidia,
          retrovisoresEletricos: req.body.retrovisoresEletricos,
          vidrosEletricos: req.body.vidrosEletricos,
          volanteMultifuncional: req.body.volanteMultifuncional,
          controleDeEstabilidade: req.body.controleDeEstabilidade,
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
  res.send("Cadastro realizado com sucesso");
});

//listarCarro
router.get("/", (req, res) => {
  var query =
    "select idCarro, nomeCarro,ano,preco,combustivel,marca,garantia,lugares,cambio,situacao,consumo,estoque,freioABS,airbags,faroisDeNeblina,arCondicionado,kitMultimidia,retrovisoresEletricos,vidrosEletricos,volanteMultifuncional,controleDeEstabilidade from Carro inner join Equipamentos on Equipamentos.Carro_idCarro = Carro.idCarro";
  conexao.query(query, (error, result) => {
    if (error) {
      throw error;
    } else {
      return res.json(result);
    }
  });
});

//listarCarroporId
router.get("/:id", (req, res) => {
  var query =
    "select idCarro,nomeCarro,ano,preco,combustivel,marca,garantia,lugares,cambio,situacao,consumo,estoque,freioABS,airbags,faroisDeNeblina,arCondicionado,kitMultimidia,retrovisoresEletricos,vidrosEletricos,volanteMultifuncional,controleDeEstabilidade from Carro inner join Equipamentos on Equipamentos.Carro_idCarro = Carro.idCarro where idCarro = " +
    req.params.id;
  conexao.query(query, (error, result) => {
    if (error) {
      throw error;
    } else {
      return res.json(result);
    }
  });
});

module.exports = router;
