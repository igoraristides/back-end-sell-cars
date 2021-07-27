const mySQL = require("mysql");

let conexao = mySQL.createConnection({
  host: "localhost",
  user: "root",
  password: "aristides09",
  database: "mydb",
});

conexao.connect((error) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log("Conexao estabelecida com sucesso");
  }
});

module.exports = conexao;
