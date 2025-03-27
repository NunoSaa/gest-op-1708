import React, { useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import OcorrenciasDashboard from '../OcorrenciasDashboard/OcorrenciasDashboard';
import GerirUtilizadoresComponent from './Components/GerirUtilizadores';

function AdminHomePage() {
  let navigate = useNavigate();
  
  // State to manage sidebar collapse
  const [collapsed, setCollapsed] = useState(false);

  const handleNavigation = (path) => {
    if (path === '/logout') {
      localStorage.removeItem('tokenAdmin');
      navigate('/');
    } else {
      navigate(`/adminHomePage${path}`); // Keep navigation inside admin panel
    }
  };

  // Function to get background color based on index
  const getBackgroundColor = (index) => {
    if (index % 2 === 0) {
      return '#f0f0f0'; // Light gray
    } else {
      return '#dcdcdc'; // Slightly darker gray
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? 60 : 240, // Conditionally set width based on collapsed state
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: collapsed ? 60 : 240,
            boxSizing: 'border-box',
            backgroundColor: '#f8f9fa',
          },
        }}
      >
        <List sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Sidebar Toggle Button */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => setCollapsed(!collapsed)}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          {/* Menu Items */}
          <Box sx={{ flexGrow: 1 }}>
            {[
              { text: "Dashboard Ocorrências", icon: <DashboardIcon />, path: "/dashboardOcorrencias" },
              { text: "Gestão de Utilizadores", icon: <GroupIcon />, path: "/gerirUtilizadores" },
            ].map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  sx={{
                    backgroundColor: getBackgroundColor(index), // Apply alternating background color
                    '&:hover': { backgroundColor: '#b0b0b0' } // Hover effect
                  }}
                  onClick={() => handleNavigation(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {!collapsed && <ListItemText primary={item.text} />} {/* Show text only if not collapsed */}
                </ListItemButton>
              </ListItem>
            ))}
          </Box>

          <Divider />

          {/* Definições Option */}
          <ListItem disablePadding sx={{ marginTop: 'auto' }}>
            <ListItemButton
              sx={{
                backgroundColor: '#f0f0f0', // Light gray for logout
                '&:hover': { backgroundColor: '#b0b0b0' }
              }}
              onClick={() => handleNavigation('/')}
            >
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              {!collapsed && <ListItemText primary="Definições" />}
            </ListItemButton>
          </ListItem>

          <Divider />

          {/* Logout Option */}
          <ListItem disablePadding sx={{ marginTop: 'auto' }}>
            <ListItemButton
              sx={{
                backgroundColor: '#f0f0f0', // Light gray for logout
                '&:hover': { backgroundColor: '#b0b0b0' }
              }}
              onClick={() => handleNavigation('/logout')}
            >
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              {!collapsed && <ListItemText primary="Logout" />}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
        <Routes>
          <Route path="dashboardOcorrencias" element={<OcorrenciasDashboard />} />
          <Route path="gerirUtilizadores" element={<GerirUtilizadoresComponent />} />
          {/* More nested routes can be added here */}
        </Routes>
        <Outlet /> {/* This is where the dashboard or other components will be shown */}
      </Box>
    </Box>
  );
}

export default AdminHomePage;
