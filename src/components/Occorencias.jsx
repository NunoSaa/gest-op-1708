import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMediaQuery } from '@mui/material'; // Import to handle responsiveness

function Ocorrencias() {

    const [emergencies, setEmergencies] = useState([]);
    let navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const username = localStorage.username;

    const maxRetries = 5; // Maximum retry attempts
    const retryDelay = 6000; // Delay between retries (5 seconds)
    const [error, setError] = useState(null);

    // Use media queries to detect screen size
    const isMobile = useMediaQuery('(max-width:600px)');

    // Function to fetch data with retry logic
    const fetchData = async (retryCount = maxRetries) => {
        setLoading(true); // Set loading state to true before fetching
        setError(null); // Clear any previous errors

        try {
            const response = await axios.get('https://preventech-proxy-service.onrender.com/api/emergency/getIncidentsByDate');
            let fetchedEmergencies = response.data;

            // Filter based on the username if not ADMIN or USER_ADMIN
            if (username !== "ADMIN" && username !== "USER_ADMIN") {
                fetchedEmergencies = fetchedEmergencies.filter(item =>
                    item.viaturas && item.viaturas.some(vehicle => vehicle.includes(username))
                );
            }

            console.log("Fetched emergencies: ", fetchedEmergencies);
            setEmergencies(fetchedEmergencies); // Set the emergencies data
            setLoading(false); // Data is loaded, set loading to false
        } catch (error) {
            console.error('Error fetching data:', error);

            if (retryCount > 0) {
                console.log(`Retrying... Attempts left: ${retryCount}`);
                setTimeout(() => fetchData(retryCount - 1), retryDelay); // Retry after the specified delay
            } else {
                console.log("Max retry attempts reached.");
                setError("Failed to load data after multiple attempts."); // Show error message after max retries
                setLoading(false); // Stop loading state after max retries
            }
        }
    };

    useEffect(() => {
        fetchData(); // Initial data fetch on mount or when username changes

        // Set an interval to re-fetch data every minute (60000ms)
        const interval = setInterval(fetchData, 60000); // Refresh every 1 minute

        // Cleanup the interval on unmount
        return () => clearInterval(interval);
    }, [username]); // Re-fetch when `username` changes

    const renderItem = (item) => {
        const array = item.viaturas[0] || [];
        const uniqueViaturas = [...new Set(array)];
        const viaturas = uniqueViaturas.join(', ');

        return (
            <div
                key={item.id}
                style={{
                    ...styles.item,
                    backgroundColor: item.corEstado,
                    flexDirection: isMobile ? 'column' : 'row' // Adjust for mobile
                }}
                onClick={() => navigate(`/ocorrenciasDetail/${item.id}`, { state: item })}
            >
                <div style={styles.content}>
                    <h3 style={styles.title}>{item.morada}, {item.localidadeMorada}</h3>
                    <p style={styles.description}>{item.descClassificacao}</p>
                    <p style={styles.vehicle}>{viaturas}</p>
                </div>
                <div style={styles.rightContainer}>
                    <span style={styles.estado}>{item.estado}</span>
                    <span style={styles.timestamp}>{item.dataHoraAlerta}</span>
                </div>
            </div>
        );
    };

    const handleBackClick = () => {
        window.history.back(); // Go back to the previous page
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: "#A0A0A0" }}>
                    <IconButton edge="start" color="inherit" onClick={handleBackClick} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Início
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={styles.container}>
                {loading ? (
                    <div style={styles.center}>
                        <ClipLoader size={50} color="#C0C0C0" />
                        A carregar...
                    </div>
                ) : emergencies.length === 0 ? (
                    <div>Não foram encontradas ocorrências.</div>
                ) : (
                    emergencies.map(renderItem)
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
    },
    content: {
        flex: 1,
        marginLeft: 25,
    },
    item: {
        display: 'flex', // Flexbox layout
        alignItems: 'center', // Center vertically
        backgroundColor: '#E0E0E0',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 20,
        borderColor: '#C0C0C0',
        border: '1px solid #C0C0C0',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 15,
        flexDirection: 'row', // Default for desktop, adjusted for mobile in renderItem
        transition: '0.3s ease', // Smooth transition for better UX
    },
    title: {
        fontSize: '1.5em', // Use responsive units for fonts
        paddingBottom: 5,
    },
    description: {
        fontSize: '1.2em',
        paddingBottom: 5,
    },
    vehicle: {
        marginTop: 5,
        fontSize: '1em',
        fontWeight: 'bold'
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center vertically
        alignItems: 'flex-end', // Align to the right
        textAlign: 'right',
        paddingRight: 25 // Add padding to the right
    },
    timestamp: {
        color: '#888',
        fontSize: '1em',
        marginTop: 10 // Add some spacing between estado and timestamp
    },
    estado: {
        fontWeight: 'bold',
        fontSize: '1.2em',
    },
    image: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
    },
    // Media query for mobile responsiveness
    '@media (max-width: 600px)': {
        container: {
            marginLeft: 10,
            marginRight: 10,
        },
        item: {
            flexDirection: 'column', // Stack elements for mobile
            padding: 10,
            marginHorizontal: 10,
        },
        title: {
            fontSize: '1.2em',
        },
        description: {
            fontSize: '1em',
        },
        vehicle: {
            fontSize: '0.9em',
        },
        timestamp: {
            fontSize: '0.8em',
        },
        estado: {
            fontSize: '1em',
        }
    }
};

export default Ocorrencias;