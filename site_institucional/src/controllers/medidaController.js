var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    

    var idEmpresa = req.params.idEmpresa;
    var selectValor = req.params.selectValor;
    var dataInicial = req.params.dataInicial;
    var dataFinal = req.params.dataFinal;

    if (selectValor == 1){
        selectValor = "%";
    }



    medidaModel.buscarUltimasMedidas(idEmpresa, selectValor, dataInicial, dataFinal).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


//
function graficoModal(req, res) {


    var idLixeira = req.params.idLixeira;
    var idEmpresa = req.params.idEmpresa;


    medidaModel.graficoModal(idEmpresa ,idLixeira).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoReal(req, res) {

    var idEmpresa = req.params.idEmpresa;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    graficoModal

}