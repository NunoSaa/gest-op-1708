import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from "react-router-dom";



function OcorrenciasDetail() {

    let navigate = useNavigate()
    const location = useLocation();
    const { state } = location;
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [isTimerRunning, setIsTimerRunning] = useState(true);



    useEffect(() => {
        let intervalId;
        if (isTimerRunning) {
            intervalId = setInterval(() => {
                setCurrentTime(new Date().toLocaleTimeString());
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isTimerRunning]);

    const handleSetTime = () => {
        //setCurrentTime(new Date().toLocaleTimeString());
        //setIsTimerRunning(false); // Stop the timer
        console.log(currentTime)
    };

    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        // Handle submit logic
    };

    const openMaps = () => {
        const address = item.morada + ', ' + item.localidade_morada;
        const coordinates = item.sado_latitude_gps + ', ' + item.sado_longitude_gps;
        const encodedAddress = encodeURIComponent(address);
        const encodedCoordinates = encodeURIComponent(coordinates);
        //window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
        window.open(`https://www.google.com/maps/search/?q=${encodedCoordinates}`, '_blank');
    };

    if (!state) {
    }
    const item = state;
    console.log(item);
    const array = item.viaturas;
    const viaturas = array.join(', ');


    return (
        <div style={styles.center}>
            <div style={styles.container}>

                <div>
                    <h3 style={styles.title}>{item.desc_classificacao}</h3>
                </div>

                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Data: </span>
                    <span style={styles.info}>{item.data_hora_alerta}</span>
                </div>
                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Classifcação: </span>
                    <span style={styles.info}>{item.desc_classificacao}</span>
                </div>
                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Estado: </span>
                    <span style={styles.info}>{item.estado}</span>
                </div>
                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Local: </span>
                    <span style={styles.info}>{item.morada}</span>
                </div>
                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Localidade: </span>
                    <span style={styles.info}>{item.localidade_morada}</span>
                </div>
                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Latitude: </span>
                    <span style={styles.info}>{item.sado_latitude_gps}</span>
                    <span style={styles.infoProp}>Longitude: </span>
                    <span style={styles.info}>{item.sado_longitude_gps}</span>
                </div>
                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Número de elementos: </span>
                    <span style={styles.info}>{item.n_bombeiros}</span>
                </div>
                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Veiculos: </span>

                    <span style={styles.info}>{viaturas}</span>
                </div>

                <div style={styles.row}>
                    <Button title="Localizar Trajecto" style={styles.button_LocTrajeto}
                        onClick={() => openMaps()}>
                        <p style={styles.buttonText}>Localizar Trajecto</p>
                    </Button>
                </div>

                <div style={styles.row}>
                    <Button style={styles.button_ChegadaLocal}
                        onClick={() => handleSetTime()}>
                        <p style={styles.buttonText}>Chegada ao Local</p>
                        <p style={styles.buttonText}>{currentTime}</p>
                    </Button>

                    <Button style={styles.button_POSIT}
                        onClick={() => navigate('/posit', { state: item })}>
                        <p style={styles.buttonText}>POSIT</p>
                        <p style={styles.buttonTextPosit}>.</p>
                    </Button>
                </div>

                <div style={styles.row}>
                    <Button style={styles.button_ChegadaLocal}
                        onClick={() => handleSetTime()}>
                        <p style={styles.buttonText}>Saída do Local</p>
                        <p style={styles.buttonText}>{currentTime}</p>
                    </Button>
                    <Button style={styles.button_ChegadaLocal}>
                        <p style={styles.buttonText}>Fotos</p>
                        <p style={styles.buttonTextOther}>.</p>
                    </Button>
                </div>

                <div style={styles.row}>
                    <div>
                        <Button style={styles.button_ChegadaLocal}
                            onClick={() => handleSetTime()}>
                            <p style={styles.buttonText}>Chegada à Unidade</p>
                            <p style={styles.buttonText}>{currentTime}</p>
                        </Button>
                        <Button style={styles.button_ChegadaLocal}>
                            <p style={styles.buttonText}>Anexos</p>
                            <p style={styles.buttonTextOther}>.</p>
                        </Button>
                    </div>
                </div>

                <div style={styles.row}>
                    <ul>
                        {item.viaturas.map((viatura, index) => (
                            <a key={index}>
                                {viatura}
                                <TextField style={styles.input} label="Kms" />
                                <Button style={styles.button_Inserir}
                                    onClick={handleSubmit}>
                                    <p style={styles.buttonText}>Inserir</p>
                                </Button>
                            </a>
                        ))}
                    </ul>
                </div>
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
        marginTop: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        //marginLeft: 10,
        //marginRight: 10
    },
    scrollView: {
        marginHorizontal: 20,
    },
    time: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        marginBottom: 5,
        fontSize: 12,
    },
    buttonTextOther: {
        color: '#A0A0A0',
        marginBottom: 5,
        fontSize: 12,
    },
    buttonTextPosit: {
        color: '#FF6666',
        marginBottom: 5,
        fontSize: 12,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    rowInfo: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingLeft: 25
    },
    rowKmsFinais: {
        flexDirection: 'row',
        marginTop: 30,
        paddingLeft: 25,
        paddingRight: 25
    },
    button_ChegadaLocal: {
        width: "45%",
        height: 75,
        backgroundColor: '#A0A0A0',
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    button_POSIT: {
        width: "45%",
        height: 75,
        backgroundColor: '#FF6666',
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginLeft: 15,
    },
    button_LocTrajeto: {
        width: "91%",
        height: "10%",
        backgroundColor: '#A0A0A0',
        padding: 20,
        borderRadius: 10,
        alignSelf: "center",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginLeft: 15,
        marginRight: 25,
        marginTop: 25,
    },
    button_Inserir: {
        width: "46%",
        height: 50,
        backgroundColor: '#A0A0A0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        paddingBottom: 10,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 15
    },
    infoProp: {
        fontSize: 18,
        paddingBottom: 10,
        textAlign: "center",
        fontWeight: "bold",
    },
    info: {
        fontSize: 16,
        paddingBottom: 10,
        paddingLeft: 5,
        textAlign: "center",
        color: "grey"
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
};

export default OcorrenciasDetail;