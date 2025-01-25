import React from "react";
import { TwoColumnLayout } from "../../layout/TwoColumnLayout/TwoColumnLayout";
import { LoginImage } from "../../components/loginImage/LoginImage";
import { SignupForm } from "../../components/signupForm/SignupForm";

export const Signup = () => {
  return (
    <>
      <TwoColumnLayout
        LeftComponent={<LoginImage />}
        RightComponent={<SignupForm />}
      />
    </>
  );
};
