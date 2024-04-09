create database SmartBin;
use SmartBin;

create table Empresa (
Cnpj char (14) primary key,
NomeEmpresa varchar(45),
RazaoSocial varchar (50),
QtdLixeiras int);
desc Empresa;

insert into Empresa values
 (012345678965412, 'Smartbin','Sustentavel', 3);
 
 select * from Empresa;

create table Usuario (
cpf char(11) primary key,
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
Logradouro varchar (50),
Bairro varchar(50),
Complemento varchar(45),
fkEmpresa char(14),
	constraint fkLixeiraEmpresa foreign key (fkEmpresa)
    references Empresa(Cnpj)
);
desc lixeira;

insert into Lixeira (Logradouro,Bairro,Complemento,fkEmpresa) values 
('Rua Principal', 'Centro', 'Ao lado do MacDonalds', 012345678965412),
('Avenida dos Pássaros', 'Parque das Árvores', 'Em frente ao Bar do Zé', 012345678965412),
('Rua das Flores', 'Jardim Botânico', 'Ao lado da Faculdade SPTech', 012345678965412);

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
('2024-04-08 15:37', 0, 0, 3)
;

select historico.DtTime, historico.Metade, historico.cheia, Lixeira.Logradouro, Lixeira.Bairro, Lixeira.Complemento, Lixeira.fkEmpresa 
	from historico join Lixeira
    on historico.fkLixeira = Lixeira.idLixeira
    join empresa on lixeira.fkEmpresa = empresa.Cnpj;
