const { Users, Tasks } = require('../models/models');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    try {

        const user = await Users.findOne({
            username: username
        })
        
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = username;
            res.redirect('/home');
        } else {
            res.redirect('/login?err=0')
        }

    } catch(err) {
        res.redirect('/login?err=1')
    }

}

exports.register = async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    try {

        const checkedUser = await Users.findOne({
            username: username
        })

        if(checkedUser){
            res.status(409).redirect(`/register?err=2`);
            return;
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const user = new Users({
            username: username,
            password: hashedPass,
        })

        await user.save()

        req.session.user = username;
        res.redirect('/home');

    } catch(err) {
        res.redirect('/register?err=1')
    }

}

exports.getTask = async (req, res) => {
    const uuid = req.params.uuid;
    const username = req.session.user;

    const task = await Tasks.findOne({id: uuid});

    if(!task){
        res.status(404).send({error: `Esta tarea no existe`});
        return;
    }

    if(task.owner !== username){
        res.status(403).send({error: `No tienes permisos para acceder a esta tarea.`});
        return;
    }

    res.send(task);

}