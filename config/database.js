const { Sequelize } = require("sequelize"); // ORM= Object Relational Mapper.

// Uso de patron Singleton

class Database {
  constructor() {
    if (!Database.instance) {
      this.sequelize = new Sequelize("konrad_gourmet", "postgres", "1234", {
        host: "localhost",
        dialect: "postgres",
        logging: false,
        // en mi caso (Andres) es necesario establecer la conexión por puerto (opcional, por si no llega a funcionar) port: 5433,
      port: 5433,
      });
      Database.instance = this;
    }// cierra if 
    return Database.instance;
  }// cierra constructor
}

const instance = new Database();//Crea una instancia de Database.
//Gracias al Singleton, aunque se llame varias veces, siempre será la misma conexión.


Object.freeze(instance);//Congela el objeto instance para evitar que se modifique accidentalmente.
// Esto garantiza aún más la integridad de la instancia Singleton.



module.exports = instance.sequelize;
