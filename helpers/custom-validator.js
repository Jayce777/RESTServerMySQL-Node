
const { DBConnectionMySQL } = require('../database/config.db');

const tables=['rol','usuario'];
const estadotrue=true;

const RoleExiste= async(rol=0)=>{
    const db = await DBConnectionMySQL();
    const existerol=await db.query(`SELECT * from ${tables[0]} where estado=${estadotrue} and id=?`,[rol]);
   
    
    if( existerol.length===0){
       
        throw new Error(`El rol ${rol} no existe`)
    }
  
};


const ExisteEmail=async (correo='')=>{
    const db = await DBConnectionMySQL();
    const existemail=await db.query(`SELECT * from ${tables[1]} where correo=?`,[correo]);
    console.log(existemail);    
    if(existemail.length!==0){
        // retona un status de error
        throw new Error(`El usuario con correo ${correo} ya ha sido registrado`)

    }
};

const ExisteUsuarioXId=async (id='')=>{
   
    const existeid= await Usuario.findById(id);
   // console.log(existemail);    
    if(!existeid){
        // retona un status de error
        throw new Error(`El id ${id} no pertenece a un usuario creado`)

    }
};

/*
Validadores de categorías
*/
const ExisteCategoriaXId=async (id='')=>{
    
  const existeidcategoria= await Categoria.findById(id);
   //console.log(existeidcategoria);    
    if(!existeidcategoria){
        // retona un status de error
        throw new Error(`El id ${id} no pertenece a una categoría creada`)

    }
};

/*
Validadores de productos
*/
const ExisteCategoriaProductoXId=async (categoria='')=>{
    
    const existeidcategoria= await Categoria.findById(categoria);
     //console.log(existeidcategoria);    
      if(!existeidcategoria){
          // retona un status de error
          throw new Error(`El id ${categoria} no pertenece a una categoría creada`)
  
      }
  };

  const ExisteProductoXId=async (id='')=>{
    
    const existeidproducto= await Producto.findById(id);
     //console.log(existeidcategoria);    
      if(!existeidproducto){
          // retona un status de error
          throw new Error(`El id ${id} no pertenece a un producto creado`)
  
      }
  };

module.exports={
    RoleExiste,
    ExisteEmail
}