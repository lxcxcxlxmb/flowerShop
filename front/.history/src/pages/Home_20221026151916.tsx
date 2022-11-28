import { useContext } from "react";
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
        <a className="link hvr-grow" href="/users" target="_blank">Users</a>
        <a className="link hvr-grow" href="/cities" target="_blank">Cities</a>
        <a className="link hvr-grow" href="/states" target="_blank">States</a>
        <a className="link hvr-grow" href='/login' onClick={logout}>Exit</a>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* <Button label="Exit" onClick={logout} /> */}
    </HomeContainer>
  );
}
