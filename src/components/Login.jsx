import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/Logo.png'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';


function Login({ history }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [wrong, setWrong] = useState('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://preventech-proxy-service.onrender.com/api/login/authentication', { username, password });
            console.log('response = ', response)
            if (response.status !== 200) {

                // Handle specific error scenarios based on response status
                if (response.status === 401) {
                    setWrong('Username ou password incorrectas...')

                } else {
                    // Handle other error scenarios
                    setWrong('An error occurred. Please try again later.');
                }

            } else {
                // Assuming your API returns a token upon successful login
                console.log(response.data.token);
                localStorage.setItem('token', response.data.token);
                navigate('/homepage');
                if (response.data.user.role === 'admin') {
                    console.log(response.data.token);
                    localStorage.setItem('token', response.data.token);
                    navigate('/adminHomepage');
                } else if(response.data.user.role === 'user'){
                    console.log(response.data.token);
                    localStorage.setItem('token', response.data.token);
                    navigate('/homepage');
                }
            }
        } catch (error) {
            setWrong(error.response.data.error);
            console.error('Error:', error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <img alt='Logo' src={logo} style={styles.image} />
            <div style={styles.title}>Bombeiros Vila Pouca de Aguiar</div>
            <div style={styles.title2}>Entrar</div>
            <div style={styles.title1}>Olá. Bem Vindo!</div>
            <div style={styles.container1}>
                <div class="mb-4 flex">
                    <div>
                        <TextField style={styles.input} id="standard-basic" label="Username" variant="standard" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div >
                        <TextField style={styles.input} type={showPassword ? 'text' : 'password'} id="password" label="Password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span style={styles.icon} onClick={handleShowPassword}>
                            <Icon class="absolute mr-10" icon={icon} size={24} />
                        </span>
                    </div>
                </div>
            </div>

            {wrong && <p style={{ color: 'red' }}>{wrong}</p>}

            <Button style={styles.button} disabled={loading} variant="contained" onClick={handleSubmit}>{loading ? <ClipLoader size={20} color="#ffffff" /> : 'Login'}</Button>
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
        marginLeft: 15,
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
