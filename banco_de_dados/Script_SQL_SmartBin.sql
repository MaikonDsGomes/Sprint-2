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
fkEmpresa int, 
	constraint fkUsuarioEmpresa foreign key (fkEmpresa)
    references empresa(idEmpresa)
);
desc Usuario;

Insert into Usuario values
(default, 12345678901, 'Administrador', 'Ricardo', 'ricardo@gmail.com', 'Alegria54321', 1);

select * from Usuario;

create table Lixeira (
IdLixeira int primary key auto_increment,
nomeLixeira varchar(45),
cep char(9),
numero varchar(45),
Complemento varchar(45),
fkEmpresa int,
	constraint fkLixeiraEmpresa foreign key (fkEmpresa)
    references Empresa(idEmpresa)
);
desc lixeira;

insert into Lixeira (cep,numero,Complemento,fkEmpresa) values 
('123456789', '2801', 'Em frente a APAE', 1),
('123456787', '589', 'Do lado do Digital Building', 1),
('123456788', '257', 'Em frente ao Starbucks', 1);

select * from Lixeira;

create table historico(
idHistorico int primary key auto_increment,
DtTime timestamp not null default current_timestamp,
Metade bit(1),
Cheia bit(1),
fkLixeira int,
	constraint fkHistoricoLixeira foreign key (fkLixeira)
    references Lixeira(idLixeira)
);

insert into historico(Cheia, fkLixeira) values
(1, 1);

select historico.DtTime as "Data e Hora", historico.cheia, Lixeira.cep, Lixeira.numero, Lixeira.Complemento, Empresa.nomeEmpresa as Empresa
	from historico join Lixeira
    on historico.fkLixeira = Lixeira.idLixeira
    join empresa on lixeira.fkEmpresa = empresa.Cnpj;
    

select * from historico;

drop table historico;
drop table Lixeira;
drop table Usuario;
drop table Empresa;
drop database smartbin;