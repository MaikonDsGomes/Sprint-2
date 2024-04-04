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
Logradouro varchar (50),
Bairro varchar(50),
DtTime datetime,
Nivel varchar (50));
desc lixeira;

insert into Lixeira (Logradouro, Bairro, DtTime, Nivel) 
values 
('Rua Principal', 'Centro', '2024-04-04 08:30:00', 'Baixo'),
('Avenida dos Pássaros', 'Parque das Árvores', '2024-04-04 09:45:00', 'Médio'),
('Rua das Flores', 'Jardim Botânico', '2024-04-04 10:20:00', 'Alto');

select * from Lixeira;

create table Usuário (
IdUsuario int primary key auto_increment,
TipoUsuario varchar (50),
NomeUsuario varchar (50),
EmailUsuario varchar (50),
Senha varchar (15),
constraint chkTipo check (TipoUsuario in ('Administrador', 'Comum'))
);
desc Usuário;

Insert into Usuário values
(Default, 'Administrador', 'Ricardo', 'ricardo@gmail.com', 'Alegria54321');

select * from Usuário;






