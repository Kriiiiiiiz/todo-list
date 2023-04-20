import { useContext } from "react";
import UserContext from "../UserContext";

function Home() {
  const userInfo = useContext(UserContext);

  return <div>ESTE ES EL HOME DE {userInfo.user}</div>;
}

export default Home;
