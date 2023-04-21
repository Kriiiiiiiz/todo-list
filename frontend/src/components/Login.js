import { Link } from "react-router-dom";
import "../statics/css/auth.css";

function Login() {
  return (
    <div className="box box-shadow br-12">
      <div className="content">
        <form action="/login" method="post">
          <div className="text-center">ACCESO</div>
          <input type="text" name="username" />
          <input type="password" name="password" />
          <div className="row">
            <div>
              <Link to={`/register`}>
                <div className="btn">Registro</div>
              </Link>
            </div>
            <div>
              <input type="submit" value={`acceder`} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
