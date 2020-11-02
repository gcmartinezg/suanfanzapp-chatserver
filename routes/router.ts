import { Router, Request, Response } from 'express';
import { mysqlConnection, desconectarDB } from '../classes/dbconnection';
import { User } from '../classes/User';

const router = Router();

// Otras rutas preconfiguradas para los sockets
/*router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });
});

router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) =>{
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});*/


mysqlConnection.connect((err) => {
    if(!err)
        console.log('Conexion establecida con exito');
    else
        console.log('La conexion a la DB fallo ' + JSON.stringify(err, undefined, 2));
    
});

// CRUD ejemplo
/*
// Get all employees
router.get('/employees', (request: Request, response: Response) => {
    mysqlConnection.query("SELECT * FROM employee", (err, rows, fields) => {
        if(!err){
            console.log(rows);
            response.json({
                rows
            });
        }
        else 
            console.log(err);
    });
});

// Get an employee
router.get('/employees/:id', (request: Request, response: Response) => {
    mysqlConnection.query(`SELECT * FROM employee WHERE EmpId = ${request.params.id}`, ( err, rows, fields ) => {
        if(!err)
            response.json(rows)
        else
            console.log(err);
    });
});

// Delete any employee by id
router.delete('/employees/:id', (request: Request, response: Response) => {
    mysqlConnection.query(`DELETE FROM employee WHERE EmpID = ${request.params.id}`, (err, rows, fields) => {
        if(!err)
            response.send('Employee with id '+request.params.id+' deleted succesfully');
        else 
            console.log(err);
    });
});*/

// Login mail Rest
router.post('/user/login-mail', (req: Request, res: Response) => {
    let correo = req.body.correo;
    let contrasena = req.body.contrasena;
    if(correo.trim() == null || correo.trim() == ''){
        res.json({
            message: 'Ingrese un correo'
        });
    }
    else if(contrasena.trim() == null || contrasena.trim() == ''){
        res.json({
            message: 'Ingrese su clave'
        });
    }
    let query = 'select * from user where correo = ? and contrasena = ? limit 1;';

    mysqlConnection.query(query, [correo, contrasena], (err, rows, fields) => {
        //console.log(rows.length);
        if(rows.length > 0){
            //console.log(rows);
            res.json({
                user: rows[0],
                message: 'Sesion iniciada exitosamente'
            });
        }else
            res.json({
                user: null,
                message: 'Credenciales incorrectas'
            });
    });
    //desconectarDB(); 
});

// Login phone Rest
router.post('/user/login-phone', (req: Request, res: Response) => {
    let prefix = req.body.id_prefijo;
    let phone = req.body.telefono;
    let contrasena = req.body.contrasena;
    if(phone < 1){
        res.json({
            message: 'Ingrese un teléfono válido'
        });
    }
    else if(contrasena.trim() == null || contrasena.trim() == ''){
        res.json({
            message: 'Ingrese su clave'
        });
    }
    else if(prefix < 1){
        res.json({
            message: 'Ingrese su prefijo'
        });
    }

    let query = 'SELECT * FROM user u ' + 
    'where u.id_prefijo = ? and u.telefono = ? and u.contrasena = ? limit 1;';

    mysqlConnection.query(query, [prefix, phone, contrasena], (err, rows, fields) => {
        //console.log(rows.length);
        if(rows.length > 0){
            res.json({
                user: rows[0],
                message: 'Sesion iniciada exitosamente'
            });
        }else
            res.json({
                user: null,
                message: 'Credenciales incorrectas'
            });
    });
    //desconectarDB(); 
});

router.post('/user', (request: Request, response: Response) => {
    let nombre = request.body.nombre;
    let apellido = request.body.apellido;
    let telefono = request.body.telefono;
    let id_prefijo = request.body.idPrefijo;
    let descripcion = request.body.descripcion;
    let url_imagen = request.body.urlImagen;
    let correo = request.body.correo;
    let contrasena = request.body.contrasena;
    let query = 'insert into user(nombre, apellido, telefono, id_prefijo, descripcion, url_imagen, correo, contrasena) values (?, ?, ?, ?, ?, ?, ?, ?);';
    mysqlConnection.query(query, [nombre, apellido, telefono, id_prefijo, descripcion, url_imagen, correo, contrasena], (err, rows, fields) => {
        if(!err){
            response.json({
                status: 200,
                message: 'User created successfully!'
            });
               
        }else 
            console.log(err);    
    });
    //desconectarDB(); 
});

// Get all prefijos
router.get('/prefijo', (request: Request, response: Response) =>{
    let query = 'select * from prefijo';
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err)
            response.json(rows)
        else 
            console.log(err);
    });
    //desconectarDB(); 
});

// find phone number
router.post('/verify-phone', (request: Request, response: Response) =>{
    console.log(request.body);
    let prefix = request.body.id_prefijo;
    let phone = request.body.telefono;
    
    let query = 'SELECT distinct u.id_prefijo, u.telefono FROM user u ' + 
    'where u.id_prefijo = ? and u.telefono = ?;';
    
    mysqlConnection.query(query, [prefix, phone], (err, rows, fields) => {
        if(rows.length > 0){
            response.json(true);
        } else {
            response.json(false);
        }
    });
    //desconectarDB(); 
});

// find mail
router.post('/verify-mail', (request: Request, response: Response) =>{
    let correo = request.body.mail;

    let query = 'SELECT distinct u.correo FROM user u where u.correo = ?;';

    mysqlConnection.query(query, [correo], (err, rows, fields) => {
        console.log(correo);
        if(rows.length > 0){
            response.json(true);
        } else {
            response.json(false);
        }
    });
    //desconectarDB(); 
});
    
export default router;