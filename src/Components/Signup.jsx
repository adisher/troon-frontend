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
  Box,
  Link,
  ThemeProvider,
  Container,
  createTheme,
  CssBaseline,
  Avatar,
} from "@mui/material";

const theme = createTheme();

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

const Signup = () => {
  const [formdata, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    dob: "",
    age: "",
    usertype: "admin",
  });
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    // const selectValue = e.target.value;
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (formdata.usertype === "client") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [formdata]);

  const handleSubmit = async (event) => {
    console.log(formdata);
    event.preventDefault();
    console.log("submit");

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASEURL}/signup`, {
        userName: formdata.username,
        password: formdata.password,
        userType: formdata.usertype,
        data: {
          firstName: formdata.firstname,
          lastName: formdata.lastname,
          dob: formdata.dob,
          age: formdata.age,
        },
      });
      if (res.status === 200) {
        setErrors("");
        setSuccess("Record added successfully");
      }
    } catch (error) {
      setErrors(error.response.data.error);
      console.log(error.response);
      setSuccess("");
    }
  };
  return (
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
            Signup
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '70%' }}>
            {errors !== "" && <Alert severity="error">{errors}!</Alert>}
            {success !== "" && <Alert severity="success">{success}</Alert>}
            <form>
              <Input
                label="Enter first name"
                value="firstname"
                type="text"
                formdata={formdata}
                maxlength="10"
                placeholder="Enter first name"
                handleChange={handleChange}
              />

              <Input
                label="Enter last name"
                value="lastname"
                type="text"
                formdata={formdata}
                handleChange={handleChange}
              />

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

              {show && (
                <>
                  <Input
                    label="Enter DOB"
                    value="dob"
                    type="text"
                    formdata={formdata}
                    handleChange={handleChange}
                  />

                  <Input
                    label="Enter age"
                    value="age"
                    type="text"
                    formdata={formdata}
                    handleChange={handleChange}
                  />
                </>
              )}
              <InputLabel id="demo-simple-select-label">Enter usertype</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="usertype"
                fullWidth
                margin="normal"
                id="demo-simple-select"
                label="Enter usertype"
                value={formdata.usertype}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="client">Client</MenuItem>
              </Select>
              <Button
                sx={{ mt: 3, fontWeight: "bold" }}
                variant="contained"
                type="submit"
                onClick={(e) => handleSubmit(e)}
                endIcon={<SendIcon />}
              >
                Signup
              </Button>
            </form>

            <Box align="center" mt={3}>
              <Link href="/login">Already have a account! Login</Link>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
