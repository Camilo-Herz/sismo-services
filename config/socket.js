const server = require('./app');
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:4200",
        credentials: true
    }
});

// configuracion del socket
const webSocket = {
    conectionSocket: () => {
        io.on('connection', (socket) => {

            // id que se genera cada que se crea una conexion con el front
            const idHandShake = socket.id

            // valor que se esta enviando por el web socket
            const { nameRoom } = socket.handshake.query;

            // une los usuarios a una sala especifica
            socket.join(nameRoom);
            console.log(`Dispositivo: ${idHandShake} se unio a la sal : ${nameRoom}`);

            // enviar y emitir datos -> recordar que event es el key
            socket.on('event', (res) => {
                const data = res;
                console.log('datos recibidos: ', res)

                // emitir datos
                socket.to(nameRoom).emit('event', [
                    {
                        name: 'Nuevo participante',
                        value: "Bienvenido"
                    }
                ]);
                // socket.emit(nameRoom).emit('event', {datoEmitidoBack: 'toma tus putos datos'}); // emite incluso al usuario que envio desde el front

            });
        });
    },
    emitSocket: (valueIn, id) => {
        io.emit('event', { name: id, value: valueIn });
    }
}

module.exports = webSocket;
