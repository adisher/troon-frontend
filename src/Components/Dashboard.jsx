import React from "react";
import PropTypes from "prop-types";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import DynamicSidebar from "./DynamicSidebar";
import { items } from './constants/sidebar';

const drawerWidth = 240;
const theme = createTheme();
function Dashboard(props) {
  const { user } = useSelector((state) => state.loginReducer);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DynamicSidebar items={items} />
      {/* main body */}
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
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ width: 90, height: 90 }} alt="Adil Sher" src="https://pbs.twimg.com/profile_images/1613697209685639168/im9p9B6Y_400x400.jpg" />
              <Typography component="h1" variant="h5">
                {user?.user?.item.firstName+' '+user?.user?.item.lastName}
              </Typography>
              <Box component="div" sx={{ mt: 1 }}>
                <Typography>{user?.user?.kind}</Typography>
              </Box>
              <Box component="div" sx={{ mt: 3 }}>
                <Typography>"The paths we take makes us who we are"</Typography>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
