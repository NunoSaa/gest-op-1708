import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/Logo.png'
import '../css/Login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function Login({ history }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://preventech-proxy-service.onrender.com/api/login/authentication', { username, password });
            // Assuming your API returns a token upon successful login
            console.log(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/homepage');
            //window.location.reload(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={styles.container}>
            <img src={logo} style={styles.image} />
            <div style={styles.title}>Bombeiros Vila Pouca de Aguiar</div>
            <div style={styles.title2}>Entrar</div>
            <div style={styles.title1}>Olá. Bem Vindo!</div>
            <div>
                <TextField style={styles.input} id="standard-basic" label="Username" variant="standard" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <TextField style={styles.input} id="standard-basic" label="Password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <Button style={styles.button} variant="contained" onClick={handleSubmit}>Login</Button>
        </div>
    );
}


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginTop: '5%'
    },
    title: {
        fontSize: 16,
        marginBottom: 75,
        textAlign: "left",
        color: '#959191'
    },
    title1: {
        fontSize: 14,
        marginBottom: 40,
        //alignSelf: "baseline",
        paddingLeft: 0,
        color: '#959191',
    },
    title2: {
        fontSize: 24,
        marginBottom: 10,
        //alignSelf: "baseline",
        paddingLeft: 10,
        color: '#000000',
        //paddingHorizontal: 10,
    },
    input: {
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
        marginTop: 70,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    icon: {
        marginLeft: -35,
        fontSize: 24,
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginLeft: 10
    },
}

export default Login;
