var database = require("../database/config");

function buscarUltimasMedidas(idEmpresa) {

    var instrucaoSql = `
    


    SELECT 
    Lixeira.idLixeira, 
    historico.DtTime,
    historico.nivelBaixo, 
    historico.nivelAlto,
    CASE 
        WHEN DAYOFWEEK(historico.DtTime) = 1 THEN 'Domingo'
        WHEN DAYOFWEEK(historico.DtTime) = 2 THEN 'Segunda-feira'
        WHEN DAYOFWEEK(historico.DtTime) = 3 THEN 'Terça-feira'
        WHEN DAYOFWEEK(historico.DtTime) = 4 THEN 'Quarta-feira'
        WHEN DAYOFWEEK(historico.DtTime) = 5 THEN 'Quinta-feira'
        WHEN DAYOFWEEK(historico.DtTime) = 6 THEN 'Sexta-feira'
        WHEN DAYOFWEEK(historico.DtTime) = 7 THEN 'Sábado'
    END AS dia
FROM 
    historico 
JOIN 
    Lixeira ON historico.fkLixeira = Lixeira.idLixeira
JOIN 
    Empresa ON Lixeira.fkEmpresa = Empresa.idEmpresa
WHERE 
    Empresa.idEmpresa = ${idEmpresa}
    AND historico.DtTime >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)
    AND HOUR(historico.DtTime) BETWEEN 18 AND 19
ORDER BY 
    Lixeira.idLixeira, historico.DtTime;
                    
                    
                    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//graficoModal
function graficoModal(idEmpresa,idLixeira) {

    var instrucaoSql = `
    


    SELECT 
    Lixeira.idLixeira, 
    Lixeira.nomeLixeira,
    historico.DtTime,
    historico.nivelBaixo, 
    historico.nivelAlto,
    CASE 
        WHEN DAYOFWEEK(historico.DtTime) = 1 THEN 'Domingo'
        WHEN DAYOFWEEK(historico.DtTime) = 2 THEN 'Segunda-feira'
        WHEN DAYOFWEEK(historico.DtTime) = 3 THEN 'Terça-feira'
        WHEN DAYOFWEEK(historico.DtTime) = 4 THEN 'Quarta-feira'
        WHEN DAYOFWEEK(historico.DtTime) = 5 THEN 'Quinta-feira'
        WHEN DAYOFWEEK(historico.DtTime) = 6 THEN 'Sexta-feira'
        WHEN DAYOFWEEK(historico.DtTime) = 7 THEN 'Sábado'
    END AS dia
FROM 
    historico 
JOIN 
    Lixeira ON historico.fkLixeira = Lixeira.idLixeira
JOIN 
    Empresa ON Lixeira.fkEmpresa = Empresa.idEmpresa
WHERE 
    Empresa.idEmpresa = ${idEmpresa} and idLixeira = ${idLixeira}
    AND historico.DtTime >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)
    AND HOUR(historico.DtTime) BETWEEN 18 AND 19
ORDER BY 
    Lixeira.idLixeira, historico.DtTime;
                    
                    
                    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function buscarMedidasEmTempoReal(idEmpresa) {

    var instrucaoSql = `SELECT 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        FROM medida WHERE fk_aquario = ${idEmpresa} 
                    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    graficoModal
}
