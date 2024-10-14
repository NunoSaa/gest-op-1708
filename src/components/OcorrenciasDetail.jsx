import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function OcorrenciasDetail() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [item, setItem] = useState(state);
    const vehicle = useRef([]); // Use a ref to store vehicle data
    const [error, setError] = useState(null);
    const [isChegadaLocalSet, setIsChegadaLocalSet] = useState(false);
    const [isSaidaLocalSet, setIsSaidaLocalSet] = useState(false);
    const [isChegadaUnidadeSet, setIsChegadaUnidadeSet] = useState(false);
    const [chegadaLocalTime, setChegadaLocalTime] = useState('');
    const [saidaLocalTime, setSaidaLocalTime] = useState('');
    const [chegadaUnidadeTime, setChegadaUnidadeTime] = useState('');
    const [emergencies, setEmergencies] = useState([]);
    const descricao = localStorage.getItem('username');

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
            const refreshedItem = { ...state, timestamp: new Date().toISOString() };
            setItem(refreshedItem);
            console.log('Item refreshed:', refreshedItem);
        };

        refreshItemData();

        const intervalId = setInterval(refreshItemData, 60000);

        return () => clearInterval(intervalId);
    }, [state]);

    const fetchEmergencies = async () => {
        try {
            const response = await axios.get('https://preventech-proxy-service.onrender.com/api/emergency/getIncidentByID?id_ocorrencia=' + item.id);
            if (response.data) {
                setEmergencies(response.data);
                console.log('Fetched Emergencies:', response.data);
                setLoading(false);

                // Extract and filter viaturas by descricao
                const vehicles = response.data[0].viaturas || [];
                const filteredVehicles = vehicles.filter(
                    (vehicle) => vehicle.descricao === descricao
                );

                // Store the filtered vehicles in a ref for immediate access
                vehicle.current = filteredVehicles;

                //setVehicle(filteredVehicles);
                console.log('filtered:', filteredVehicles)
                console.log('Vehicle Object:', vehicle);
                console.log('tes: ', response.data[0].viaturas[0].descricao)

                if (filteredVehicles[0].hora_chegada_to !== "") {
                    setChegadaLocalTime(filteredVehicles[0].hora_chegada_to)
                    setIsChegadaLocalSet(true)
                }

                if (filteredVehicles[0].hora_saida_to !== "") {
                    setSaidaLocalTime(filteredVehicles[0].hora_saida_to)
                    setIsSaidaLocalSet(true)
                }

                if (filteredVehicles[0].hora_chegada !== "") {
                    setChegadaUnidadeTime(filteredVehicles[0].hora_chegada)
                    setIsChegadaUnidadeSet(true)
                }

                // Optionally set loading state to false
                setLoading(false);
            } else {
                console.log('No emergencies data');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching emergencies:', error);
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchEmergencies(); // Initial fetch
        const intervalId = setInterval(fetchEmergencies, 60000); // Fetch every minute

        return () => clearInterval(intervalId); // Cleanup on unmount

    }, [item.id]); // Depend on `item.id` to refetch data if `item` changes

    const formatDateDDMMYYYY = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    //CHEGADA AO LOCAL
    const handleSetTimeChegadaLocal = async () => {
        const chegadaTime = new Date().toLocaleTimeString();
        setChegadaLocalTime(chegadaTime);

        const now = new Date();
        const currentDate = formatDateDDMMYYYY(now);
        const currentHour = now.toTimeString().split(' ')[0].substring(0, 5);

        try {

            const response = await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentDetails', {
                id_ocorrencia: emergencies[0].id,
                id_oco_viatura: vehicle.current[0].id_oco_viatura,
                id_viatura: vehicle.current[0].id_viatura,
                hora_saida: vehicle.current[0].hora_saida,
                data_saida: vehicle.current[0].data_saida,
                data_chegada_to: currentDate,
                hora_chegada_to: currentHour
            });
            setIsChegadaLocalSet(true);

            if (response.data && response.data.status === 'success') {
                alert('Chegada ao Local Enviada com Sucesso');

                await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentState', {
                    id_ocorrencia: emergencies[0].id,
                    id_estado: '6' 
                });

            } else {
                // Handle any other cases (like errors in the response)
                console.error('Unexpected response:', response.data);
                alert('Aconteceu um erro ao inserir a informação. Tente mais tarde.');
            }

            // Refresh the emergencies data after updating
            await fetchEmergencies();
            console.log('Chegada time updated:', response.data);
        } catch (error) {
            console.error('Error updating chegada time:', error);
            setError('Error updating chegada time');
        }
    };

    const handleSetTimeSaidaLocal = async () => {
        const chegadaTime = new Date().toLocaleTimeString();
        setSaidaLocalTime(chegadaTime);

        const now = new Date();
        // Get the current date in the format "YYYY-MM-DD"
        const currentDate = formatDateDDMMYYYY(now);

        // Get the current time in the format "HH:MM"
        const currentHour = now.toTimeString().split(' ')[0].substring(0, 5);

        try {
            const response = await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentDetails', {
                id_ocorrencia: emergencies[0].id,
                id_oco_viatura: vehicle.current[0].id_oco_viatura,
                id_viatura: vehicle.current[0].id_viatura,
                hora_saida: vehicle.current[0].hora_saida,
                data_saida: vehicle.current[0].data_saida,
                data_chegada_to: vehicle.current[0].data_chegada_to,
                hora_chegada_to: vehicle.current[0].hora_chegada_to,
                data_saida_to: currentDate,
                hora_saida_to: currentHour
            });
            setIsSaidaLocalSet(true);

            if (response.data && response.data.status === 'success') {

                await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentState', {
                    id_ocorrencia: emergencies[0].id,
                    id_estado: '5' 
                });

                alert('Saida do Local Enviada com Sucesso');
            } else {
                // Handle any other cases (like errors in the response)
                console.error('Unexpected response:', response.data);
                alert('Aconteceu um erro ao inserir a informação. Tente mais tarde.');
            }

            await fetchEmergencies();
            console.log('Chegada time updated:', response.data);
        } catch (error) {
            console.error('Error updating chegada time:', error);
            setError('Error updating chegada time');
        }
    };

    const handleSetTimeChegadaUnidade = async () => {
        const chegadaTime = new Date().toLocaleTimeString();
        setChegadaUnidadeTime(chegadaTime);

        const now = new Date();
        // Get the current date in the format "YYYY-MM-DD"
        const currentDate = formatDateDDMMYYYY(now);

        // Get the current time in the format "HH:MM"
        const currentHour = now.toTimeString().split(' ')[0].substring(0, 5);

        try {
            const response = await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentDetails', {
                id_ocorrencia: emergencies[0].id,
                id_oco_viatura: vehicle.current[0].id_oco_viatura,
                id_viatura: vehicle.current[0].id_viatura,
                hora_saida: vehicle.current[0].hora_saida,
                data_saida: vehicle.current[0].data_saida,
                data_chegada_to: vehicle.current[0].data_chegada_to,
                hora_chegada_to: vehicle.current[0].hora_chegada_to,
                data_saida_to: vehicle.current[0].data_saida_to,
                hora_saida_to: vehicle.current[0].hora_saida_to,
                data_chegada: currentDate,
                hora_chegada: currentHour
            });
            setIsChegadaUnidadeSet(true);

            if (response.data && response.data.status === 'success') {
                alert('Chegada a Unidade Enviada com Sucesso');

                await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentState', {
                    id_ocorrencia: emergencies[0].id,
                    id_estado: '7' 
                });
            } else {
                // Handle any other cases (like errors in the response)
                console.error('Unexpected response:', response.data);
                alert('Aconteceu um erro ao inserir a informação. Tente mais tarde.');
            }

            await fetchEmergencies();
            console.log('Chegada time updated:', response.data);
        } catch (error) {
            console.error('Error updating chegada time:', error);
            setError('Error updating chegada time');
        }
    };

    const openMaps = () => {
        if (!item) return;

        const { morada, localidadeMorada, sadoLatitudeGps, sadoLongitudeGps } = item;

        // Check if address components are available and not empty
        const hasAddress = morada && localidadeMorada && morada.trim() !== '' && localidadeMorada.trim() !== '';

        // Check if coordinate components are available and valid numbers
        const hasCoordinates =
            sadoLatitudeGps &&
            sadoLongitudeGps &&
            !isNaN(parseFloat(sadoLatitudeGps)) &&
            !isNaN(parseFloat(sadoLongitudeGps));

        if (hasAddress) {
            const address = `${morada}, ${localidadeMorada}`;
            const encodedAddress = encodeURIComponent(address);
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
        } else if (hasCoordinates) {
            const coordinates = `${sadoLatitudeGps},${sadoLongitudeGps}`;
            const encodedCoordinates = encodeURIComponent(coordinates);
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodedCoordinates}`, '_blank');
        } else {
            alert('O Endereço não é válido ou coordenadas não disponíveis no Maps');
        }
    };

    if (!state) {
        return <div>No state provided</div>;
    }

    const array = item.viaturas[0] || [];
    const uniqueViaturas = [...new Set(array)];
    const viaturas = uniqueViaturas.join(', ');

    const handleBackClick = () => {
        window.history.back(); // Go back to the previous page
    };

    const renderItem = (item) => (
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
                    <span style={styles.infoProp}>Freguesia: </span>
                    <span style={styles.info}>{item.localidade}</span>
                </div>
                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Ponto de Referência: </span>
                    <span style={styles.info}>{item.ponto_referencia}</span>
                </div>
                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Latitude: </span>
                    <span style={styles.info}>{item.sadoLatitudeGps}</span>
                    <span style={styles.infoProp}>Longitude: </span>
                    <span style={styles.info}>{item.sadoLongitudeGps}</span>
                </div>
                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Número de elementos: </span>
                    <span style={styles.info}>{item.n_bombeiros}</span>
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
                        onClick={() => handleSetTimeChegadaLocal()}
                        disabled={isChegadaLocalSet}>
                        <p style={{ ...styles.buttonText, marginRight: '5px' }}>Chegada ao Local</p>
                        <p style={styles.buttonText}>{isChegadaLocalSet ? chegadaLocalTime : currentTime}</p>
                    </Button>

                    <Button style={styles.button_POSIT}
                        onClick={() => navigate('/fitaTempo', { state: item })}>
                        <p style={styles.buttonText}>Fita de tempo</p>
                        <p style={styles.buttonTextPosit}>.</p>
                    </Button>
                </div>

                <div style={styles.row}>
                    <Button style={styles.button_SaidaLocal}
                        onClick={() => handleSetTimeSaidaLocal()}
                        disabled={isSaidaLocalSet}>
                        <p style={{ ...styles.buttonText, marginRight: '5px' }}>Saída do Local </p>
                        <p style={styles.buttonText}>{isSaidaLocalSet ? saidaLocalTime : currentTime}</p>
                    </Button>
                    <Button style={styles.button_Fotos}
                        onClick={() => navigate('/takePicturePosit')}>
                        <p style={styles.buttonText}>Anexar Fotos</p>
                        <p style={styles.buttonTextOther}>.</p>
                    </Button>
                </div>

                <div style={styles.row}>
                    {(descricao === 'ABSC01' || descricao === 'ABSC02'
                        || descricao === 'ABSC03' || descricao === 'ABSC04' || descricao === 'VOPE06'
                    ) && (
                            <div>
                                <Button
                                    style={styles.button_Fotos}>
                                    <p style={{ ...styles.buttonText, marginRight: '5px' }}>
                                        Saída do Hospital
                                    </p>
                                    <p style={styles.buttonText}>
                                        {isChegadaUnidadeSet ? chegadaUnidadeTime : currentTime}
                                    </p>
                                </Button>

                                <Button style={styles.button_Fotos}>
                                    <p style={styles.buttonText}
                                        onClick={() => {
                                            console.log('Anexar Verbete button clicked');
                                            navigate('/verbeteINEM');
                                        }}>Anexar Verbete</p>
                                    <p style={styles.buttonTextOther}>.</p>
                                </Button>
                            </div>
                        )}
                </div>

                <div style={styles.row}>
                    <div>
                        <Button style={styles.button_ChegadaUnidade}
                            onClick={() => handleSetTimeChegadaUnidade()}
                            disabled={isChegadaUnidadeSet}>
                            <p style={{ ...styles.buttonText, marginRight: '5px' }}>Chegada à Unidade</p>
                            <p style={styles.buttonText}>{isChegadaUnidadeSet ? chegadaUnidadeTime : currentTime}</p>
                        </Button>
                        <Button style={styles.button_RelatorioFinal}
                            onClick={() => navigate('/relatorioFinal', { state: item })}>
                            <p style={styles.buttonText}>Relatório Final</p>
                            <p style={styles.buttonTextOther}>.</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: "#A0A0A0" }}>
                    <IconButton edge="start" color="inherit" onClick={handleBackClick} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Lista de Ocorrências
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={styles.container}>
                {loading ? (
                    <div style={styles.center}>
                        <ClipLoader size={50} color="#C0C0C0" />
                        A carregar...</div> // You can replace this with a loading icon
                ) : emergencies.length === 0 ? (
                    <div>Não foram encontradas ocorrências.</div> // Render message if emergencies array is empty
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
        height: '110vh',
    },
    container: {
        backgroundColor: "white",  // Your background color
        padding: 20,               // Optional padding for the container
        boxSizing: 'border-box',   // Include padding in the element's width and height
        // Width and height can be adjusted based on content or fixed dimensions
        width: '100%',              // Example width, adjust as needed
        maxWidth: '100%',         // Example maximum width, adjust as needed
        borderRadius: 10,
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
    button_RelatorioFinal: {
        width: "45%",
        height: 75,
        backgroundColor: '#2bbfd9',
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