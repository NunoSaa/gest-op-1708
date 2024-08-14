import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from "react-router-dom";



function OcorrenciasDetail() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [item, setItem] = useState(state);

    useEffect(() => {
        let intervalId;
        if (isTimerRunning) {
            intervalId = setInterval(() => {
                setCurrentTime(new Date().toLocaleTimeString());
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isTimerRunning]);

    useEffect(() => {
        if (!state) return;

        const refreshItemData = () => {
            // Simulate fetching new data
            const refreshedItem = { ...state, timestamp: new Date().toISOString() };
            setItem(refreshedItem);
            console.log('Item refreshed:', refreshedItem);
        };

        refreshItemData(); // Initial refresh

        // Set up an interval to refresh items every minute (60000 ms)
        const intervalId = setInterval(refreshItemData, 60000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [state]);

    const handleSetTime = () => {
        console.log(currentTime);
        setIsTimerRunning(false); // Optional: stop the timer
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        console.log(inputValue); // Handle submit logic
    };

    const openMaps = () => {
        if (!item) return;

        const address = `${item.morada}, ${item.localidadeMorada}`;
        const coordinates = `${item.sadoLatitudeGps}, ${item.sadoLongitudeGps}`;
        const encodedAddress = encodeURIComponent(address);
        const encodedCoordinates = encodeURIComponent(coordinates);

        window.open(`https://www.google.com/maps/search/?q=${encodedCoordinates}`, '_blank');
    };

    if (!state) {
        return <div>No state provided</div>;
    }

    const array = item.viaturas[0] || [];
  const viaturas = array.join(', ');


    return (
        <div style={styles.center}>
            <div style={styles.container}>
                <div>
                    <h3 style={styles.title}>{item.descClassificacao}</h3>
                </div>

                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Data: </span>
                    <span style={styles.info}>{item.dataHoraAlerta}</span>
                </div>
                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Classifcação: </span>
                    <span style={styles.info}>{item.descClassificacao}</span>
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
                    <span style={styles.info}>{item.localidadeMorada}</span>
                </div>
                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Latitude: </span>
                    <span style={styles.info}>{item.sadoLatitudeGps}</span>
                    <span style={styles.infoProp}>Longitude: </span>
                    <span style={styles.info}>{item.sadoLongitudeGps}</span>
                </div>
                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Número de elementos: </span>
                    <span style={styles.info}>{item.numeroBombeiros}</span>
                </div>
                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Veiculos: </span>

                    <span style={styles.infoViaturas}>{viaturas}</span>
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
                        onClick={() => navigate('/fitaTempo', { state: item })}>
                        <p style={styles.buttonText}>Fita de tempo</p>
                        <p style={styles.buttonTextPosit}>.</p>
                    </Button>
                </div>

                <div style={styles.row}>
                    <Button style={styles.button_SaidaLocal}
                        onClick={() => handleSetTime()}>
                        <p style={styles.buttonText}>Saída do Local</p>
                        <p style={styles.buttonText}>{currentTime}</p>
                    </Button>
                    <Button style={styles.button_Fotos}>
                        <p style={styles.buttonText}>Fotos</p>
                        <p style={styles.buttonTextOther}>.</p>
                    </Button>
                </div>

                <div style={styles.row}>
                    <div>
                        <Button style={styles.button_ChegadaUnidade}
                            onClick={() => handleSetTime()}>
                            <p style={styles.buttonText}>Chegada à Unidade</p>
                            <p style={styles.buttonText}>{currentTime}</p>
                        </Button>
                        <Button style={styles.button_Fotos}>
                            <p style={styles.buttonText}>Anexos</p>
                            <p style={styles.buttonTextOther}>.</p>
                        </Button>
                    </div>
                </div>
{/*
                <div style={styles.row}>
                    <ul style={styles.list}>
                        {item.viaturas[0].map((viatura, index) => (
                            <li key={index} style={styles.listItem}>
                                <div style={styles.viatura}><b>{viatura}</b></div>
                                <TextField style={styles.input} label="Kms" />
                                <Button
                                    style={styles.button_Inserir}
                                    onClick={() => handleSubmit(index)}>
                                    <p style={styles.buttonText}>Inserir</p>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
*/}
            </div>
        </div>
    );
};

const styles = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '110vh',
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
        backgroundColor: '#FF0000',
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    button_SaidaLocal: {
        width: "45%",
        height: 75,
        backgroundColor: '#FF8000',
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    button_ChegadaUnidade: {
        width: "45%",
        height: 75,
        backgroundColor: '#0BAB00',
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    button_Fotos: {
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
        backgroundColor: '#3399FF',
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
        width: "30%",
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
        marginRight: 5,
    },
    info: {
        fontSize: 16,
        paddingBottom: 10,
        paddingLeft: 5,
        textAlign: "center",
        color: "grey",
        marginRight: 20 ,
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
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        width: '100%',
        // other styles as needed
      },
      listItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '25px',
        paddingLeft: 25,
        // other styles as needed
      },
      viatura: {
        marginRight: '10px',
        // other styles as needed
      },
};

export default OcorrenciasDetail;