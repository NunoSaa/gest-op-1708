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
import EmergencyDetails from '../components/OcorrenciasComponents/EmergencyDetails';
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
    const [isChegadaUnidadeHospSet, setIsChegadaUnidadeHospSet] = useState(false);
    const [chegadaLocalTime, setChegadaLocalTime] = useState('');
    const [saidaLocalTime, setSaidaLocalTime] = useState('');
    const [chegadaUnidadeTime, setChegadaUnidadeTime] = useState('');
    const [chegadaUnidadeHospTime, setChegadaUnidadeHospTime] = useState('');
    const [isDisponivel, setDisponivel] = useState('');
    const [isChegadaHospSet, setChegadaHospSet] = useState('');
    const [emergencies, setEmergencies] = useState([]);
    const descricao = localStorage.getItem('username');
    const incidentReport = JSON.parse(localStorage.getItem('IncidentReport'));
    // State for kmFim, initially set to null or false
    const [kmFim, setKmFim] = useState(null);

    // Load EmergencyData from localStorage if available on component mount
    useEffect(() => {
        const localEmergencyData = localStorage.getItem('EmergencyData');
        if (localEmergencyData) {
            const parsedData = JSON.parse(localEmergencyData);
            setEmergencies(parsedData);
            setLoading(false);
        } else {
            // Fetch if not available in localStorage
            fetchEmergencies();
        }
    }, []);

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

                //Set fetched Data into local storage
                if (response.data.length > 0) {
                    // Set data to localStorage
                    try {
                        localStorage.setItem('EmergencyData', JSON.stringify(response.data));
                        console.log('Emergency data saved to localStorage successfully');
                    } catch (e) {
                        console.error('Error saving data to localStorage:', e);
                    }
                } else {
                    console.log('No emergencies data to save.');
                }

                setLoading(false);

                // Extract and filter viaturas by descricao
                const vehicles = response.data[0].viaturas || [];
                const filteredVehicles = vehicles.filter(
                    (vehicle) => vehicle.descricao === descricao
                );

                // Set `kmFim` if available in filtered vehicles
                if (filteredVehicles.length > 0) {
                    setKmFim(filteredVehicles[0].km_fim);
                }

                // Store the filtered vehicles in a ref for immediate access
                vehicle.current = filteredVehicles;

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
                km_inicio: vehicle.current[0].km_inicio,
                km_fim: '',
                data_chegada_to: currentDate,
                hora_chegada_to: currentHour
            });
            setIsChegadaLocalSet(true);

            if (response.data && response.data.status === 'success') {
                alert('Chegada ao Local Enviada com Sucesso');

                if (descricao === 'ABSC01' || descricao === 'ABSC02'
                    || descricao === 'ABSC03' || descricao === 'ABSC04' || descricao === 'VOPE06') {
                    await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentState', {
                        id_ocorrencia: emergencies[0].id,
                        id_estado: '5'
                    });
                }
                else {
                    await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentState', {
                        id_ocorrencia: emergencies[0].id,
                        id_estado: '5'
                    });
                }


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
                km_inicio: vehicle.current[0].km_inicio,
                km_fim: '',
                data_saida_to: currentDate,
                hora_saida_to: currentHour
            });
            setIsSaidaLocalSet(true);

            if (response.data && response.data.status === 'success') {

                if (descricao === 'ABSC01' || descricao === 'ABSC02'
                    || descricao === 'ABSC03' || descricao === 'ABSC04' || descricao === 'ABSC09' || descricao === 'VOPE06') {
                    await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentState', {
                        id_ocorrencia: emergencies[0].id,
                        id_estado: '5'
                    });
                }
                else {
                    await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentState', {
                        id_ocorrencia: emergencies[0].id,
                        id_estado: '7'
                    });
                }

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

    const handleSetTimeChegadaUnidadeHosp = async () => {

        try {
            let response = null;
            const now = new Date();
            // Get the current date in the format "YYYY-MM-DD"
            const currentDate = formatDateDDMMYYYY(now);

            // Get the current time in the format "HH:MM"
            const currentHour = now.toTimeString().split(' ')[0].substring(0, 5);

            if (descricao === 'ABSC01' || descricao === 'ABSC02'
                || descricao === 'ABSC03' || descricao === 'ABSC04' || descricao === 'ABSC09' || descricao === 'VOPE06') {

                localStorage.setItem('hora_chegada_unidade_hospitalar', currentHour);

                response = await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentState', {
                    id_ocorrencia: emergencies[0].id,
                    id_estado: '7'
                });

                if (response.data && response.data.status === 'success') {
                    alert('Chegada à Unidade Hospitalar Enviada com Sucesso');
                }
            }

            setIsChegadaUnidadeHospSet(true);
            await fetchEmergencies();

        } catch (error) {
            console.error('Error updating chegada time:', error);
            setError('Error updating chegada time');
        }
    };

    const handleDisponivel = async () => {
        try {
            let response = null;
            const now = new Date();
            // Get the current date in the format "YYYY-MM-DD"
            const currentDate = formatDateDDMMYYYY(now);

            // Get the current time in the format "HH:MM"
            const currentHour = now.toTimeString().split(' ')[0].substring(0, 5);

            if (descricao === 'ABSC01' || descricao === 'ABSC02'
                || descricao === 'ABSC03' || descricao === 'ABSC04' || descricao === 'ABSC09' || descricao === 'VOPE06') {

                localStorage.setItem('hora_disponivel', currentHour);

                response = await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentState', {
                    id_ocorrencia: emergencies[0].id,
                    id_estado: '8'
                });

                if (response.data && response.data.status === 'success') {
                    alert(descricao + ' Disponível com Sucesso');
                }
            }

            setDisponivel(true);
            await fetchEmergencies();

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
                km_inicio: vehicle.current[0].km_inicio,
                km_fim: '',
                data_chegada: currentDate,
                hora_chegada: currentHour
            });
            setIsChegadaUnidadeSet(true);

            if (response.data && response.data.status === 'success') {
                alert('Chegada à Unidade Enviada com Sucesso');

                if (descricao === 'ABSC01' || descricao === 'ABSC02'
                    || descricao === 'ABSC03' || descricao === 'ABSC04' || descricao === 'ABSC09' || descricao === 'VOPE06') {
                    await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentState', {
                        id_ocorrencia: emergencies[0].id,
                        //id_estado: '10'
                        id_estado: '8'
                    });
                }
                else {
                    await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentState', {
                        id_ocorrencia: emergencies[0].id,
                        id_estado: '8'
                    });
                }
            } else {
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

    const handleFinalizarOcorrencia = async () => {

        if (incidentReport && incidentReport.descricao.length > 0 && kmFim != 0) {

            try {
                let response = null;

                response = await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentState', {
                    id_ocorrencia: emergencies[0].id,
                    id_estado: '10'
                });

                if (response.data && response.data.status === 'success') {
                    alert(descricao + ' Ocorrencia Finalizada com Sucesso');

                    localStorage.removeItem("IncidentReport");
                    localStorage.removeItem("EmergencyData");
                    navigate('/homepage');
                }

            } catch (error) {
                console.error('Error updating chegada time:', error);
                setError('Error updating chegada time');
            }
        } else {
            alert("Dados não preenchidos (Km's veículo / Relatório Final). Por favor, preencha antes de finalizar.");
        }

    }

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
                        A carregar...
                    </div>
                ) : emergencies.length === 0 ? (
                    <div>Não foram encontradas ocorrências.</div>
                ) : (
                    emergencies.map((item) => (
                        <EmergencyDetails
                            key={item.id}
                            item={item}
                            currentTime={currentTime}
                            isChegadaLocalSet={isChegadaLocalSet}
                            chegadaLocalTime={chegadaLocalTime}
                            isSaidaLocalSet={isSaidaLocalSet}
                            saidaLocalTime={saidaLocalTime}
                            isChegadaUnidadeSet={isChegadaUnidadeSet}
                            chegadaUnidadeTime={chegadaUnidadeTime}
                            isDisponivel={isDisponivel}
                            handleSetTimeChegadaLocal={handleSetTimeChegadaLocal}
                            handleSetTimeSaidaLocal={handleSetTimeSaidaLocal}
                            handleSetTimeChegadaUnidade={handleSetTimeChegadaUnidade}
                            handleDisponivel={handleDisponivel}
                            openMaps={openMaps}
                            navigate={navigate}
                            descricao={descricao}
                            viaturas={viaturas}
                            isChegadaUnidadeHospSet={isChegadaUnidadeHospSet}
                            handleSetTimeChegadaUnidadeHosp={handleSetTimeChegadaUnidadeHosp}
                            isChegadaHospSet={isChegadaHospSet}
                            handleFinalizarOcorrencia={handleFinalizarOcorrencia}
                            emergencies={emergencies}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
};

export default OcorrenciasDetail;