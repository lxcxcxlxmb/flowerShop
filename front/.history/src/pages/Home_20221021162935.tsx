import { useContext } from "react";
import { Button } from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";
import { InputsContainer, HomeContainer } from "./Home.styles";

export function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <div>Welcome, {user?.email}</div>
      <a href="index.html" id="title">Flowershop</a>

      <Button label="Exit" onClick={logout} />
    </>
  );
}
