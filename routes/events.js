const { Router } = require("express");
const {validarCampos} = require('../middlewares/validar-campos');
const {actualizarEvento, crearEvento,eliminarEvento, getEventos} = require('../controllers/events');
const {check} = require('express-validator');
const {validarJWT} = require('../middlewares/validar-jwt');
const { isDate } = require("../helpers/isDate");

const router = Router();

/*
Events routes
    /api/events
*/


// Todas tienen que pasar por la validación deJWT
router.use(validarJWT);


// Obtener eventos
router.get('/',getEventos);

// Crear un nuevo evento
router.post(
    '/', 
    [
        // Middlewares
        check('title','El título es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ], 
    crearEvento);


// Actualizar evento
router.put('/:id',  actualizarEvento);



// Borrar evento

router.delete('/:id', eliminarEvento);


module.exports = router;