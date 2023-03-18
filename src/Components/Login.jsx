import { useState, useEffect } from "react";
import axios from "axios";
import Input from "./fields/Input";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Select from "@mui/material/Select";
import {
  MenuItem,
  Paper,
  Typography,
  Stack,
  InputLabel,
  Link,
  Box,
  CssBaseline,
  Container,
  ThemeProvider,
  Avatar,
  Grid,
  createTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../redux/actions";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://adilsher.pro/">
        adilsher.pro
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.loginReducer);
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    // const selectValue = e.target.value;
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    console.log(formdata);
    event.preventDefault();
    console.log("submit");

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASEURL}/login`, {
        username: formdata.username,
        password: formdata.password,
      });
      if (res.status === 200) {
        console.log(res.data);
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        navigate("/dashboard");
        setErrors("");
        setSuccess("Login successfully");
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
      console.log(error.response);
      setSuccess("");
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '50%' }}>
              {errors !== "" && <Alert severity="error">{errors}!</Alert>}
              {success !== "" && <Alert severity="success">{success}</Alert>}
              <form>
                <Input
                  label="Enter user name"
                  value="username"
                  type="text"
                  formdata={formdata}
                  handleChange={handleChange}
                />

                <Input
                  label="Enter password"
                  value="password"
                  type="password"
                  formdata={formdata}
                  handleChange={handleChange}
                />

                <Button
                  sx={{ mt: 3, mb:2, fontWeight: "bold" }}
                  variant="contained"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  endIcon={<SendIcon />}
                >
                  Login
                </Button>
              </form>

              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>

    </>

  );
};

export default Login;
