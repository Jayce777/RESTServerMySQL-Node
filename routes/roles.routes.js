const { check } = require('express-validator');
const {Router} =require('express');


const router=Router();

const {
    ValidaCampos,
    ValidaJWT,
    ValidaRoles
   
} = require('../middlewares');

const{
    RolesMysqlGet, 
    RolesMysqlPost
}=require('../controllers/roles.controller');

router.get('/',RolesMysqlGet);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    ValidaCampos

],RolesMysqlPost);


module.exports=router;