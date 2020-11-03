import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = ( cliente: Socket ) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
};

// Escuchar mensajes y emitir el mismo a todos los clientes conectados
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('mensaje', ( payload: any, callback ) =>{
        console.log('Mensaje recibido ', payload);
        io.emit('mensaje-nuevo', payload);
    }); 
}