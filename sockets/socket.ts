import { Socket } from 'socket.io';

export const desconectar = ( cliente: Socket ) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
};

export const mensaje = ( cliente: Socket ) => {
    cliente.on('mensaje', ( payload: any, callback ) =>{
        console.log('Mensaje recibido ', payload);
    }); 
}