create database SmartBin;
use SmartBin;

-- drop database SmartBin;


-- EMPRESA
create table Empresa (
idEmpresa char(5) primary key,
Cnpj char (14),
NomeEmpresa varchar(45),
RazaoSocial varchar (50),
QtdLixeiras int);
desc Empresa;

insert into Empresa(idEmpresa,Cnpj, NomeEmpresa, RazaoSocial, QtdLixeiras) values
 ('12345',012345678965412, 'Smartbin','Sustentavel', 3),
 ('67890',012345678965412, 'Smartbin','Sustentavel', 3);
 

-- USUÁRIO
create table Usuario (
idUsuario int primary key auto_increment,
cpf char(14),
TipoUsuario varchar (50),
constraint chkTipo check (TipoUsuario in ('Administrador', 'Comum')),
NomeUsuario varchar (50),
EmailUsuario varchar (50),
	constraint chEmailUsuario check (EmailUsuario like '%@%' and EmailUsuario like '%.com'),
Senha varchar (15),
Telefone varchar(50),
fkEmpresa char(5), 
	constraint fkUsuarioEmpresa foreign key (fkEmpresa)
    references Empresa(idEmpresa)
);
desc Usuario;

select * from usuario;

Insert into Usuario values
(default, 12345678901, 'Administrador', 'Ricardo', 'ricardo@gmail.com', 'Alegria54321', '11959395227' , '12345'),
(default, 12345678901, 'Administrador', 'Ricardo', 'maik@gmail.com', '123456789', '11959395227' , '12345');

select * from usuario;


-- LIXEIRA
create table Lixeira (  
IdLixeira int primary key auto_increment,
nomeLixeira varchar(45),
cep char(9),
numero varchar(45),
Complemento varchar(45),
Lixeira varchar(50),
Bairro varchar(50),
fkEmpresa char(5),
	constraint fkLixeiraEmpresa foreign key (fkEmpresa)
    references Empresa(idEmpresa)
);
desc lixeira; 

insert into Lixeira (cep, nomeLixeira,numero,Complemento, Bairro,fkEmpresa) values 
('123456789', 'lixeira 1','2801', 'Em frente a APAE', 'Boa Vista', '12345'),
('123456787', 'lixeira 2','589', 'Do lado do Digital Building', 'Jabaquara', '12345'),
('123456788', 'lixeira 3','257', 'Em frente ao Starbucks', 'Jardim Paulista' ,  '12345');

insert into Lixeira (cep, nomeLixeira,numero,Complemento, Bairro,fkEmpresa) values 
('123456789', 'lixeira 4','2801', 'Em frente a APAE', 'Boa Vista', '12345');


select * from lixeira;



-- SENSOR

create table sensor (
idSensor int primary key auto_increment,
estado int,
fkLixeira int,
constraint sensorLixeira foreign key (fkLixeira) references lixeira(idLixeira)
);

insert into sensor values
(default, 1, 1),
(default, 0, 1),
(default, 0, 2),
(default, 1, 2);

insert into sensor values
(default, 1, 1),
(default, 0, 1);

insert into sensor values
(default, 1, 1),
(default, 0, 1);



-- HISTÓRICO
create table historico(
idHistorico int auto_increment,
DtTime timestamp not null default current_timestamp,
nivelBaixo int,
nivelAlto int,
fkLixeira int,
constraint fkHistoricoLixeira foreign key (fkLixeira) references Lixeira(idLixeira),
fkSensor int, 
constraint fkHistoricoSensor foreign key (fkSensor) references sensor(idSensor),
primary key pkComposta (idHistorico, fkLixeira, FkSensor)
);


-- DIA 3 do 6

INSERT INTO historico (DtTime, nivelBaixo, fkLixeira, fkSensor) VALUES 
('2024-06-03 18:30:00', 1, 1, 1);
INSERT INTO historico (DtTime, nivelAlto, fkLixeira, fkSensor) VALUES 
('2024-06-03 18:30:00', 1, 1, 2);

INSERT INTO historico (DtTime, nivelBaixo, fkLixeira, fkSensor) VALUES 
('2024-06-03 18:30:00', 1, 2, 3);
INSERT INTO historico (DtTime, nivelAlto, fkLixeira, fkSensor) VALUES 
('2024-06-03 18:30:00', 0, 2, 4);

INSERT INTO historico (DtTime, nivelBaixo, fkLixeira, fkSensor) VALUES 
('2024-06-03 18:30:00', 0, 3, 5);
INSERT INTO historico (DtTime, nivelAlto, fkLixeira, fkSensor) VALUES 
('2024-06-03 18:30:00', 0, 3, 6);

