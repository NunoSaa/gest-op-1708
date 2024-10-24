import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Grid, CircularProgress } from '@mui/material';

function FitaTempo() {

    const location = useLocation();
    const { state } = location;
    const [timeTape, setTimeTape] = useState([]);
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState(state);
    const [error, setError] = useState(null);

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
            fetchData(item.id);
        }

        // Refresh every minute
        const interval = setInterval(() => {
            if (item && item.id) {
                // Refetch data every minute
                fetchData(item.id);
            }
        }, 60000);

        return () => clearInterval(interval);
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

    // Go back to the previous page
    const handleBackClick = () => {
        window.history.back();
    };

    return (
        <Box>
            {/* AppBar */}
            <AppBar position="static">
                <Toolbar sx={{ backgroundColor: "#A0A0A0" }}>
                    <IconButton edge="start" color="inherit" onClick={() => navigate(-1)} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Ocorrência
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ p: { xs: 2, sm: 3, md: 5 }, bgcolor: "background.paper", minHeight: '100vh' }}>
                {/* Action Buttons */}
                <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={5}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={() => navigate('/novoPosit', { state: item })}
                            sx={{ height: 75, borderRadius: 2, textTransform: 'none' }}
                        >
                            <Typography variant="h6">Novo POSIT</Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/recordPositAudio', { state: item })}
                            sx={{ height: 75, borderRadius: 2, textTransform: 'none' }}
                        >
                            <Typography variant="h6">Novo Áudio POSIT</Typography>
                        </Button>
                    </Grid>
                </Grid>

                {/* Content - Loading or Time Tape */}
                <Grid container justifyContent="center">
                    {loading ? (
                        <Box sx={{ textAlign: 'center', mt: 5 }}>
                            <ClipLoader size={50} color="#C0C0C0" />
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                A carregar...
                            </Typography>
                        </Box>
                    ) : timeTape.length === 0 ? (
                        <Typography variant="h6" color="textSecondary" align="center" sx={{ mt: 5 }}>
                            Não foram encontrados Registos.
                        </Typography>
                    ) : (
                        <Grid container spacing={2} sx={{ mt: 3 }}>
                            {timeTape.map((item, index) => (
                                <Grid item xs={12} key={index}>
                                    {renderItem(item)}
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

const styles = {
    container: {
        padding: '16px',
        maxWidth: '960px',
        margin: '0 auto',
    },
    buttonText: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    rowItem: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        padding: '20px',
        marginHorizontal: '20px',
        borderColor: '#C0C0C0',
        borderWidth: '2px',
        marginTop: '5px',
        borderRadius: 10
    },
    row: {
        flexDirection: 'row',
        marginBottom: '5px',
    },
    title: {
        fontSize: '24px',
        paddingBottom: '5px',
    },
    description: {
        fontSize: '18px',
        paddingBottom: '5px',
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
};

export default FitaTempo