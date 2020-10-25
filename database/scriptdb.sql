CREATE TABLE prefijo(
id_prefijo integer NOT NULL AUTO_INCREMENT,
prefijo integer,
CONSTRAINT prefijo_pk  PRIMARY KEY(id_prefijo)
);

CREATE TABLE tipo_usuario(
id_admin integer NOT NULL AUTO_INCREMENT,
administrador varchar(20),
CONSTRAINT admin_pk  PRIMARY KEY(id_admin)
);

CREATE TABLE estado_usuario(
id_estado integer NOT NULL AUTO_INCREMENT,
estado varchar(20),
CONSTRAINT estado_pk  PRIMARY KEY(id_estado)
);

CREATE TABLE tipo_chat(
id_tipo integer NOT NULL AUTO_INCREMENT,
tipo varchar(20),
CONSTRAINT tchat_pk  PRIMARY KEY(id_tipo)
);

CREATE TABLE tipo_mensaje(
id_tipo integer NOT NULL AUTO_INCREMENT,
tipo varchar(20),
CONSTRAINT tmensjae_pk  PRIMARY KEY(id_tipo)
);

CREATE TABLE estado_mensaje(
id_estado integer NOT NULL AUTO_INCREMENT,
estado varchar(20),
CONSTRAINT emensaje_pk  PRIMARY KEY(id_estado)
);

CREATE TABLE chat(
id_chat integer NOT NULL AUTO_INCREMENT,
id_tipo integer,
fecha date,
CONSTRAINT chat_pk  PRIMARY KEY(id_chat),
CONSTRAINT tipoc_fk FOREIGN KEY(id_tipo) REFERENCES tipo_chat(id_tipo)
);

CREATE TABLE user(
id_user integer NOT NULL AUTO_INCREMENT,
nombre varchar(50),
apellido varchar(50),
telefono bigint,
id_prefijo integer,
descripcion varchar(50),
url_imagen longtext,
correo varchar(50),
contrasena varchar(50),
CONSTRAINT user_pk  PRIMARY KEY(id_user),
CONSTRAINT up_fk FOREIGN KEY (id_prefijo) REFERENCES prefijo(id_prefijo)
);

CREATE TABLE chat_user(
id_chat_user integer NOT NULL AUTO_INCREMENT,
id_user integer,
id_chat integer,
id_admin integer,
id_estado integer,
CONSTRAINT cuser_pk  PRIMARY KEY(id_chat_user),
CONSTRAINT cuu_fk FOREIGN KEY(id_user) REFERENCES user(id_user),
CONSTRAINT cchat_fk FOREIGN KEY(id_chat) REFERENCES chat(id_chat),
CONSTRAINT ctadmin_fk FOREIGN KEY(id_admin) REFERENCES tipo_usuario(id_admin),
CONSTRAINT cestado_fk FOREIGN KEY(id_estado) REFERENCES estado_usuario(id_estado)
);

CREATE TABLE mensaje(
id_mensaje integer NOT NULL AUTO_INCREMENT,
id_usuario integer,
id_chat integer,
id_tipo integer,
id_estado integer,
mensaje varchar(100),
fecha date,
url varchar(100),
CONSTRAINT mensaje_pk  PRIMARY KEY(id_mensaje),
CONSTRAINT muser_fk FOREIGN KEY(id_usuario) REFERENCES user(id_user),
CONSTRAINT mchat_fk FOREIGN KEY(id_chat) REFERENCES chat(id_chat),
CONSTRAINT mtipo_fk FOREIGN KEY(id_tipo) REFERENCES tipo_mensaje(id_tipo),
CONSTRAINT mestado_fk FOREIGN KEY(id_estado) REFERENCES estado_mensaje(id_estado)
);