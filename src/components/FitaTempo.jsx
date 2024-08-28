import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import Button from '@mui/material/Button';

function FitaTempo() {

    const location = useLocation();
    const { state } = location;
    const [timeTape, setTimeTape] = useState([]);
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState(state);
    const [error, setError] = useState(null);

    console.log(item);

    useEffect(() => {
        const fetchData = async (id) => {
            setLoading(true);
            try {
                const response = await axios.get('https://preventech-proxy-service.onrender.com/api/timetape/getTimeTapeByIncidentID', {
                    params: {
                        id_ocorrencia: id
                    }
                });
                setTimeTape(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error:', error);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        if (item && item.id) {
            fetchData(item.id); // Fetch data using the ID from state
        }

        const interval = setInterval(() => {
            if (item && item.id) {
                fetchData(item.id); // Refetch data every minute
            }
        }, 60000); // Refresh every minute

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [item]);

    const renderItem = (item) => (
        <div key={item.id} style={{ ...styles.item }}>

            <div style={styles.content}>
                <h3 style={styles.title}>
                    {item.tipo === 'posit' ? 'POSIT' :
                        item.tipo === 'comunicacao' ? 'Comunicação' :
                            item.tipo === '' ? '' :
                                item.tipo}
                </h3>
                <p style={styles.description}>{item.autor}</p>
                <p style={styles.description}>{item.descricao}</p>
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
                    onClick={() => navigate('/novoPosit', { state: item })}>
                    <p style={styles.buttonText}>Novo POSIT</p>
                </Button>
            </div>

            <div style={styles.row}>
                {loading ? (
                    <div style={styles.center}>
                        <ClipLoader size={50} color="#C0C0C0" />
                        A carregar...</div> // You can replace this with a loading icon
                ) : timeTape.length === 0 ? (
                    <div>Não foram encontrados Registos.</div> // Render message if emergencies array is empty
                ) : (
                    <div style={styles.rowItem}>
                        {timeTape.map(renderItem)}
                    </div>
                )}
            </div>
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
    row: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    rowInfo: {
        flexDirection: 'row',
        marginBottom: 25,
        paddingLeft: 25
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
        alignItems: 'center'
    },
    buttonText: {
        color: '#000000', // Set the text color to white
        fontSize: 18,
        fontWeight: 'bold',
    },
};

export default FitaTempo