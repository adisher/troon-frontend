import { Alert, AppBar, Box, Button, Container, createTheme, CssBaseline, ThemeProvider, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { items } from "./constants/sidebar";
import DynamicSidebar from "./DynamicSidebar";
import Input from "./fields/Input";

const drawerWidth = 240;
const theme = createTheme();

const UploadDoc = () => {
    const [errors, setErrors] = useState("");
    const [success, setSuccess] = useState("");
    const [formdata, setFormData] = useState({
        userfile: "",
    });
    const [uploadedfile, setuploadedfile] = useState("");
    const { user } = useSelector((state) => state.loginReducer);

    const handleUploadImage = async (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BASEURL}/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${user?.token}`
                    },
                }
            );
            if (res.status === 200) {
                console.log();
                setuploadedfile(res.data);
                setErrors("");
                setSuccess("File Uploaded Successfully");
            }
        } catch (error) {
            console.log(error);
            setErrors(error.response.data);
            console.log(error.response);
            setSuccess("");
        }
    };

    const config = {
        headers: { Authorization: `Bearer ${user?.token}` },
    };

    const handleChange = (e) => {
        // const selectValue = e.target.value;
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleAssignUpload = async () => {
        if (!uploadedfile) {
            setErrors("File is required");
            return;
        }
        try {
            var res = '';
            if (user?.user?.kind === 'client') {
                res = await axios.post(
                    `${process.env.REACT_APP_BASEURL}/client/documents`,
                    {
                        name: formdata.userfile,
                        path: uploadedfile?.path,
                        size: uploadedfile?.size,
                    },
                    // formData
                    config

                );
            } else {
                res = await axios.post(
                    `${process.env.REACT_APP_BASEURL}/admin/documents`,
                    {
                        name: formdata.userfile,
                        path: uploadedfile?.path,
                        size: uploadedfile?.size,
                    },
                    // formData
                    config

                );
            }
            if (res.status === 200) {
                console.log(res);

                setErrors("");
                setSuccess("File Saved in DB Successfully");
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
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <DynamicSidebar items={items} />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    <Toolbar />
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="sm">
                            <CssBaseline />
                            <Box>
                                <Box mb={3}>
                                    {errors !== "" && <Alert severity="error">{errors}!</Alert>}
                                    {success !== "" && <Alert severity="success">{success}</Alert>}
                                </Box>
                                <Input
                                    label="File Name"
                                    value="userfile"
                                    type="text"
                                    formdata={formdata}
                                    handleChange={handleChange}
                                />
                                <input type="file" onChange={handleUploadImage} accept="image/*"></input>
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Box sx={{ display: "inline-flex", width: "50%", textAlign: "right", marginLeft: "auto" }}>
                                        <Button variant="contained" onClick={handleAssignUpload}>
                                            Upload
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </Box>

            </Box>

        </>
    );
};
export default UploadDoc;