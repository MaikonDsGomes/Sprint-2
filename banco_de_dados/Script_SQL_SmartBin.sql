create database SmartBin;
use SmartBin;

create table Empresa (
idEmpresa int primary key auto_increment,
Cnpj char (14),
NomeEmpresa varchar(45),
RazaoSocial varchar (50),
QtdLixeiras int);
desc Empresa;

insert into Empresa(Cnpj, NomeEmpresa, RazaoSocial, QtdLixeiras) values
 (012345678965412, 'Smartbin','Sustentavel', 3);
 
 select * from Empresa;

create table Usuario (
idUsuario int primary key auto_increment,
cpf char(11),
TipoUsuario varchar (50),
constraint chkTipo check (TipoUsuario in ('Administrador', 'Comum')),
NomeUsuario varchar (50),
EmailUsuario varchar (50),
	constraint chEmailUsuario check (EmailUsuario like '%@%' and EmailUsuario like '%.com'),
Senha varchar (15),
fkEmpresa char(14), 
	constraint fkUsuarioEmpresa foreign key (fkEmpresa)
    references empresa(Cnpj)
);
desc Usuario;

Insert into Usuario values
(12345678901, 'Administrador', 'Ricardo', 'ricardo@gmail.com', 'Alegria54321', 012345678965412);

select * from Usuario;

create table Lixeira (
IdLixeira int primary key auto_increment,
nomeLixeira varchar(45),
cep char(9),
numero varchar(45),
Complemento varchar(45),
fkEmpresa char(14),
	constraint fkLixeiraEmpresa foreign key (fkEmpresa)
    references Empresa(Cnpj)
);
desc lixeira;

insert into Lixeira (cep,numero,Complemento,fkEmpresa) values 
('123456789', '2801', '1 andar', 012345678965412),
('123456787', '589', '20 andar', 012345678965412),
('123456788', '257', '11 andar', 012345678965412);

select * from Lixeira;

create table historico(
idHistorico int primary key auto_increment,
DtTime datetime,
Metade bit(1),
Cheia bit(1),
fkLixeira int,
	constraint fkHistoricoLixeira foreign key (fkLixeira)
    references Lixeira(idLixeira)
);

insert into historico (DtTime, Metade, Cheia, fkLixeira) values
('2024-08-04 11:00', 1, 0, 1),
('2024-05-24 12:00', 1, 1, 2),
('2024-04-08 15:37', 0, 0, 3);

select historico.DtTime, historico.Metade, historico.cheia, Lixeira.cep, Lixeira.numero, Lixeira.Complemento, Lixeira.fkEmpresa 
	from historico join Lixeira
    on historico.fkLixeira = Lixeira.idLixeira
    join empresa on lixeira.fkEmpresa = empresa.Cnpj;

drop table historico;
drop table Lixeira;
drop table Usuario;
drop table Empresa;