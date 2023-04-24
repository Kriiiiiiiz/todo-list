import { useContext} from "react";
import UserContext from "../UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

function Navbar() {

  const userInfo = useContext(UserContext);
  const logout = (e) => {
    axios.post(`/logout`).then(() => {
      window.location.href = `/`;
    })
  }

  return (
      <nav className="navbar box-shadow">
        <div className="container">
          <div className="name"><Link to={`/home`} style={{textDecoration: `none`, color: `#fff`}}>Kristian`s To Do</Link></div>
          <div className="user">
            <span className="hover-info">
              {userInfo.user}
              <div className="hovered-info">
                <span className="btn" style={{backgroundColor: `red`}} onClick={logout}>Logout</span>
              </div>
            </span>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