INSERT INTO historico (DtTime, nivelBaixo, fkLixeira, fkSensor) VALUES 
('2024-06-03 18:30:00', 1, 4, 7);
INSERT INTO historico (DtTime, nivelAlto, fkLixeira, fkSensor) VALUES 
('2024-06-03 18:30:00', 1, 4, 8);

-- DIA 4 do 6
INSERT INTO historico (DtTime, nivelBaixo, fkLixeira, fkSensor) VALUES 
('2024-06-04 18:30:00', 1, 1, 1);
INSERT INTO historico (DtTime, nivelAlto, fkLixeira, fkSensor) VALUES 
('2024-06-04 18:30:00', 0, 1, 2);
INSERT INTO historico (DtTime, nivelBaixo, fkLixeira, fkSensor) VALUES 
('2024-06-04 18:30:00', 1, 2, 3);
INSERT INTO historico (DtTime, nivelAlto, fkLixeira, fkSensor) VALUES 
('2024-06-04 18:30:00', 0, 2, 4);
INSERT INTO historico (DtTime, nivelBaixo, fkLixeira, fkSensor) VALUES 
('2024-06-04 18:30:00', 0, 3, 5);
INSERT INTO historico (DtTime, nivelAlto, fkLixeira, fkSensor) VALUES 
('2024-06-04 18:30:00', 0, 3, 6);
INSERT INTO historico (DtTime, nivelBaixo, fkLixeira, fkSensor) VALUES 
('2024-06-04 18:30:00', 1, 4, 7);
INSERT INTO historico (DtTime, nivelAlto, fkLixeira, fkSensor) VALUES 
('2024-06-04 18:30:00', 1, 4, 8);


-- DIA 5 do 6
INSERT INTO historico (DtTime, nivelBaixo, fkLixeira, fkSensor) VALUES 
('2024-06-05 18:30:00', 0, 1, 1);
INSERT INTO historico (DtTime, nivelAlto, fkLixeira, fkSensor) VALUES 
('2024-06-05 18:30:00', 0, 1, 2);
INSERT INTO historico (DtTime, nivelBaixo, fkLixeira, fkSensor) VALUES 
('2024-06-05 18:30:00', 1, 2, 3);
INSERT INTO historico (DtTime, nivelAlto, fkLixeira, fkSensor) VALUES 
('2024-06-05 18:30:00', 0, 2, 4);
INSERT INTO historico (DtTime, nivelBaixo, fkLixeira, fkSensor) VALUES 
('2024-06-05 18:30:00', 0, 3, 5);
INSERT INTO historico (DtTime, nivelAlto, fkLixeira, fkSensor) VALUES 
('2024-06-05 18:30:00', 0, 3, 6);
INSERT INTO historico (DtTime, nivelBaixo, fkLixeira, fkSensor) VALUES 
('2024-06-05 18:30:00', 1, 4, 7);
INSERT INTO historico (DtTime, nivelAlto, fkLixeira, fkSensor) VALUES 
('2024-06-05 18:30:00', 0, 4, 8);







insert into historico (nivelBaixo,fkLixeira, fkSensor) values 
(1 ,1, 1);
insert into historico (nivelAlto,fkLixeira, fkSensor) values 
(1 ,1, 2);

insert into historico (nivelBaixo, fkLixeira, fkSensor) values 
(1 ,2, 3);
insert into historico (nivelAlto, fkLixeira, fkSensor) values 
(0 ,2, 4);

insert into historico (nivelBaixo, fkLixeira, fkSensor) values 
(0 ,3, 5);
insert into historico (nivelAlto, fkLixeira, fkSensor) values 
(0 ,3, 6);


-- drop table historico;
-- drop table Lixeira;
-- drop table Usuario;
-- drop table Empresa;
-- drop database smartbin;


-- TESTE DE ALERTA LIXEIRA NIVEL ALTO | (INSERINDO MAIS UMA NIVEL ALTO) DESCOMENTE PARA TESTAR E RODE NOVAMENTE NO RAIO

-- criação lixeira

-- criação dos sensores

select * from lixeira;



-- SELECT QUE LISTA LIXEIRA POR EMPRESA
SELECT 
    Lixeira.idLixeira, 
    MAX(historico.DtTime) as DtTime,
    MAX(historico.nivelBaixo) as nivelBaixo, 
    MAX(historico.nivelAlto) as nivelAlto,
    Lixeira.nomeLixeira,
    Lixeira.cep, 
    Lixeira.numero, 
    Lixeira.Complemento, 
    Empresa.nomeEmpresa as Empresa
