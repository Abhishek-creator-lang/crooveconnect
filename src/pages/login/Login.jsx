import React from "react";
import { TwoColumnLayout } from "../../layout/TwoColumnLayout/TwoColumnLayout";
import { LoginImage } from "../../components/loginImage/LoginImage";
import { LoginForm } from "../../components/loginForm/LoginForm";

export const Login = () => {
  return (
    <>
      <TwoColumnLayout
        LeftComponent={<LoginImage />}
        RightComponent={<LoginForm />}
      />
    </>
  );
};
