import Server from "./classes/server";
import router  from "./routes/router";
import bodyParser from "body-parser";
import cors from 'cors';

const server = new Server();

// BodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() ); // devuelve un objeto json

//CORS
server.app.use( cors({ origin:true, credentials: true }) );

// RUTAS
server.app.use('/', router);

server.start( function(){
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});

