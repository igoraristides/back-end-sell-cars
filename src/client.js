const express = require("express");
const router = express.Router();

const conexao = require("./database");

router.post("/", (req, res) => {
  const endereco = {
    cep: req.body.cep,
    numero: req.body.numero,
    rua: req.body.rua,
    complemento: req.body.complemento,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    estado: req.body.estado,
  };
  var query = "Insert into Endereco set ?";
  conexao.beginTransaction((error) => {
    conexao.query(query, endereco, (error, result) => {
      if (error) {
        conexao.rollback((error) => {
          if (error) {
            console.log(error);
          }
        });
      } else {
        console.log(result);
        const cliente = {
          nomeCliente: req.body.nomeCliente,
          sobrenomeCliente: req.body.sobrenomeCliente,
          cpfCliente: req.body.cpfCliente,
          rgCliente: req.body.rgCliente,
          telefoneCliente: req.body.telefoneCliente,
          celularCliente: req.body.celularCliente,
          Endereco_idEndereco: result.insertId,
        };
        console.log(cliente);
        console.log(endereco);

        var query = "Insert into Cliente set ?";
        conexao.query(query, cliente, (error, result) => {
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

router.get("/", (req, res) => {
  //var id = req.params.idCarro;
  var query = "Select * from Cliente";
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
