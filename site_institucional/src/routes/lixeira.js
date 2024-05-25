var express = require("express");
var router = express.Router();

var lixeiraController = require("../controllers/lixeiraController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

router.post("/cadastrar", function (req, res) {
    lixeiraController.cadastrarLixeira(req, res);
    console.log("to no routes")
})

router.get("/listar/:idEmpresa", function (req, res) {
    lixeiraController.listarLixeira(req, res);
    console.log("to no routes")
})

router.get("/listar/boa_vista/:idEmpresa", function (req, res) {
    lixeiraController.listarBoaVista(req, res);
    console.log("to no routes")
})



module.exports = router;