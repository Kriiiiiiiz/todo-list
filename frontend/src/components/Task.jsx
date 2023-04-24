import { useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";

function Task() {

  const [todo, setTodo] = useState(undefined);

  const {uuid} = useParams()

  axios
    .get(`/api/task/${uuid}`)
    .then((result) => {
      setTodo(result.data.task);
    })
    .catch((err) => {
      window.location.href = `/home`;
    });

  const completeTodo = (e) => {

    const id = e.target.dataset.id;

    axios.patch(`/api/task/complete/${id}`);

  }

  const archiveTodo = (e) => {

    const id = e.target.dataset.id;
    axios.patch(`/api/task/archive/${id}`);

  }

  const deleteTodo = (e) => {
    const id = e.target.dataset.id;
    axios.delete(`/api/task/${id}`);
    window.location.href = `/home`;
  }

  return (
    <div className="home">
      <Navbar />

      <div className="todos" style={{ marginTop: `10px`, marginBottom: `40px` }}>
        {!todo ? (
          <div className="box" style={{ marginTop: `10px`, textAlign:`center` }}>
            Cargando...
          </div>
        ) : (

          <div className="box" style={{ marginTop: `30px` }}>
            <div className="title">{todo.title}</div>
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
        )}
      </div>
    </div>
  );
}

export default Task;
