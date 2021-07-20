const express = require("express");
const cors = require("cors"); //Para evitar restricciones desde peticiones externas
const { dbConnection } = require("../database/config");
//crear clase para el servidor
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //conexion DB
    this.conectarDB();
    //middleware
    this.middlewares();
    //rutas
    this.routes();
  }

  //conexion DB
  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //directorio público
    this.app.use(express.static("public"));

    //CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());
  }

  //funcion para rutas
  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }
  //funcion para escuchar el puerto
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor online", this.port);
    });
  }
}

module.exports = Server;
