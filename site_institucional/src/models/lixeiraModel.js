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

function listarLixeira(idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarLixeira()");
    var instrucaoSql = `
    select  Lixeira.idLixeira, historico.DtTime as "Data e Hora", historico.EstadoAtual,Lixeira.nomeLixeira ,Lixeira.cep, Lixeira.numero, Lixeira.Complemento, Empresa.nomeEmpresa as Empresa
	from historico join Lixeira
    on historico.fkLixeira = Lixeira.idLixeira
    join Empresa on Lixeira.fkEmpresa = Empresa.idEmpresa
    where idEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarBoaVista(idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarBoaVista()");
    var instrucaoSql = `
    select  Lixeira.idLixeira, historico.DtTime as "Data e Hora", historico.EstadoAtual,Lixeira.nomeLixeira ,Lixeira.cep, Lixeira.numero, Lixeira.Complemento, Empresa.nomeEmpresa as Empresa
	from historico join Lixeira
    on historico.fkLixeira = Lixeira.idLixeira
    join Empresa on Lixeira.fkEmpresa = Empresa.idEmpresa
    where idEmpresa = ${idEmpresa} and Bairro = 'Boa Vista';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar,
    listarLixeira,
    listarBoaVista
};