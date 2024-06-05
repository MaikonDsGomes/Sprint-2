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
    MAX(historico.nivelBaixo) as nivelBaixo, 
    MAX(historico.nivelAlto) as nivelAlto,
    Lixeira.nomeLixeira,
    Lixeira.cep, 
    Lixeira.numero, 
    Lixeira.bairro,
    Lixeira.Complemento,
    Empresa.nomeEmpresa as Empresa
FROM 
    historico 
JOIN 
    Lixeira ON historico.fkLixeira = Lixeira.idLixeira
JOIN 
    Empresa ON Lixeira.fkEmpresa = Empresa.idEmpresa
WHERE 
    Empresa.idEmpresa = ${idEmpresa} and Lixeira.Bairro like '${selectValor}'
GROUP BY 
    Lixeira.idLixeira,
    Lixeira.nomeLixeira,
    Lixeira.cep, 
    Lixeira.numero, 
    Lixeira.Complemento, 
    Empresa.nomeEmpresa
    
    order by nivelAlto desc, nivelBaixo desc;


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
    listarBairros
};