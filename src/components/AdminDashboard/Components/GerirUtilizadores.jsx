import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, IconButton, Divider } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility, VisibilityOff } from '@mui/icons-material';

// Sample data (replace with real API calls in a real application)
const initialUsers = [
  { id: 1, username: 'John Doe', password: 'j1223', role: 'admin', entidade: 'vpa' },
  { id: 2, username: 'Jane Smith', password: 's1234', role: 'user', entidade: 'vpa' },
  { id: 3, username: 'Michael Brown', password: 'm5678', role: 'admin', entidade: 'vpa' },
];

const GerirUtilizadores = () => {
  const [users, setUsers] = useState(initialUsers); // This should be replaced with an API call
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Track if the form is in edit mode
  const [selectedUser, setSelectedUser] = useState(null); // The selected user to edit or view
  const [passwordVisible, setPasswordVisible] = useState({}); // Track password visibility for each user

  // Handle open/close dialog
  const handleDialogOpen = (user = null) => {
    setSelectedUser(user);
    setIsEditMode(user ? true : false); // If user is passed, we are in edit mode
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  // Handle create or update user
  const handleSaveUser = () => {
    if (isEditMode) {
      // Update user logic (Replace this with an API call)
      setUsers(users.map(user => user.id === selectedUser.id ? selectedUser : user));
    } else {
      // Create user logic (Replace this with an API call)
      setUsers([...users, { ...selectedUser, id: users.length + 1 }]);
    }
    handleDialogClose();
  };

  // Handle delete user
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({
      ...selectedUser,
      [name]: value,
    });
  };

  const handleTogglePasswordVisibility = (id) => {
    setPasswordVisible(prevState => ({
      ...prevState,
      [id]: !prevState[id], // Toggle visibility for the specific user
    }));
  };

  // Alternating row colors
  const getRowStyle = (index) => {
    return {
      backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ececec', // Light gray and slightly darker gray for alternating rows
      '&:hover': {
        backgroundColor: '#dcdcdc', // Hover effect for rows
      },
    };
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleDialogOpen()}
        sx={{
          marginBottom: 2,
          '&:hover': {
            backgroundColor: '#1976d2',
          },
        }}
      >
        Adicionar Novo Utilizador
      </Button>

      <TableContainer component={Paper} sx={{boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)'}}>
        <Table>
          <TableHead sx={{ marginBottom: 2 }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">Username</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">Password</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">Entidade</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">Role</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id} sx={getRowStyle(index)}>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {passwordVisible[user.id] ? user.password : '********'} {/* Show password or asterisks */}
                  <IconButton
                    color="primary"
                    onClick={() => handleTogglePasswordVisibility(user.id)}
                    sx={{
                      marginLeft: 1,
                    }}
                  >
                    {passwordVisible[user.id] ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </TableCell>
                <TableCell>{user.entidade}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleDialogOpen(user)}
                    sx={{
                      marginRight: 1,
                      '&:hover': { backgroundColor: '#c5cae9' }, // Hover effect on edit icon
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteUser(user.id)}
                    sx={{
                      '&:hover': { backgroundColor: '#ffcccb' }, // Hover effect on delete icon
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for adding or editing user */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{isEditMode ? 'Editar Utilizador' : 'Adicionar Novo Utilizador'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            name="name"
            value={selectedUser?.name || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={selectedUser?.email || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Função"
            name="role"
            value={selectedUser?.role || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={selectedUser?.password || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveUser} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GerirUtilizadores;
