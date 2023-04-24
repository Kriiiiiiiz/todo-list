import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {

  const [todos, setTodos] = useState(undefined);
  const [searchQeries, setSearchQeries] = useState(`/api/tasks`);
  const [getTaskForm, asetTaskForm] = useState({
    title: '',
    desc: ''
  });

  const [getLoaded, setLoaded] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    asetTaskForm({ ...getTaskForm, [name]: value });
  };


  function search() {
    if(getLoaded) return;
    axios
    .get(searchQeries)
    .then((result) => {
      setTodos(result.data.tasks);
    })
    .catch((err) => {
      console.log(`Fallo al conectar con la API.`);
    });
    setLoaded(true);
  }

  useEffect(() => {
    search();
  });

  const crearTarea = (e) => {
    e.preventDefault();
    const formData = JSON.stringify(getTaskForm);
    console.log(formData);
    axios.post(`/api/addtask`, getTaskForm).then((res) => {
      document.getElementById(`newtodo-title`).value = ``;
      document.getElementById(`newtodo-desc`).value = ``;
    })
    search();
  }

  const completeTodo = (e) => {

    const uuid = e.target.dataset.id;
    search();
    axios.patch(`/api/task/complete/${uuid}`).then(() => setLoaded(false));

  }

  const archiveTodo = (e) => {

    const uuid = e.target.dataset.id;
    search();
    axios.patch(`/api/task/archive/${uuid}`).then(() => setLoaded(false));

  }

  const deleteTodo = (e) => {

    const uuid = e.target.dataset.id;
    search();
    axios.delete(`/api/task/${uuid}`).then(() => setLoaded(false));

  }

  const setFilter = (e) => {
    const status = e.target.dataset.status;
    const newFilter = `/api/tasks/${status}`;
    const activeFilters = document.querySelectorAll(`.status-btn.active`);

    for (let i = 0; i < activeFilters.length; i++) {
      const filter = activeFilters[i];
      filter.classList.remove(`active`);
    }

    if(newFilter === searchQeries){
      setSearchQeries(`/api/tasks`);
      return;
    }
    e.target.classList.add(`active`);
    setSearchQeries(newFilter);
    setLoaded(false)
  }

  return (
    <div className="home">

      <Navbar />

      <div className="newtodo" style={{ marginTop: `20px` }}>
        <div className="box">
          <div className="title">Añadir Tarea</div>
          <div className="body">
            <form onSubmit={crearTarea}>
              <input type="text" name="title" id={`newtodo-title`} placeholder="Titulo" onChange={handleInputChange} />
              <input type="text" name="desc" id={`newtodo-desc`} placeholder="Descripción" onChange={handleInputChange} />
              <div style={{ justifyContent: "right", marginTop: `10px` }}>
                <button type="submit" style={{maxWidth: `70px`, textAlign: `center`}}>Crear</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="filters" style={{ marginTop: `30px` }}>
        <div className="box">
          <div className="body">
            <div className="row">
              <div onClick={setFilter} className="btn status-btn" data-status={`pennding`}>Pendientes</div>
              <div onClick={setFilter} className="btn status-btn" data-status={`completed`}>Completadas</div>
              <div onClick={setFilter} className="btn status-btn" data-status={`archived`}>Archivadas</div>
            </div>
          </div>
        </div>
      </div>

      <div className="todos" style={{ marginTop: `10px`, marginBottom: `40px` }}>
        {!todos ? (
          <div className="box" style={{ marginTop: `10px`, textAlign:`center` }}>
            Cargando...
          </div>
        ) : !todos.length ? (
          <div className="box" style={{ marginTop: `10px`, textAlign:`center` }}>
            No hay tareas aquí.
          </div>
        ) : (
          todos.map((todo, index) => (
            <div className="box" style={{ marginTop: `10px` }}>
              <div className="title"><Link to={`/task/${todo.id}`} style={{textDecoration: `none`, color: `#fff`}}>{todo.title}</Link></div>
              <div className="body">{todo.desc}</div>
              <div className="footer" style={{textAlign: "right"}}>
              {todo.status === 'pennding' && (
                <>
                  <span className="badget" style={{backgroundColor: `#ffcc42`}}>Pendiente</span>
                  <span className="btn set-completed" onClick={completeTodo} data-id={todo.id}>Completar</span>
                </>
              )}
              {todo.status === 'completed' && (
                <>
                  <span className="badget" style={{backgroundColor: `#16f34e`}}>Completada</span>
                  <span className="btn" onClick={archiveTodo} data-id={todo.id}>Archivar</span>
                </>
                )}
              {todo.status === 'archived' && (
                <>
                  <span className="badget" style={{backgroundColor: `#666666`}}>Archivada</span>
                  <span className="btn" onClick={deleteTodo} data-id={todo.id}>Eliminar</span>
                </>
              )}
              </div>
            </div>
        ))
        )}
      </div>
    </div>
  );
}

export default Home;
