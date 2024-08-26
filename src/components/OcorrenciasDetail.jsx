import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from 'react-spinners';

function OcorrenciasDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [item, setItem] = useState(state);
    const [vehicle, setVehicle] = useState([]);
    const [error, setError] = useState(null);
    const [isChegadaLocalSet, setIsChegadaLocalSet] = useState(false);
    const [isSaidaLocalSet, setIsSaidaLocalSet] = useState(false);
    const [isChegadaUnidadeSet, setIsChegadaUnidadeSet] = useState(false);
    const [chegadaTime, setChegadaTime] = useState('');
    const [emergencies, setEmergencies] = useState([]);
    const [lastVehicleUpdate, setLastVehicleUpdate] = useState(Date.now());

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

    useEffect(() => {
        const fetchEmergencies = async () => {
            try {
                const response = await axios.get('https://preventech-proxy-service.onrender.com/api/emergency/getIncidentByID?id_ocorrencia=' + item.id);
                if (response.data) {
                    setEmergencies(response.data);
                    console.log('Fetched Emergencies:', response.data);
                    setLoading(false);

                    const vehicles = response.data[0].viaturas || [];
                    // Filter vehicles based on the description
                    const filteredVehicles = vehicles.filter(vehicle => vehicle.descricao === descricao);

                    // Log filtered vehicles for debugging
                    console.log('Filtered Vehicles:', filteredVehicles);
                    // Update the state with the mapped vehicles
                    setVehicle(filteredVehicles);
                    console.log("vehicle object", vehicle)

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

    const handleSetTimeChegadaLocal = async () => {
        const chegadaTime = new Date().toLocaleTimeString();
        setChegadaTime(chegadaTime);

        const now = new Date();
        // Get the current date in the format "YYYY-MM-DD"
        const currentDate = formatDateDDMMYYYY(now);

        // Get the current time in the format "HH:MM"
        const currentHour = now.toTimeString().split(' ')[0].substring(0, 5);

        try {
            const response = await axios.put('http://localhost:3000/api/emergency/updateIncidentDetails', {
                id_ocorrencia: emergencies[0].id,
                id_oco_viatura: vehicle[0].id_oco_viatura,
                id_viatura: vehicle[0].id_viatura,
                data_chegada_to: currentDate,
                hora_chegada_to: currentHour
            });
            setIsChegadaLocalSet(true);
            console.log('Chegada time updated:', response.data);
        } catch (error) {
            console.error('Error updating chegada time:', error);
            setError('Error updating chegada time');
        }
    };

    const handleSetTimeSaidaLocal = async () => {
        const chegadaTime = new Date().toLocaleTimeString();
        setChegadaTime(chegadaTime);

        const now = new Date();
        // Get the current date in the format "YYYY-MM-DD"
        const currentDate = formatDateDDMMYYYY(now);

        // Get the current time in the format "HH:MM"
        const currentHour = now.toTimeString().split(' ')[0].substring(0, 5);

        try {
            const response = await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentDetails', {
                id_ocorrencia: emergencies[0].id,
                id_oco_viatura: vehicle[0].id_oco_viatura,
                id_viatura: vehicle[0].id_viatura,
                data_chegada_to: vehicle[0].data_chegada_to,
                hora_chegada_to: vehicle[0].hora_chegada_to,
                data_saida_to: currentDate,
                hora_saida_to: currentHour
            });
            setIsSaidaLocalSet(true);
            console.log('Chegada time updated:', response.data);
        } catch (error) {
            console.error('Error updating chegada time:', error);
            setError('Error updating chegada time');
        }
    };

    const handleSetTimeChegadaUnidade = async () => {
        const chegadaTime = new Date().toLocaleTimeString();
        setChegadaTime(chegadaTime);
        
        const now = new Date();
        // Get the current date in the format "YYYY-MM-DD"
        const currentDate = formatDateDDMMYYYY(now);

        // Get the current time in the format "HH:MM"
        const currentHour = now.toTimeString().split(' ')[0].substring(0, 5);

        try {
            const response = await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentDetails', {
                id_ocorrencia: emergencies[0].id,
                id_oco_viatura: vehicle[0].id_oco_viatura,
                id_viatura: vehicle[0].id_viatura,
                data_chegada_to: vehicle[0].data_chegada_to,
                hora_chegada_to: vehicle[0].hora_chegada_to,
                data_saida_to: vehicle[0].data_saida_to,
                hora_saida_to: vehicle[0].hora_saida_to,
                data_chegada: currentDate,
                hora_chegada: currentHour
            });
            setIsChegadaUnidadeSet(true);
            console.log('Chegada time updated:', response.data);
        } catch (error) {
            console.error('Error updating chegada time:', error);
            setError('Error updating chegada time');
        }
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
                        <p style={styles.buttonText}>Chegada ao Local</p>
                        <p style={styles.buttonText}>{isChegadaLocalSet ? chegadaTime : currentTime}</p>
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
                        <p style={styles.buttonText}>Saída do Local</p>
                        <p style={styles.buttonText}>{isSaidaLocalSet ? chegadaTime : currentTime}</p>
                    </Button>
                    <Button style={styles.button_Fotos}>
                        <p style={styles.buttonText}>Fotos</p>
                        <p style={styles.buttonTextOther}>.</p>
                    </Button>
                </div>

                <div style={styles.row}>
                    <div>
                        <Button style={styles.button_ChegadaUnidade}
                            onClick={() => handleSetTimeChegadaUnidade()}
                            disabled={isChegadaUnidadeSet}>
                            <p style={styles.buttonText}>Chegada à Unidade</p>
                            <p style={styles.buttonText}>{isChegadaUnidadeSet ? chegadaTime : currentTime}</p>
                            </Button>
                        <Button style={styles.button_Fotos}>
                            <p style={styles.buttonText}>Anexos</p>
                            <p style={styles.buttonTextOther}>.</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
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