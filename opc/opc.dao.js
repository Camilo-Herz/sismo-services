
const { AttributeIds, OPCUAClient, TimestampsToReturn } = require('node-opcua');

const controllerOPC = require('./opc.controller');
const endpointUrl = require('../config/properties').OPC_SERVER;
const pathNodeId = require('../config/properties').TAG_OPC;

exports.conectOPC = async () => {

    try {
        // Cliente OPCUA
        const client = OPCUAClient.create();

        // conexion perdidia y se intenta reconectar
        client.on("backoff", (retry, delay) => {
            console.log("reconectando con el endpoint ", endpointUrl, " intento ", retry);
        });

        // conexion correcta
        console.log("Conectando...");
        await client.connect(endpointUrl);
        console.log("Conexion realizada con exito a ", endpointUrl);

        // iniciar la sesion para interactuar con el servidor opcua
        const session = await client.createSession();
        console.log("sesion iniciada :)");

        // crear una subcripcion a la variable que queremos monitorear
        const subscriotion = await session.createSubscription2({
            requestedPublishingInterval: 200, //intervalo de tiempo para publicar
            requestedMaxKeepAliveCount: 20, // cuantas veces va a intentar tener la conexion activa
            publishingEnabled: true //habilita la publicacion de solucitudes
        });

        // parametros de monitoreo
        const parameters = {
            samplingInterval: 50, //tiempo de muestreo
            discardOldest: true, //indicador para descartar datos historicos
            queueSize: 100 //tamaño de la cola antes de empezar a descartar
        };

        var ids = ["Camilo", "Kevin", "Andres", "Sofia", "Paola"];
        ids.forEach(async (id) => {
            // monitoreo de las variables de OPC
            const itemToMonitor = {
                nodeId: pathNodeId + id, //variabel a monitorear
                AttributeId: AttributeIds.Value
            };
            const monitoredItem = await subscriotion.monitor(itemToMonitor, parameters, TimestampsToReturn.Both);
            monitoredItem.on("changed", (dataValue) => {
                controllerOPC.saveDataOPC(dataValue.value.value, id);
            });
        });

    } catch (error) {
        console.log("Error" + error);
        process.exit(-1);
    }
}
