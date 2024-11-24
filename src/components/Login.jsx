import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/Logo.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { eyeOff, eye } from 'react-icons-kit/feather';
import { Icon as IconKit } from 'react-icons-kit';


function Login({ history }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [wrong, setWrong] = useState('');
    const [icon] = useState(eyeOff);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://preventech-proxy-service.onrender.com/api/login/authentication', { username, password });
            console.log('response = ', response);
            if (response.status !== 200) {
                if (response.status === 401) {
                    setWrong('Username ou password incorrectas...');
                } else {
                    setWrong('An error occurred. Please try again later.');
                }
            } else {
                // Assuming your API returns a token upon successful login
                //navigate('/homepage');
                if (response.data.user.role === 'admin') {
                    localStorage.setItem('tokenAdmin', response.data.token);
                    localStorage.setItem('username', response.data.user.username);
                    window.location.href = '/adminHomePage';
                    
                } else if (response.data.user.role === 'user') {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('username', response.data.user.username);
                    window.location.href = '/homepage';

                } else if (response.data.user.role === 'dashboard') {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('username', response.data.user.username);

                    window.location.href = '/dashboard';
                }
            }
        } catch (error) {
            setWrong(error.response.data.error);
            console.error('Error:', error.response.data.error);
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
            <img alt='Logo' src={logo} style={styles.image} />
            <div style={styles.title}>Bombeiros Vila Pouca de Aguiar</div>
            <div style={styles.title2}>Entrar</div>
            <div style={styles.title1}>Olá. Bem Vindo!</div>
            <div style={styles.formContainer}>
                <div className="mb-4 flex" style={styles.inputContainer}>
                    <TextField
                        style={styles.inputLogin}
                        id="standard-basic"
                        label="Username"
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div style={{ position: 'relative' }}>
                        <TextField
                            style={styles.inputLogin}
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            label="Password"
                            variant="standard"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <span style={styles.icon} onClick={handleShowPassword}>
                            <IconKit className="absolute" icon={showPassword ? eye : eyeOff} size={24} />
                        </span>
                    </div>
                </div>

                {wrong && <p style={{ color: 'red' }}>{wrong}</p>}

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
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full height to center vertically
        backgroundColor: '#fff',
        padding: 0,
        margin: 0,
        overflow: 'hidden', // Prevent any overflow that might cause scrolling
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center horizontally
        width: '100%',
        maxWidth: 300, // Restrict width for better layout
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: "center", // Center title text
        color: '#959191',
    },
    title1: {
        fontSize: 14,
        marginBottom: 40,
        textAlign: "center", // Center text
        color: '#959191',
    },
    title2: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center', // Center text
        color: '#000000',
    },
    inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 30,
    },
    inputLogin: {
        width: 250,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        width: 250,
        height: 40,
        backgroundColor: '#FF5D55',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    icon: {
        marginLeft: 15,
        cursor: 'pointer', // Make the icon clickable
    },
};

export default Login;
