import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";
import { InputsContainer, HomeContainer } from "./Home.styles";

export function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <HomeContainer>
      <br />
      <div>Welcome, {user?.email}</div>
      <a href="index.html" id="title">Flowershop</a>
      <div id="links">
        <Link to="/users">Users</Link>
        <Link to="/cities">Cities</Link>
        <Link to="/states">States</Link>
        <a className="link hvr-grow" href='/login.html' onClick={logout}>Exit</a>
        {/* <a className="link hvr-grow" href="/users.html" target="_blank">Users</a>
        <a className="link hvr-grow" href="/cities.html" target="_blank">Cities</a>
        <a className="link hvr-grow" href="/states.html" target="_blank">States</a>
        <a className="link hvr-grow" href='/login.html' onClick={logout}>Exit</a> */}
      </div>
      {/* <Button label="Exit" onClick={logout} /> */}
    </HomeContainer>
  );
}
