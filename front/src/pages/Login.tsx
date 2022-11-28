import { useContext, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { InputsContainer, LoginContainer } from "./Login.styles";
import { useForm, FormProvider } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const newLoginValidationSchema = zod.object({
  email: zod
    .string()
    .min(1, "Type your email")
    .email("Type a valid email"),
  password: zod.string().min(1, "Type your password"),
});

type Login = zod.infer<typeof newLoginValidationSchema>;

export function Login() {
  const navigate = useNavigate();
  const { signIn, user } = useContext(AuthContext);
  const [errorLogin, setErrorLogin] = useState("");

  const methods = useForm<Login>({
    resolver: zodResolver(newLoginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, formState } = methods;

  async function handleSubmitLogin(data: Login) {
    const login = await signIn(data);
    if (login) {
      navigate("/");
    } else {
      setErrorLogin("Incorrect login and/or password");
    }
  }

  console.log(errorLogin);

  const { errors } = formState;

  return (
    <LoginContainer>
      <img
        src="https://images.pexels.com/photos/1048035/pexels-photo-1048035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Plant"
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitLogin)}>
          <h1>Login</h1>
          <InputsContainer>
            <Input
              width={176}
              height={72}
              label="Email"
              id="email"
              placeholder="Type your email"
              errorMessage={errors.email?.message}
            />

            <Input
              label="Password"
              id="password"
              placeholder="Type your password"
              width={176}
              height={72}
              errorMessage={errors.password?.message}
              type="password"
            />
          </InputsContainer>
          <Button label="Login" />
          <span>{errorLogin}</span>
        </form>
      </FormProvider>
    </LoginContainer>
  );
}
