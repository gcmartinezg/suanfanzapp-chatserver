import { Router, Request, Response } from 'express';
import { mysqlConnection } from '../classes/dbconnection';

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

router.post('/user', (request: Request, response: Response) => {
    let nombre = request.body.nombre;
    let apellido = request.body.apellido;
    let telefono = request.body.telefono;
    let id_prefijo = request.body.idPrefijo;
    let descripcion = request.body.descripcion;
    let url_imagen = request.body.urlImagen;
    let correo = request.body.correo;
    let contrasena = request.body.contrasena;
    let query = `insert into user(nombre, apellido, telefono, id_prefijo, descripcion, url_imagen, correo, contrasena)
        values ('${nombre}', '${apellido}', ${telefono}, ${id_prefijo}, '${descripcion}', '${url_imagen}', '${correo}', '${contrasena}');`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err)
            response.json({
                status: 200,
                message: 'User created successfully!'
            });    
        else 
            console.log(err);    
    });
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
});

export default router;