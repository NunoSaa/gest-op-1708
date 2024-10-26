import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Grid, CircularProgress, Chip } from '@mui/material';
import TextField from '@mui/material/TextField';

function InserirKms() {

    const location = useLocation();
    const { state } = location;
    const [timeTape, setTimeTape] = useState([]);
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState(state);
    const [error, setError] = useState(null);


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

            <div style={styles.center}>
                <div style={styles.container}>
                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        {/* Vertical Column with "Ocorrência" */}
                        <div style={{
                            width: '25px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            writingMode: 'vertical-lr',
                            textAlign: 'center',
                            backgroundColor: '#99CCFF',  // Optional background for visual separation
                            padding: '10px',
                            fontWeight: 'bold',
                            flexShrink: 0,    // Prevents the column from shrinking,
                            marginBottom: "25px",
                            transform: 'rotate(180deg)'
                        }}>
                            Veículo
                        </div>

                        {/* Event Form */}
                        <div className="event-form" style={{ flexGrow: 1 }}>
                            <section className="header-section">
                                <div style={styles.rowInfoContainer}>
                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>Tipologia : </span>
                                        <span style={styles.info}>{item.viaturas[0].descricao}</span>
                                    </div>
                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>Veículo: </span>
                                        <span style={styles.info}>{item.viaturas[0].marca + ' ' + item.viaturas[0].modelo}</span>
                                    </div>
                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>Matrícula: </span>
                                        <span style={styles.info}>{item.viaturas[0].matricula}</span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        {/* Vertical Column with "Ocorrência" */}
                        <div style={{
                            width: '25px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            writingMode: 'vertical-lr',
                            textAlign: 'center',
                            backgroundColor: '#99CCFF',  // Optional background for visual separation
                            padding: '10px',
                            fontWeight: 'bold',
                            flexShrink: 0,    // Prevents the column from shrinking,
                            marginBottom: "25px",
                            transform: 'rotate(180deg)'
                        }}>
                            Ocorrência
                        </div>

                        {/* Event Form */}
                        <div className="event-form" style={{ flexGrow: 1 }}>
                            <section className="header-section">
                                <div style={styles.rowInfoContainer}>
                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>Data: </span>
                                        <span style={styles.info}>{item.data_hora_alerta}</span>
                                    </div>
                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>Classificação: </span>
                                        <span style={styles.info}>{item.desc_classificacao}</span>
                                    </div>
                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>Estado: </span>
                                        <Chip
                                            label={item.estado}
                                            style={{
                                                fontSize: 16,
                                                color: "black",
                                                backgroundColor: item.cor_estado,
                                            }}
                                        />
                                    </div>
                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>Número de elementos: </span>
                                        <span style={styles.info}>{item.n_bombeiros}</span>
                                    </div>
                                </div>

                                <div style={styles.rowInfoKmsContainer}>
                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>Km's Início: </span>
                                        <span style={styles.info}>{item.viaturas[0].km_inicio}</span>
                                    </div>

                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>Km's Finais: </span>
                                        <TextField
                                            style={styles.inputCell}
                                            variant="outlined" />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div style={styles.rowInfoContainer}>
                        <div style={styles.rowButtonContainer}>
                            {/* Save Button */}
                            <Button
                                type="submit"
                                fullWidth
                                style={styles.button_SAVE}
                                onClick={''}
                            >
                                <p style={styles.buttonText}>Inserir Km's</p>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </Box>
    );
};

const styles = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        //alignItems: 'center',
        minHeight: '100vh',  // Adjust this height for full-screen alignment
        marginTop: 25,
    },
    container: {
        backgroundColor: "white",
        padding: 20,
        boxSizing: 'border-box',
        width: '100%',          // Set a max width for desktop
        maxWidth: '1200px',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: '16px',
        fontWeight: 'bold',
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
    infoProp: {
        fontSize: 18,
        paddingBottom: 10,
        textAlign: "center",
        fontWeight: "bold",
        marginRight: 5,
    },
    info: {
        fontSize: 16,
        paddingBottom: 10,
        paddingLeft: 5,
        textAlign: "center",
        color: "grey",
        marginRight: 20,
    },
    infoViaturas: {
        fontSize: 16,
        paddingBottom: 10,
        paddingLeft: 5,
        textAlign: "center",
        color: "grey",
        gap: 10,
    },
    input: {
        height: 50,
        width: "39%",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginLeft: 15,
        marginRight: 15
    },
    rowInfoContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Two columns for desktop view
        gap: '10px', // Space between grid items
    },
    rowInfoKmsContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Two columns for desktop view
        gap: '10px', // Space between grid items
        marginTop: 15
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 15,
        flexWrap: 'wrap',
    },
    rowInfo: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: 5,
        paddingLeft: 25,
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    rowKmsFinais: {
        flexDirection: 'row',
        marginTop: 30,
        paddingLeft: 25,
        paddingRight: 25
    },
    rowButtonContainer: {
        gridColumn: 'span 2', // Adjusts the button to span across two columns for full width
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    button_SAVE: {
        width: '100%', // Full width within its grid container
        height: 75,
        backgroundColor: '#99FF99',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
};

export default InserirKms