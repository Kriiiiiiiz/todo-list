import { Link } from "react-router-dom";
import "../statics/css/auth.css";

function Login() {

  return (
    <div className="auth-box box-shadow br-12">
      <div className="content">
        <form action="/login" method="post">
          <div className={["text-center fs-20 fw-400"]}>ACCESO</div>
          <input type="text" name="username" placeholder="Usuario" />
          <input type="password" name="password" placeholder="Contraseña" />
          <div className="row" style={{marginTop: `10px`}}>
            <div style={{padding: `5px`}}>
              <button className={"btn fs-15"} type="submit" >Acceder</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
