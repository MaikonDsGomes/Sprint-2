var express = require("express");
var router = express.Router();

var lixeiraController = require("../controllers/lixeiraController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

router.post("/cadastrar", function (req, res) {
    lixeiraController.cadastrarLixeira(req, res);
    console.log("to no routes")
})


module.exports = router;