const {check}=require('express-validator');
const {Router} =require('express');

const router=Router();

const{
    ValidaCampos
}=require('../middlewares');

const {
    UsuariosGet,
    UsuariosPost,
    UsuariosPut,
    UsuariosDelete
}=require('../controllers/usuarios.controller');
const {
     RoleExiste,
     ExisteEmail
} = require('../helpers/custom-validator');


router.get('/', UsuariosGet);

router.post('/',[
    check('rol').custom(RoleExiste),
    check('correo').custom(ExisteEmail),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('contrasena','La contrasena es obligatorio').not().isEmpty(),
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('correo','El correo no es válido').isEmail(),
    ValidaCampos
],UsuariosPost);


router.put('/:id',UsuariosPut);

router.delete('/',UsuariosDelete);


module.exports=router;

