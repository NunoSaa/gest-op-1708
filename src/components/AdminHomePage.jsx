import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
  },
}));

function AdminHomePage() {
    const classes = useStyles();
    let navigate = useNavigate()

    const handleLogout = () => {
        // Clear authentication token from local storage
        console.log(localStorage.getItem('token'));
        localStorage.removeItem('token');
        console.log('depois' + localStorage.getItem('token'));

        // Redirect to login page
        navigate('/login');
      };

    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <List>
            <ListItem button component={Link} to="/admin/users">
              <ListItemText primary="Gestão de Utilizadores" />
            </ListItem>
            <ListItem button component={Link} to="/admin/products">
              <ListItemText primary="Estatísticas" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
            {/* Add more ListItem components for other admin functionalities */}
          </List>
        </Drawer>
        <main className={classes.content}>
          <h1>GestOP 1708 Admin Dashboard</h1>
          {/* Main content goes here */}
        </main>
      </div>
    );
}


export default AdminHomePage