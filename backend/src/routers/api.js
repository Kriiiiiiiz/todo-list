const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const path = require('path');

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

router.post('/newtask', (req, res) => {
    let notexists = true;
    let uuid = uuidv4() //Falta verificar que no existe en bd

    const title = req.body.title;
    const desc = req.body.desc;

    if (!title || !desc) {
        res.status(400).send({message: 'Falta título o descripción'})
        return;
    }

    if (title.lenght < 4 || desc.lenght < 4) {
        res.status(400).send({message: 'Título o descripción demasiado cortos'})
        return;
    }

    //Guardar en bd

    res.status(201).send({id:uuid, title:title, desc:desc})
})

router.get('/task/:uuid', (req, res) => {
    const uuid = req.params.uuid;

    if (!uuid) {
        res.status(400).send({message: 'Que intentas Jose ?'})
        return;
    }

    //Recibir tarea, comprobar dueño

    if (req.session.user !== user) {
        req.status(403).send({message: 'Esta tarea no te pertenece'})
        return;
    }

    res.send({id: task.uuid, title: task.title, desc: task.desc, status: task.status})
})

module.exports = router;