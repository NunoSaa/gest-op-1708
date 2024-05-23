import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import Button from '@mui/material/Button';

function PositList() {

    const [emergencies, setEmergencies] = useState([]);
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const items = [
        {
            id: 1,
            description: 'Primeiro Posit',
            data: '24-02-2024',
            ocorrencia: '12345'
        },
        {
            id: 2,
            description: 'Segundo Posit',
            data: '25-02-2024',
            ocorrencia: '12346'
        },
        {
            id: 3,
            description: 'Terceiro Posit',
            data: '26-02-2024',
            ocorrencia: '12347'
        },
        {
            id: 4,
            description: 'Quarto Posit',
            data: '27-02-2024',
            ocorrencia: '12348'
        },
        {
            id: 5,
            description: 'Quinto Posit',
            data: '28-02-2024',
            ocorrencia: '12349'
        }
    ];

    useEffect(() => {
        setLoading(true);
        // Simulating an API call
        setTimeout(() => {
            setEmergencies(items);
            setLoading(false);
        }, 1000);
    }, []);

    const renderItem = (item) => (
        <div key={item.id} style={{ ...styles.item }} onClick={() => navigate(`/positDetail/${item.id}`, { state: item })}>

            <div style={styles.content}>
                <h3 style={styles.title}>{item.ocorrencia}</h3>
                <p style={styles.description}>{item.description}</p>
            </div>
            <div style={styles.rightContainer}>
                <span style={styles.estado}>{item.data}</span>
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
                <div style={styles.row}>
                    <Button style={styles.button_POSIT} 
                    onClick={() => navigate('/novoPosit')}>
                        <p style={styles.buttonText}>Novo POSIT</p>
                    </Button>
                </div>

                {loading ? (
                    <div style={styles.center}>
                        <ClipLoader size={50} color="#C0C0C0" />
                        A carregar...</div> // You can replace this with a loading icon
                ) : emergencies.length === 0 ? (
                    <div>Não foram encontradas ocorrências.</div> // Render message if emergencies array is empty
                ) : (
                    emergencies.map(renderItem)
                )}
            </div>
    );
};

const styles = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    container: {
        marginLeft: 25,
        marginRight: 25,
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25
    },
    content: {
        flex: 1,
        marginLeft: 25,
    },
    item: {
        display: 'flex', // Add this to make the item a flex container
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 20,
        borderColor: '#C0C0C0',
        border: '1px solid #C0C0C0',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 15
    },
    title: {
        fontSize: 24,
        paddingBottom: 5,
    },
    description: {
        fontSize: 18,
        paddingBottom: 5,
    },
    vehicle: {
        marginTop: '5',
        fontSize: 14,
        fontWeight: 'bold'
    },
    rightContainer: {
        flex: 1,
        alignItems: 'right',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    timestamp: {
        marginRight: 25,
        marginLeft: 25,
        color: '#888',
        fontSize: 16
    },
    estado: {
        fontWeight: 'bold',
        fontSize: 16
    },
    image: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
    },
    button_POSIT: {
        width: "100%",
        height: 75,
        backgroundColor: '#FF6666',
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000', // Set the text color to white
        fontSize: 18,
        fontWeight: 'bold',
    },
};

export default PositList