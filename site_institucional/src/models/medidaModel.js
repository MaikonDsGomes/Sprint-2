var database = require("../database/config");

function buscarUltimasMedidas(idEmpresa, selectValor, dataInicial, dataFinal) {

    var instrucaoSql = `
    
    SELECT 
    DATE_FORMAT(subconsulta.DtTime, "%e de %M %Y") as DtTimeFormatada,
    SUM(CASE WHEN subconsulta.nivelBaixo = 1 AND subconsulta.nivelAlto = 1 THEN 1 ELSE 0 END) as nivelAlto,
    SUM(CASE WHEN subconsulta.nivelBaixo = 1 AND subconsulta.nivelAlto = 0 THEN 1 ELSE 0 END) as nivelMedio,
    SUM(CASE WHEN subconsulta.nivelBaixo = 0 AND subconsulta.nivelAlto = 0 THEN 1 ELSE 0 END) as nivelBaixo
FROM (
    SELECT 
        Lixeira.idLixeira, 
        historico.DtTime,
        MAX(historico.nivelBaixo) as nivelBaixo, 
        MAX(historico.nivelAlto) as nivelAlto
    FROM 
        historico 
    JOIN 
        Lixeira ON historico.fkLixeira = Lixeira.idLixeira
    JOIN 
        Empresa ON Lixeira.fkEmpresa = Empresa.idEmpresa
    WHERE 
        Empresa.idEmpresa = ${idEmpresa} AND Bairro LIKE "${selectValor}" AND DtTime > '${dataInicial}' AND DtTime < '${dataFinal}'
    GROUP BY 
        Lixeira.idLixeira, historico.DtTime
) as subconsulta
GROUP BY 
    subconsulta.DtTime
ORDER BY 
    subconsulta.DtTime;
                    
                    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//graficoModal
function graficoModal(idEmpresa, idLixeira) {

    var instrucaoSql = `
    


SELECT 
Lixeira.idLixeira, 
Lixeira.nomeLixeira,
historico.DtTime,
MAX(historico.nivelBaixo) AS nivelBaixo, 
MAX(historico.nivelAlto) AS nivelAlto,
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
GROUP BY 
Lixeira.idLixeira, historico.DtTime
ORDER BY 
Lixeira.idLixeira, historico.DtTime;
                    
                    
                    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function buscarMedidasEmTempoReal(idEmpresa) {

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

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    graficoModal
}
