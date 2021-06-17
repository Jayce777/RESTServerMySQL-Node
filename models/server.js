
require('dotenv').config();
const express = require('express');
const cors = require('cors');


//configuración conexiones

const{DBConnectionMySQL}=require('../database/config.db');

//rutas
const routeroles=require('../routes/roles.routes');

class Server{

    constructor(){
        this.app= express();
        this.port=process.env.PORT;

        this.paths={

            roles:'/api/roles'
        }
        

        //Middlewares
        this.middlewarepublic();

        //dispara las rutas
        this.routes();
        
        //conexiones
        this.connectionMySQL();
    }

    middlewarepublic(){

        this.app.use(express.static('public'));

        this.app.use(cors());

        this.app.use(express.json());
    }


    async connectionMySQL(){

        await DBConnectionMySQL();
    }
    //funciones para las rutas
    routes(){

       this.app.use(this.paths.roles,routeroles);
          
    }

    listen(){
        
        this.app.listen(this.port, () => {
            console.log(`REST Server esuchando en puerto: ${this.port}`);
        });
    }
}


module.exports=Server;