var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idEmpresa/:selectValor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/ultimas/graficoModal/:idEmpresa/:idLixeira", function (req, res) {
    medidaController.graficoModal(req, res);
});


router.get("/tempo-real/:idEmpresa", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/tempo-real/:idEmpresa", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;