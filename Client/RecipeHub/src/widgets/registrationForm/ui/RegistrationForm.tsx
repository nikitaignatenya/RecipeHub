import React, { useState } from "react";
import type { FC } from "react";
import AuthService from "../../../features/auth/api/AuthService";

const RegistrationForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [pasword, setPassword] = useState<string>("");

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
      <button onClick={() => AuthService.registrtaion(email, pasword)}>
        Registration
      </button>
      <p>Already have an account ? Sign In</p>
    </div>
  );
};

export default RegistrationForm;
