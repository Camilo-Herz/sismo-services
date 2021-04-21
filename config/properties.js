module.exports = {
    PORT: process.env.PORT,
    DB: 'mongodb+srv://user-opcua:Camilo1234@conectopcua.h7wtq.mongodb.net/mydatabase?retryWrites=true&w=majority',
    OPC_SERVER: "opc.tcp://localhost:4840",
    TAG_OPC: "ns=4;s=|var|CODESYS Control Win V3 x64.Application.PLC_PRG."
}