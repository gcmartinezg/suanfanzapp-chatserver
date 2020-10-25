import mysql from 'mysql';

// mysql connection

export const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yourpassword',
    database: 'db_suanfanzapp'
});

export function disconnect(){
    mysqlConnection.end( function(err){
        if(!err)
        console.log('Conexion terminada con exito');
        else 
        console.log('Desconexion fallida error => '+err);
    } );
}