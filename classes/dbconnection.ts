import mysql from 'mysql';

// mysql connection

export const mysqlConnection = mysql.createConnection({
    host: 'sql10.freemysqlhosting.net',
    port: 3306,
    user: 'sql10372632',
    password: 'EADQzKcIEZ',
    database: 'sql10372632'
});

export function desconectarDB(){
    mysqlConnection.end( function(err){
        if(!err)
        console.log('Conexion terminada con exito');
        else 
        console.log('Desconexion fallida error => '+err);
    } );
}