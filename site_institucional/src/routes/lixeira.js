var express = require("express");
var router = express.Router();

var lixeiraController = require("../controllers/lixeiraController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

router.post("/cadastrar", function (req, res) {
    lixeiraController.cadastrarLixeira(req, res);
    console.log("to no routes")
})

router.get("/listar/:idEmpresa/:selectValor", function (req, res) {
    lixeiraController.listarLixeira(req, res);
    console.log("to no routes")
})

router.get("/listarAlerta", function (req, res) {
    lixeiraController.listarAlerta(req, res);
    console.log("to no routes")
})


router.get("/listarBairro/:idEmpresa", function (req, res) {
    lixeiraController.listarBairros(req, res);
    console.log("to no routes")
})



module.exports = router;