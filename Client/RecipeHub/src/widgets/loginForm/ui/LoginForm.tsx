import React, { useState } from "react";
import type { FC } from "react";
import AuthService from "../../../features/auth/api/AuthService";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div>
      <input
        placeholder="Email"
        type="text"
        onChange={(event) => setEmail(event.target.value)}
      ></input>
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      ></input>
      <button onClick={() => AuthService.login(email, password)}>Login</button>
      <p>Don’t have an account ? Sign Up</p>
    </div>
  );
};

export default LoginForm;
