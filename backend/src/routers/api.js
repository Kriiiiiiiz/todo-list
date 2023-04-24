const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const controllers = require(`../controller/controllers`);

// router.get('/:saludo', (req, res) => {
//     res.status(200)
//     .send(`
    
//     <p>Hola ${req.params.saludo}</p>
    
//     `)
// })

router.all('*', (req, res, next) => {
    if (!req.session) {
        res.status(403).send({message: 'No estas autenticado'})
        return;
    }
    next();
})

router.get('/user', controllers.getUser) //Recive la informacion del usuario
router.post('/addtask', controllers.addTask) //Añadir una tarea nueva.
router.get('/task/:uuid', controllers.getTask) //Recibir una tarea especifica a traves de su UUID.
router.get('/tasks', controllers.getTasks) //Permite seleccionar todas las tareas o filtrarlas por su estado. 
router.get('/tasks/:status', controllers.getTasksByStatus) //Busca todas las tareas de un usuario que tengan un mismo estado.
router.put('/task/:uuid', controllers.modifyTask) //Modifica una tarea con los datos proporcionados.
router.delete('/task/:uuid', controllers.removeTask) //Elimina una tarea.
router.patch('/task/archive/:uuid', controllers.archiveTask) //Pasa una tarea a completada.
router.patch('/task/complete/:uuid', controllers.completeTask) //Pasa una tarea a completada.
// 
module.exports = router;