create database SmartBin;
use SmartBin;

create table Empresa (
Cnpj char (14) primary key,
email varchar(60),
	constraint chkemail check (email like '%@%' and email like '%.com'),
Senha varchar (50),
RazaoSocial varchar (50),
QtdLixeiras int);
desc Empresa;

insert into Empresa values
 (012345678965412, 'smartbin@gmail.com', 'Binlixeira321', 'Sustentavel', 3);
 
 select * from Empresa;

create table Lixeira (
IdLixeira int primary key auto_increment,
Logradouro varchar (50),
Bairro varchar(50),
DtTime datetime,
Metade bit(1),
Cheia bit(1),
fkEmpresa char(14),
	constraint fkLixeiraEmpresa foreign key (fkEmpresa)
    references Empresa(Cnpj)
);
desc lixeira;

insert into Lixeira (Logradouro, Bairro, DtTime, Metade, Cheia, fkEmpresa) 
values 
('Rua Principal', 'Centro', '2024-04-04 08:30:00', 1, 0,012345678965412),
('Avenida dos Pássaros', 'Parque das Árvores', '2024-04-04 09:45:00', 0, 0, 012345678965412),
('Rua das Flores', 'Jardim Botânico', '2024-04-04 10:20:00', 1, 1, 012345678965412);

select * from Lixeira;

create table Usuario (
cpf char(11) primary key,
TipoUsuario varchar (50),
NomeUsuario varchar (50),
EmailUsuario varchar (50),
	constraint chEmailUsuario check (EmailUsuario like '%@%' and EmailUsuario like '%.com'),
Senha varchar (15),
constraint chkTipo check (TipoUsuario in ('Administrador', 'Comum')),
fkEmpresa char(14), 
	constraint fkUsuarioEmpresa foreign key (fkEmpresa)
    references empresa(Cnpj)
);
desc Usuário;

Insert into Usuário values
(12345678901, 'Administrador', 'Ricardo', 'ricardo@gmail.com', 'Alegria54321', 012345678965412);

select * from Usuário;






