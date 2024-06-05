var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)

    var instrucaoSql = `
    SELECT Usuario.idUsuario,
    Usuario.NomeUsuario, Usuario.EmailUsuario,
    Usuario.fkEmpresa as empresaId, Usuario.TipoUsuario, 
    Usuario.telefone, Usuario.Senha, empresa.NomeEmpresa as Empresa
    FROM Usuario join empresa on empresa.IdEmpresa = Usuario.fkEmpresa 
    WHERE EmailUsuario = '${email}' AND Senha = '${senha}';

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(nome, email, senha, telefone, idUsuario ) {

    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", nome, email, senha, telefone, idUsuario);
    var instrucaoSql = `
    UPDATE Usuario
    SET NomeUsuario = '${nome}' , 
        EmailUsuario = '${email}',
        Senha = '${senha}',
        Telefone = '${telefone}'
    WHERE idUsuario = ${idUsuario};
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrar(nome, email, senha, codigo,cpf, telefone, tipoUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO Usuario (nomeUsuario, emailUsuario, senha, fkEmpresa, cpf, telefone, TipoUsuario) VALUES ('${nome}', '${email}', '${senha}', '${codigo}', '${cpf}', '${telefone}', '${tipoUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    autenticar,
    cadastrar,
    editar
};