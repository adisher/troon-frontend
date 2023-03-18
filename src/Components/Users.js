import React, { useEffect, useState } from 'react';
import { AppBar, Box, Container, createTheme, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider, Toolbar, Typography } from '@mui/material';
import DynamicSidebar from './DynamicSidebar';
import { useSelector } from 'react-redux';
import { items } from './constants/sidebar';
import axios from 'axios';

const drawerWidth = 240;
const theme = createTheme();

const Users = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState("");
    const [page, setPage] = useState(0);
    var [index, setIndex] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { user } = useSelector((state) => state.loginReducer);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASEURL}/users`);
                setLoading(false);
                if (res.status === 200) {
                    console.log(res);
                    setData(res.data)
                    setErrors("");
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
                setErrors(error.response.data);
                console.log(error.response);
            }
        };

        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
                        <Container component="main">
                            <CssBaseline />
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Username</TableCell>
                                                <TableCell>Role</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {loading && <Typography variant="h6" component="h6">
                                            Loading...
                                        </Typography>}

                                        {!loading &&
                                            <TableBody>
                                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                                    <TableRow key={row.id} tabIndex={-1}>
                                                        <TableCell>{index++}</TableCell>
                                                        <TableCell>{row.userType.item.firstName}</TableCell>
                                                        <TableCell>{row.userName}</TableCell>
                                                        <TableCell>{row.userType.kind}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        }

                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </Container>
                    </ThemeProvider>
                </Box>
            </Box>

        </>
    );
};
export default Users;