var lixeiraModel = require("../models/lixeiraModel");


function cadastrarLixeira(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var cep = req.body.cepServer;
    var num = req.body.numServer;
    var complemento = req.body.complementoServer;
    var idEmpresa = req.body.idEmpresaServer;
    
    console.log("to no controller - de cadastrar lixeira");

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (num == undefined) {
        res.status(400).send("Sua numero está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Sua complemento está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Seu codigo está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        lixeiraModel.cadastrar(nome, cep, num, complemento, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro da LIXEIRA! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
//listarAlerta
function listarAlerta(req, res) {
  

    lixeiraModel.listarAlerta()
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarLixeira(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var selectValor = req.params.selectValor;

    if (selectValor == 1){
        selectValor = "%";
    }

    lixeiraModel.listarLixeira(idEmpresa, selectValor)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarBairros(req, res) {
    var idEmpresa = req.params.idEmpresa;
    console.log("ESTOU NO CONTROLLER LISTAR BAIRROS --------------------------")
    lixeiraModel.listarBairros(idEmpresa)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrarLixeira,
    listarLixeira,
    listarBairros,
    listarAlerta
}
