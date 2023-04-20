import {Navigate, Outlet } from 'react-router-dom';
import {useContext} from 'react';
import UserContext from "./UserContext";

const ProtectedRoute = () => {

  const userInfo = useContext(UserContext);

  if (userInfo.user === undefined) {
    return <div>Cargando...</div>;
  }

  if (userInfo.user === false) {
    return <Navigate to={`/login`} />;
  }

  return(<Outlet />);

   
}

export default ProtectedRoute