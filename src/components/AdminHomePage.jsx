import React from 'react';
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
        <div><p>TESTE ADMIN</p></div>
    );
}


export default AdminHomePage