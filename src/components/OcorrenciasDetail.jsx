import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/Logo.png'
import '../css/Login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';



function OcorrenciasDetail() {

    let navigate = useNavigate()
    const location = useLocation();
    const { state } = location;
    const currentTime = new Date().toLocaleTimeString();

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

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{item.desc_classificacao}</h1>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Data: </span>
                <span style={styles.info}>{item.data_hora_alerta}</span>
            </div>
            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Classifcação: </span>
                <span style={styles.info}>{item.desc_classificacao}</span>
            </div>
            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Local: </span>
                <span style={styles.info}>{item.morada}</span>
            </div>
            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Localidade: </span>
                <span style={styles.info}>{item.localidade_morada}</span>
            </div>

            <div style={styles.row}>
                <div>
                <button title="Localizar Trajecto" style={styles.button_LocTrajeto}
                    onClick={() => openMaps()}>
                    Localizar Trajecto
                </button>
                </div>
            </div>

            <div style={styles.row}>
                <div>
                <button style={styles.button_ChegadaLocal}
                        onClick={() => openMaps()}>
                     Chegada ao Local
                    </button>
                    <button style={styles.button_POSIT}
                        onClick={() => navigate('POSIT')}>
                        POSIT
                    </button>
                </div>
            </div>
            <div style={styles.row}>
                <div>
                <button style={styles.button_ChegadaLocal}
                        onClick={() => openMaps()}>
                     Saída do Local
                    </button>
                    <button style={styles.button_ChegadaLocal}
                        onClick={() => navigate('POSIT')}>
                        Fotos
                    </button>
                </div>
            </div>
            <div style={styles.row}>
                <div>
                <button style={styles.button_ChegadaLocal}
                        onClick={() => openMaps()}>
                     Chegada à Unidade
                    </button>
                    <button style={styles.button_ChegadaLocal}
                        onClick={() => navigate('POSIT')}>
                        Anexos
                    </button>
                </div>
            </div>

            <div style={styles.row}>
                <TextField style={styles.input} label="Kms"/>   
                <button style={styles.button_Inserir}
                    onClick={handleSubmit}>
                    Inserir
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: "white",
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
        height: "10%",
        backgroundColor: '#A0A0A0',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        flex: 1, // Each button takes up equal space within the row
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    button_POSIT: {
        width: "45%", // Set the width and height to create square buttons
        height: "10%",
        backgroundColor: '#FF6666',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        flex: 1, // Each button takes up equal space within the row
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:15,
    },
    button_LocTrajeto: {
        width: "90%", // Set the width and height to create square buttons
        height: "10%",
        backgroundColor: '#A0A0A0',
        padding: 20,
        borderRadius: 10,
        alignSelf: "center",
        //flex: 1, // Each button takes up equal space within the row
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginLeft: 15
    },
    button_Inserir: {
        width: "15%", // Set the width and height to create square buttons
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
        height: 45,
        width: "15%",
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