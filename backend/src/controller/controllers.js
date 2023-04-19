const { Users, Tasks } = require("../models/models");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await Users.findOne({
      username: username,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = username;
      res.redirect("/home");
    } else {
      res.redirect("/login?err=0");
    }
  } catch (err) {
    res.redirect("/login?err=1");
  }
};

exports.register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const checkedUser = await Users.findOne({
      username: username,
    });

    if (checkedUser) {
      res.status(409).redirect(`/register?err=2`);
      return;
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = new Users({
      username: username,
      password: hashedPass,
    });

    await user.save();

    req.session.user = username;
    res.redirect("/home");
  } catch (err) {
    res.redirect("/register?err=1");
  }
};

exports.addTask = async (req, res) => {
  const title = req.body.title;
  const desc = req.body.desc;
  const username = req.session.user;
  const uuid = uuidv4();

  if(!title && !desc){
    res.status(400).send({error: 'No se ha especificado un nombre o una descripción.'})
    return;
  }

  if(title.lenght < 3 && desc.lenght < 3){
    res.status(400).send({error: 'El titulo o la descripción son demasiado cortos.'})
    return;
  }

  const task = new Tasks({
    id: uuid,
    title: title,
    desc: desc,
    owner: owner,
    status: `pennding`
  })

  res.status(201).send(task);
};

exports.getTask = async (req, res) => {
  const uuid = req.params.uuid;
  const username = req.session.user;

  const task = await Tasks.findOne({ id: uuid });

  if (!task) {
    res.status(404).send({ error: `Esta tarea no existe` });
    return;
  }

  if (task.owner !== username) {
    res
      .status(403)
      .send({ error: `No tienes permisos para acceder a esta tarea.` });
    return;
  }

  res.send(task);
};

exports.getTasks = async (req, res) => {
  const uuid = req.params.uuid;
  const username = req.session.user;
  let status = req.query.status;

  const task = await Tasks.findOne({ owner: uuid });

  if (!task) {
    res.status(404).send({ error: `Esta tarea no existe` });
    return;
  }

  if (task.owner !== username) {
    res
      .status(403)
      .send({ error: `No tienes permisos para acceder a esta tarea.` });
    return;
  }

  res.send(task);
};

exports.getTasksByStatus = async (req, res) => {
  const username = req.session.user;
  let status = req.query.status;

  if (!status) {
    res.status(400).send({ error: `No se ha especificado un estado.` });
    return;
  }

  const statuses = [`pennding`, `complete`, `archived`];

  if (!statuses.includes(status)) {
    res.status(400).send({ error: `El estado de la tarea es erroneo` });
    return;
  }

  const task = await Tasks.findOne({
    owner: username,
    status: status,
  });

  if (!task) {
    res.status(200).send({ tasks: [] });
    return;
  }

  res.send({ tasks: [task] });
};
