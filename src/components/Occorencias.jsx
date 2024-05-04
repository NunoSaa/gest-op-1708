import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate } from "react-router-dom";


function Ocorrencias() {

    const [emergencies, setEmergencies] = useState([]);
    let navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://preventech-proxy-service.onrender.com/api/emergency/getIncidentsByDate');
                setEmergencies(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const renderItem = (item) => (
        <div key={item.id} style={styles.item} onClick={() => navigate(`/ocorrenciasDetail/${item}`, {state: item})}>
            
          <div style={styles.content}>
            <h3 style={styles.title}>{item.morada}</h3>
            <p style={styles.description}>{item.desc_classificacao}</p>
            <p style={styles.vehicle}>{item.viaturas}</p>
          </div>
          <div style={styles.rightContainer}>
            <span style={styles.timestamp}>{item.hora_alerta}</span>
          </div>
        </div>
      );
    
      return (
        <div style={styles.container}>
          {emergencies.map(renderItem)}
        </div>
      );
    };

const styles = {
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
    },
    rightContainer: {
        //flexDirection: 'row',
        //alignSelf: 'center',
        alignItems: 'right',
        //justifyContent: 'center',
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
        flex: 1,
    },
    image: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
    },
};

export default Ocorrencias;