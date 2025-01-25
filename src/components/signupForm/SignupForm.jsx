import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { CustomInput } from "../customInput/CustomInput";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { string } from "yup";
import * as Yup from "yup";
import { validateSchema } from "../../utils";
import { useNavigate } from "react-router-dom";
import { styles } from "./signupStyles";
import { useAPI } from "../../hooks/useAPI";
import { APIRequestType } from "../../utils/constant";
import { ROUTES } from "../../routes/routesConstant";

let loginSchema = Yup.object().shape({
  email: string().email("Email is invalid.").required("Email is required."),
  password: string().required("Password is required."),
  name: string().required("Name is Required."),
  confirmPassword: string()
    .required("Confirm Password is required.")
    .oneOf([Yup.ref("password"), null], "password does'nt match!"),
});

export const SignupForm = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { data, loading, error, callAPI } = useAPI({
    type: APIRequestType.post,
    isPublic: true,
    callbackAfterAPIcall: (data, error) => {
      if (!error) navigate(ROUTES.login);
    },
  });
  const navigate = useNavigate();

  const toggleShowPassword = () =>
    setShowPassword((showPasswordValue) => !showPasswordValue);

  const handleSubmitForm = async (event) => {
    const { isValid, formError } = await validateSchema(loginSchema, formData);
    if (!isValid) {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          formError: formError,
        };
      });
    } else {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          formError: {},
        };
      });
      const signupPayload = {
        name: formData.name,
        password: formData.password,
        email: formData.email,
      };
      callAPI("api/user", { ...signupPayload });
    }
  };

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  const handleClickLogin = () => {
    navigate(ROUTES.login);
  };

  return (
    <Box sx={styles.signupFormContainer}>
      <Box sx={styles.signupFormSubContainer}>
        <Typography component={"h1"} fontSize="1.5rem" color={"textSecondary"}>Signup</Typography>
        <CustomInput
          label="email"
          name="email"
          onChange={handleChangeFormData}
          helperText={formData?.formError?.email}
          error={!!formData?.formError?.email}
        />
        <CustomInput
          label="password"
          name="password"
          type={!showPassword ? "password" : "text"}
          onChange={handleChangeFormData}
          helperText={formData?.formError?.password}
          error={!!formData?.formError?.password}
          endAdornment={
            showPassword ? (
              <VisibilityIcon
                onClick={toggleShowPassword}
                fontSize="small"
                sx={{ cursor: "pointer" }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={toggleShowPassword}
                fontSize="small"
                sx={{ cursor: "pointer" }}
              />
            )
          }
        />
        <CustomInput
          label="confirm password"
          name="confirmPassword"
          type={!showPassword ? "password" : "text"}
          onChange={handleChangeFormData}
          helperText={formData?.formError?.confirmPassword}
          error={!!formData?.formError?.confirmPassword}
        />
        <CustomInput
          label="Name"
          name="name"
          onChange={handleChangeFormData}
          helperText={formData?.formError?.CollegeName}
          error={!!formData?.formError?.CollegeName}
        />
        <Button variant="contained" onClick={handleSubmitForm}>
          Signup
        </Button>
        <Box sx={styles.signupTextContainer}>
          <Typography color="neutral">Already have an account?</Typography>
          <Typography
            color="primary"
            component="h4"
            sx={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={handleClickLogin}
          >
            Login
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
