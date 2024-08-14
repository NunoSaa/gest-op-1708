import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';


function Ocorrencias() {

    const [emergencies, setEmergencies] = useState([]);
    let navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            window.location.reload();
          }, 60000); // Refresh every minute (60000 milliseconds)

        const fetchData = async () => {
            try {
                const response = await axios.get('https://preventech-proxy-service.onrender.com/api/emergency/getIncidentsByDate');
                setEmergencies(response.data);
                console.log(response.data);
                setLoading(false); // Data loaded, set loading to false
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => clearInterval(interval); // Cleanup the interval on unmount
        
    }, []);

    const renderItem = (item) => (
        <div key={item.id} style={{ ...styles.item, backgroundColor: item.corEstado }} onClick={() => navigate(`/ocorrenciasDetail/${item.id}`, { state: item })}>

            <div style={styles.content}>
                <h3 style={styles.title}>{item.morada}, {item.localidadeMorada}</h3>
                <p style={styles.description}>{item.descClassificacao}</p>
                <p style={styles.vehicle}>{item.viaturas.join(', ')}</p>
            </div>
            <div style={styles.rightContainer}>
                <span style={styles.estado}>{item.estado}</span>
                <span style={styles.timestamp}>{item.horaAlerta}</span>
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
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
};

export default Ocorrencias;