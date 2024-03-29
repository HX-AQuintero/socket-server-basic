//Servidor de Express
const express = require('express');

//Servidor de sockets
const { createServer } = require('http');

//Configuración del socket server
const socketio = require('socket.io');

const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Http server
    this.server = createServer(this.app);

    //Config sockets
    this.io = socketio(this.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
  }
  middlewares() {
    //Desplegar el directorio public
    this.app.use(express.static(path.resolve(__dirname, '../public')));

    //CORS
    this.app.use(cors());
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    //Inicializar Middlewares
    this.middlewares();

    //Inicializar sockets
    this.configurarSockets();

    //Inicializar Server
    this.server.listen(this.port, () => {
      console.log('Listening on port: ', this.port);
    });
  }
}

module.exports = Server;
