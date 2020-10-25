import mysql from 'mysql';

// mysql connection

export const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'pass',
    database: 'db_suanfanzapp'
});