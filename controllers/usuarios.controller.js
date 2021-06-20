const bcryptjs=require('bcryptjs');
const{response,request} =require('express');

const estadotrue=true;


const { DBConnectionMySQL } = require('../database/config.db');

const UsuariosGet=async(req=request, res=response)=> {
    const db = await DBConnectionMySQL();
    await db.query('SELECT * FROM usuario WHERE estado= ?',[estadotrue],
    (err,results,fields)=>{

        if(err){
            return res.status(500).json({
                msg:'No se pudo obtener los usuarios, comuníquese con el Administrador'
             });
        }

        const usuarios=[];
        Object.keys(results).forEach(key=>{
            const usuario=results[key];
            const {id:uid,nombre,correo}=usuario;
            usuarios.push({uid,nombre,correo});
        });
       
        res.json({
            usuarios
        });

    });

   
  
}

const UsuariosPost= async(req, res=response)=> {
    const db = await DBConnectionMySQL();
    const {nombre,correo,contrasena,rol}=req.body;
    //encriptar contraseña
    const salt=bcryptjs.genSaltSync(10);
    const pass = bcryptjs.hashSync(contrasena, salt);
   // const date = new Date();
    //date.setHours(date.getHours() - 5);
    const data={
        nombre,
        correo,
        contrasena:pass,
        rol
    }
    //guardar en base de datos
   
        await db.query('INSERT INTO usuario set ?',data,(err,results)=>{

            if(err){
                console.log(error);
               return res.status(500).json({
                    msg:'No se pudo crear al usuario, comuníquese con el Administrador'
                 });
            }

            res.status(201).json({
                msg:'Usuario creado crrectamente',
                uid:results.insertId
               });

        });
       
}

const UsuariosPut=  (req, res=response)=> {

    const id=req.params.id;

    res.json({
        id,
        estado:'PUT - Controlador'
    });
}

const UsuariosDelete=  (req,  res=response)=> {
    res.json({
        id:1,
        estado:'DELETE  - Controlador'
    });
}


module.exports={
    UsuariosGet,
    UsuariosPost,
    UsuariosPut,
    UsuariosDelete
};