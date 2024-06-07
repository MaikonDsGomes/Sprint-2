var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM Empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT Cnpj, idEmpresa FROM Empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(Cnpj) {
  var instrucaoSql = `SELECT * FROM Empresa WHERE Cnpj = '${Cnpj}'`;

  return database.executar(instrucaoSql);
}


  module.exports = { 
    buscarPorCnpj, 
    buscarPorId, 
    listar 
};