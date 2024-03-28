create database SmartBin;
use SmartBin;

create table Empresa (
IdEmpresa int primary key auto_increment,
Cnpj char (14),
Senha varchar (50),
RazaoSocial varchar (50),
QtdLixeiras int);
desc Empresa;

insert into Empresa values
 (default, 012345678965412, 'Binlixeira321', 'Sustentavel', 3);
 
 select * from Empresa;

create table Lixeira (
IdLixeira int primary key auto_increment,
Localização varchar (50),
Nivel varchar (50));
desc lixeira;

insert into Lixeira values
(default, 'Vila Nova', 'Cheia' );

select * from Lixeira;

create table Usuário (
IdUsuario int primary key auto_increment,
TipoUsuario varchar (50) constraint chkTipo check (TipoUsuario in ('Administrador', 'Comum')),
NomeUsuario varchar (50),
EmailUsuario varchar (50),
Senha varchar (15)
);
desc Usuário;

Insert into Usuário values
(Default, 'Administrador', 'Ricardo', 'ricardo@gmail.com', 'Alegria54321');

select * from Usuário;






