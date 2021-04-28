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

            socket.on("disconnect", (reason) => {
                console.log('cliente desconectado: ', socket.id, 'razon: ', reason);
            });

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
                
                // emitir datos al back local
                socket.to(undefined).emit('event', {
                    "name": "Germany",
                    "value": Math.random() * (100 - 10) + 10
                });

                // emitir datos
                socket.to(nameRoom).emit('event', {
                    "name": "Germany",
                    "value": Math.random() * (100 - 10) + 10
                }
                );
                socket.to(nameRoom).emit('event', {
                    "name": "Youn",
                    "value": Math.random() * (100 - 10) + 10
                }
                );
                // socket.emit(nameRoom).emit('event', {datoEmitidoBack: 'toma tus putos datos'}); // emite incluso al usuario que envio desde el front
            });
        });
    }
}

module.exports = webSocket;
