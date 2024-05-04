import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Login.css';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';



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
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    };

    if (!state) {
    }
    const item = state;
    console.log(item);
    const array = item.viaturas;
    const viaturas = array.join(', ');


    return (
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
                <button title="Localizar Trajecto" style={styles.button_LocTrajeto}
                    onClick={() => openMaps()}>
                    <p style={styles.buttonText}>Localizar Trajecto</p>
                </button>
            </div>

            <div style={styles.row}>
                <button style={styles.button_ChegadaLocal}
                    onClick={() => handleSetTime()}>
                    <p style={styles.buttonText}>Chegada ao Local</p>
                    <p style={styles.buttonText}>{currentTime}</p>
                </button>
                
                <button style={styles.button_POSIT}
                    onClick={() => navigate('POSIT')}>
                    <p style={styles.buttonText}>POSIT</p>
                    <p style={styles.buttonTextPosit}>.</p>
                </button>
            </div>

            <div style={styles.row}>
                <button style={styles.button_ChegadaLocal}
                    onClick={() => handleSetTime()}>
                    <p style={styles.buttonText}>Saída do Local</p>
                    <p style={styles.buttonText}>{currentTime}</p>
                </button>
                <button style={styles.button_ChegadaLocal}
                    onClick={() => navigate('POSIT')}>
                    <p style={styles.buttonText}>Fotos</p>
                    <p style={styles.buttonTextOther}>.</p>
                </button>
            </div>

            <div style={styles.row}>
                <div>
                    <button style={styles.button_ChegadaLocal}
                        onClick={() => handleSetTime()}>
                        <p style={styles.buttonText}>Chegada à Unidade</p>
                        <p style={styles.buttonText}>{currentTime}</p>
                    </button>
                    <button style={styles.button_ChegadaLocal}
                        onClick={() => navigate('POSIT')}>
                        <p style={styles.buttonText}>Anexos</p>
                        <p style={styles.buttonTextOther}>.</p>
                    </button>
                </div>
            </div>

            <div style={styles.row}>
                <TextField style={styles.input} label="Kms" />
                <button style={styles.button_Inserir}
                    onClick={handleSubmit}>
                    <p style={styles.buttonText}>Inserir</p>
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        marginTop: 25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        marginLeft: 10,
        marginRight: 10
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
        width: "45%", // Set the width and height to create square buttons
        height: 75,
        backgroundColor: '#A0A0A0',
        borderRadius: 10,
        flex: 1, // Each button takes up equal space within the row
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    button_POSIT: {
        width: "45%", // Set the width and height to create square buttons
        height: 75,
        backgroundColor: '#FF6666',
        borderRadius: 10,
        flex: 1, // Each button takes up equal space within the row
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    button_LocTrajeto: {
        width: "91%", // Set the width and height to create square buttons
        height: "10%",
        backgroundColor: '#A0A0A0',
        padding: 20,
        borderRadius: 10,
        alignSelf: "center",
        flex: 1, // Each button takes up equal space within the row
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginLeft: 15,
        marginRight: 25,
        marginTop: 25,
    },
    button_Inserir: {
        width: "45%", // Set the width and height to create square buttons
        height: 50,
        backgroundColor: '#A0A0A0',
        //padding: 20,
        //marginHorizontal: 20,
        //marginVertical: 20,
        borderRadius: 10,
        //flex: 1, // Each button takes up equal space within the row
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
        width: "45%",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginLeft: 15,
        marginRight: 15
        //marginTop: 25
        //marginBottom: 20,
    },
};

export default OcorrenciasDetail;