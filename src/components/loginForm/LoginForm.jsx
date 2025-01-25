import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { string } from "yup";
import * as Yup from "yup";
import { splitBearerToken, validateSchema } from "../../utils";
import { styles } from "./loginformStyles";
import { useAPI } from "../../hooks/useAPI";
import { CustomInput } from "../customInput/CustomInput";
import { ROUTES } from "../../routes/routesConstant";
import { APIRequestType } from "../../utils/constant";
import { setLocalStorageItem } from "../../utils/localstorageService";

let loginSchema = Yup.object().shape({
  email: string().required("email is required"),
  password: string().required("Password is required"),
});

export const LoginForm = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { data, loading, error, callAPI } = useAPI({
    type: APIRequestType.post,
    isPublic: true,
    callbackAfterAPIcall: (data, error) => {
      if (!error) {
        navigate(ROUTES.dashboard);
        const token = splitBearerToken(data?.headers?.getAuthorization());
        setLocalStorageItem("token", token);
      }
    },
  });

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
      callAPI("api/login", {
        email: formData.email,
        password: formData?.password,
      });
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

  const handleClickSignup = () => {
    navigate(ROUTES.signup);
  };

  return (
    <Box sx={styles.loginFormContainer}>
      <Box sx={styles.loginFormSubContainer}>
      <Typography component={"h1"} fontSize="1.5rem" color={"textSecondary"}>Login</Typography>
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
        <Button variant="contained" color="primary">
          Login
        </Button>
        <Box sx={styles.signupTextContainer}>
          <Typography color="neutral">Don’t have an account yet?</Typography>
          <Typography
            color="primary"
            component="h4"
            sx={styles.signupText}
            onClick={handleClickSignup}
          >
            Sign up
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
