import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/Logo.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ClipLoader from "react-spinners/ClipLoader";
import { eyeOff, eye } from 'react-icons-kit/feather';
import { Icon } from 'react-icons-kit';


function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [wrong, setWrong] = useState('');

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {

            const response = await axios.post('https://preventech-proxy-service.onrender.com/api/login/authentication', { 
                username, 
                password 
            });

            console.log('response = ', response);

            if (response.status === 200) {
                const { user, token } = response.data;
    
                localStorage.setItem('token', token); // Use a consistent token key
                localStorage.setItem('username', user.username);
                localStorage.setItem('userRole', user.role); // Store role for better role-based access control
    
                // Redirect based on user role
                if (user.role === 'admin') {
                    window.location.href = '/adminHomePage';
                } else if (user.role === 'user') {
                    window.location.href = '/homepage';
                } else if (user.role === 'dashboard') {
                    window.location.href = '/dashboard';
                } else {
                    setWrong('Parâmetro do utilizador Inválido');
                }
            } else {
                setWrong('Ocorreu um erro inesperado. Tente de novo.');
            }
        } catch (error) {
            setWrong(error.response?.data?.error || 'Ocorreu um erro inesperado. Tente de novo.');
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle "Enter" key press in the password field
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer} onKeyDown={handleKeyDown}>
                <img alt="Logo" src={logo} style={styles.image} />
                <div style={styles.title}>Bombeiros Vila Pouca de Aguiar</div>
                <div style={styles.subtitle}>Entrar</div>
                <div style={styles.welcomeText}>Olá, bem-vindo!</div>

                <TextField
                    style={styles.inputText}
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <div style={styles.passwordContainer}>
                    <TextField
                        style={styles.inputText}
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span style={styles.icon} onClick={handleShowPassword}>
                        <Icon icon={showPassword ? eye : eyeOff} size={20} />
                    </span>
                </div>

                {wrong && <p style={styles.errorText}>{wrong}</p>}

                <Button
                    style={styles.button}
                    disabled={loading}
                    variant="contained"
                    onClick={handleSubmit}
                >
                    {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Login'}
                </Button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#fff',
        padding: 20,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: 320,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#222',
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputText: {
        width: '100%',  // Ensure both fields take full width
        height: 50,     // Same height for both fields
        marginBottom: 15,
        borderRadius: 8,  // Consistent border radius for both fields
        padding: '0 12px', // Consistent padding inside the fields
        boxSizing: 'border-box', // Ensures padding is inside the width and height
    },
    passwordContainer: {
        position: 'relative',
        width: '100%',  // Ensures password field has same width as username
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        right: 12,       // Position the icon 12px from the right edge of the field
        top: '50%',      // Vertically center the icon
        transform: 'translateY(-50%)',  // Ensure the icon is exactly centered
        cursor: 'pointer',
        color: '#666',
        transition: 'color 0.3s ease', // Smooth transition when toggling icon
    },
    iconHover: {
        color: '#FF5D55', // Change color on hover for better user interaction
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#FF5D55',
        color: '#fff',
        borderRadius: 5,
        marginTop: 50,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    image: {
        width: 180,
        marginBottom: 20,
    },
};

export default Login;
