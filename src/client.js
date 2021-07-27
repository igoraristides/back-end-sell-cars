const express = require("express");
const router = express.Router();

const conexao = require("./database");

//cadastrarCliente
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
          nomeCliente: req.body.nome,
          sobrenomeCliente: req.body.sobrenome,
          cpfCliente: req.body.cpf,
          rgCliente: req.body.rg,
          telefoneCliente: req.body.telefone,
          celularCliente: req.body.celular,
          Endereco_idEndereco: result.insertId,
        };

        var query = "Insert into Cliente set ?";
        conexao.query(query, cliente, (error, result) => {
          if (error) {
            return res.send("ERRO CPF/RG EXISTENTE !!!");
            conexao.rollback((error) => {
              if (error) {
                console.log(error);
              }
            });
          } else {
            return res.send("Operação realizada com sucesso");
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
});

//listarCliente
router.get("/", (req, res) => {
  var query = "Select * from Cliente";
  conexao.query(query, (error, result) => {
    if (error) {
      throw error;
    } else {
      return res.json(result);
    }
  });
});

module.exports = router;
