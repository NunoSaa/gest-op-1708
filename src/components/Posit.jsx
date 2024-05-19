import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from "react-router-dom";



function Posit() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [geolocation, setGeoLocation] = useState({ latitude: null, longitude: null });
    const [geolocationGMS, setGeoLocationGMS] = useState({ latitude: '', longitude: '' });
    const [item, setItem] = useState(state);

    const fetchGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude.toFixed(6);
                    const longitude = position.coords.longitude.toFixed(6);
                    setGeoLocation({ latitude, longitude });
                    setGeoLocationGMS({
                        latitude: decimalDegreesToGMS(latitude, 'latitude'),
                        longitude: decimalDegreesToGMS(longitude, 'longitude')
                    });
                },
                error => {
                    console.error('Error obtaining geolocation', error);
                    alert('Unable to obtain your location. Please check your permissions.');
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser');
            alert('Geolocation is not supported by your browser.');
        }
    };

    const refreshItemData = () => {
        const refreshedItem = { ...state, timestamp: new Date().toISOString() };
        setItem(refreshedItem);
        console.log('Item refreshed:', refreshedItem);
    };

    const decimalDegreesToGMS = (decimalDegrees, type) => {
        const absolute = Math.abs(decimalDegrees);
        const degrees = Math.floor(absolute);
        const minutesNotTruncated = (absolute - degrees) * 60;
        const minutes = Math.floor(minutesNotTruncated);
        const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);

        const direction = decimalDegrees >= 0
            ? (type === 'latitude' ? 'N' : 'E')
            : (type === 'latitude' ? 'S' : 'W');

        return `${degrees}°${minutes}'${seconds}"${direction}`;
    };

    useEffect(() => {
        if (!state) {
            console.warn('No state provided');
            navigate('/error'); // Navigate to an error page or handle accordingly
            return;
        }

        fetchGeolocation();
        refreshItemData(); // Initial refresh

        const interval = setInterval(() => {
            refreshItemData();
        }, 60000);

        return () => clearInterval(interval);
    }, [state, navigate]);


    return (
        <div style={styles.container}>

            <div style={styles.row}>
                <Button style={styles.button_ChegadaLocal}>
                    <p style={styles.buttonText}>Relatório</p>

                </Button>

                <Button style={styles.button_POSIT}
                    onClick={() => navigate('/posit')}>
                    <p style={styles.buttonText}>POSIT</p>
                </Button>
            </div>

            <div style={styles.center}>
                <div style={styles.rowGeo}>
                    <div>
                        <p><b>Latitude: </b>{geolocation.latitude}</p>
                        <p><b>Longitude: </b>{geolocation.longitude}</p>
                    </div>
                    <div>
                        <p><b>Latitude GMS: </b>{geolocationGMS.latitude}</p>
                        <p><b>Longitude GMS: </b>{geolocationGMS.longitude}</p>
                    </div>
                </div>
            </div>

            <div style={styles.row}>
                <p>Horas de Bomba: </p>
                <TextField style={styles.input} label="Horas de Bomba" />
            </div>

            <div style={styles.row}>
                <p>Descrição da Ocorrência: </p>
                <TextField style={styles.inputBomba} label="Decrição da ocorrência" multiline rows={12} />
            </div>

            <div style={styles.row}>
                <p>Descrição do Trabalho Desenvolvido: </p>
                <TextField style={styles.inputBomba} label="Decrição do trabalho desenvolvido" multiline rows={12} />
            </div>


            <div style={styles.center}>
                <div style={styles.row}>
                    <Button style={styles.button_SAVE}>
                        <p>Guardar</p>
                    </Button>
                </div>
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
    center: {
        height: "45%",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
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
        marginBottom: 35,
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
    rowGeo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 25,
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
    button_SIRESP: {
        width: 150,
        height: 75,
        backgroundColor: '#A0A0A0',
        borderRadius: 10,
        //flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
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
    button_SAVE: {
        width: 250,
        height: 75,
        backgroundColor: '#99FF99',
        borderRadius: 10,
        //flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        marginLeft: 15
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
        width: "45%",
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
        width: "45%",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginLeft: 15,
        marginRight: 15
    },
    inputBomba: {
        height: 200,
        width: "98%",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 150,
    },
};

export default Posit;