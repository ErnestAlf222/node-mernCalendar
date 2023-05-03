/*
Rutas de usuarios / Auth
host + /api/auth
*/

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { Router} = require('express');
const {validarCampos} =  require('../middlewares/validar-campos');
const {check } = require('express-validator');
const router  = Router();
const {validarJWT} = require('../middlewares/validar-jwt');



router.post(
    '/new', 
    [
        //middleware
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos

    ] ,
    crearUsuario );


router.post(
    '/',
    [
        //middleware
        check('email','El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos



    ],
    loginUsuario);

router.get('/renew', validarJWT , revalidarToken);


module.exports = router;
