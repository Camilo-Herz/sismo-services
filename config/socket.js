const server = require('./app');
const io = require("socket.io")(server, {
    cors: {
        origin: ["https://sismoapp.herokuapp.com", "http://localhost:4200", "http://localhost:3700"],
        credentials: true
    }
});

// configuracion del socket
const webSocket = {
    conectionSocket: () => {
        // Register a callback function to run when we have an individual connection
        // This is run for each individual user that connects
        // io.use(function (socket, next) {
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
                const receivedData = res;
                console.log('datos recibidos: ', receivedData)

                // emitir datos
                socket.to(nameRoom).emit('event', receivedData);
                // socket.emit(nameRoom).emit('event', {datoEmitidoBack: 'toma tus putos datos'}); // emite incluso al usuario que envio desde el front
            });
        });
    }
}

module.exports = webSocket;
