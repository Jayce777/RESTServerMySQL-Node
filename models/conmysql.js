

//configuración conexiones


class ConexionMysql {
    constructor() {

        //conexiones
        this.connectionMySQL();

    }

    async connectionMySQL() {

        await DBConnectionMySQL();
    }
}

module.exports = ConexionMysql;