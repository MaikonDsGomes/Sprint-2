var database = require("../database/config");


function cadastrar(nome, cep, num, complemento, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_lixeira():", nome, cep, idEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        insert into Lixeira (nomeLixeira, cep, numero, Complemento, fkEmpresa) values ('${nome}','${cep}', '${num}', '${complemento}', ${idEmpresa})
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarLixeira(idEmpresa, selectValor) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarLixeira()");
    var instrucaoSql = `
    SELECT 
    Lixeira.idLixeira, 
    MAX(historico.DtTime) as DtTime,
    COALESCE(SUM(COALESCE(historico.nivelBaixo, 0) + COALESCE(historico.nivelAlto, 0)), 0) as somaTotal, 
    Lixeira.nomeLixeira,
    Lixeira.cep, 
    Lixeira.numero, 
    Lixeira.Complemento, 
    Empresa.nomeEmpresa as Empresa
FROM 
    (SELECT 
        *,
        ROW_NUMBER() OVER (PARTITION BY fkLixeira ORDER BY idHistorico DESC) AS row_num
    FROM historico) AS historico_numbered
JOIN 
    Lixeira ON historico_numbered.fkLixeira = Lixeira.idLixeira
JOIN 
    Empresa ON Lixeira.fkEmpresa = Empresa.idEmpresa
JOIN
    historico ON historico.idHistorico = historico_numbered.idHistorico
WHERE 
    historico_numbered.row_num <= 2
    AND Empresa.idEmpresa = ${idEmpresa} and Lixeira.bairro like '${selectValor}'
GROUP BY 
    Lixeira.idLixeira,
    Lixeira.nomeLixeira,
    Lixeira.cep, 
    Lixeira.numero, 
    Lixeira.Complemento, 
    Empresa.nomeEmpresa
    ORDER BY somaTotal DESC

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//
function listarAlerta() {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarLixeira()");
    var instrucaoSql = `
    select nomeLixeira, cep, Bairro from historico join Lixeira on fkLixeira = idLixeira order by dtTime desc limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarBairros(idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarBairros()");
    var instrucaoSql = `
    select distinct Bairro from Lixeira join Empresa on fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar,
    listarLixeira,
    listarBairros,
    listarAlerta
};