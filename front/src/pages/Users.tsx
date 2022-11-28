import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";
import { InputsContainer, HomeContainer } from "./Home.styles";

export function Users() {
  const { user, logout } = useContext(AuthContext);

  return (
    <HomeContainer>
      <br />
      <div>Welcome, {user?.email}</div>
      <a href="index.html" id="title">Flowershop</a>

      {/* <Button label="Exit" onClick={logout} /> */}
    </HomeContainer>
  );
}