FROM 
    historico 
JOIN 
    Lixeira ON historico.fkLixeira = Lixeira.idLixeira
JOIN 
    Empresa ON Lixeira.fkEmpresa = Empresa.idEmpresa
WHERE 
    Empresa.idEmpresa = 1
GROUP BY 
    Lixeira.idLixeira,
    Lixeira.nomeLixeira,
    Lixeira.cep, 
    Lixeira.numero, 
    Lixeira.Complemento, 
    Empresa.nomeEmpresa;
    
    
    
    -- ----------------------------------------
    

SELECT 
    Lixeira.idLixeira, 
    MAX(historico.DtTime) as DtTime,
    MAX(historico.nivelBaixo) as nivelBaixo, 
    MAX(historico.nivelAlto) as nivelAlto,
    CASE 
        WHEN DAYOFWEEK(MAX(historico.DtTime)) = 1 THEN 'Domingo'
        WHEN DAYOFWEEK(MAX(historico.DtTime)) = 2 THEN 'Segunda-feira'
        WHEN DAYOFWEEK(MAX(historico.DtTime)) = 3 THEN 'Terça-feira'
        WHEN DAYOFWEEK(MAX(historico.DtTime)) = 4 THEN 'Quarta-feira'
        WHEN DAYOFWEEK(MAX(historico.DtTime)) = 5 THEN 'Quinta-feira'
        WHEN DAYOFWEEK(MAX(historico.DtTime)) = 6 THEN 'Sexta-feira'
        WHEN DAYOFWEEK(MAX(historico.DtTime)) = 7 THEN 'Sábado'
    END AS dia
FROM 
    historico 
JOIN 
    Lixeira ON historico.fkLixeira = Lixeira.idLixeira
JOIN 
    Empresa ON Lixeira.fkEmpresa = Empresa.idEmpresa
WHERE 
    Empresa.idEmpresa = '12345'
GROUP BY 
    Lixeira.idLixeira,
    Empresa.nomeEmpresa;
    
    
    
    -- INTERVALO POR DIA NORMAL
    
    
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
    Empresa.idEmpresa = '12345'
    AND historico.DtTime >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)
ORDER BY 
    Lixeira.idLixeira, historico.DtTime;
    
    
    
    
    
    
    -- SOLUÇÃO DE INTERVALO POR TEMPO
    
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
    Empresa.idEmpresa = 12345
    AND historico.DtTime >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)
    AND HOUR(historico.DtTime) BETWEEN 18 AND 19
ORDER BY 
    Lixeira.idLixeira, historico.DtTime;
    
    
    
    -- GRAFICO POR LIXEIRA
    
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
    Empresa.idEmpresa = '12345' and idLixeira = 1
    AND historico.DtTime >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)
    AND HOUR(historico.DtTime) BETWEEN 18 AND 19

ORDER BY 
    Lixeira.idLixeira, historico.DtTime
    ;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    



-- -------------------------- ZONA DE TESTE AQUI EM BAIXO ------------------------ 
SELECT 
    historico.DtTime,
    SUM(CASE WHEN historico.nivelBaixo = 0 AND historico.nivelAlto = 0 THEN 1 ELSE 0 END) as nivelBaixo,
    SUM(CASE WHEN historico.nivelBaixo = 1 AND historico.nivelAlto = 0 THEN 1 ELSE 0 END) as nivelMedio,
    SUM(CASE WHEN historico.nivelBaixo = 1 AND historico.nivelAlto = 1 THEN 1 ELSE 0 END) as nivelAlto
FROM 
    historico 
JOIN 
    Lixeira ON historico.fkLixeira = Lixeira.idLixeira
JOIN 
    Empresa ON Lixeira.fkEmpresa = Empresa.idEmpresa
WHERE 
    Empresa.idEmpresa = 12345 AND Bairro LIKE "%" AND DtTime >= '2024-06-03' AND DtTime < '2024-06-06'
GROUP BY 
    historico.DtTime
ORDER BY 
    historico.DtTime;
    
    
    
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
        Empresa.idEmpresa = 12345 AND Bairro LIKE "%" AND DtTime > '2024-06-01' AND DtTime < '2024-06-09'
    GROUP BY 
        Lixeira.idLixeira, historico.DtTime
) as subconsulta
GROUP BY 
    subconsulta.DtTime
ORDER BY 
    subconsulta.DtTime;
