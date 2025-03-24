import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, CircularProgress, Card, Grid } from '@mui/material';
import EmergencyDetails from '../components/OcorrenciasComponents/EmergencyDetails';
import GeoLocation from '../utils/GeoLocation';
import IncidentCoordinates from '../services/IncidentCoordinates'
import IncidentState from '../services/IncidentState';
import SendToGoogleDrive from '../utils/SendToGoogleDrive.js';
import IncidentReportService from '../services/IncidentReportService.js';
import { gapi } from 'gapi-script';

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
    const [isDisponivel, setIsDisponivel] = useState('');
    const [disponivelTime, setDisponivelTime] = useState('');
    const [isChegadaHospSet, setChegadaHospSet] = useState('');
    const [emergencies, setEmergencies] = useState([]);
    const descricao = localStorage.getItem('username');
    const incidentReport = JSON.parse(localStorage.getItem('IncidentReport'));
    const [kmFim, setKmFim] = useState(null);
    const [geoLocation, setGeoLocation] = useState(null);
    const [pdfBlob, setPdfBlob] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0); // Upload progress
    const [isUploading, setIsUploading] = useState(false); // Uploading state

    const now = new Date();
    // Get the current date in the format "YYYY-MM-DD"
    const currentDate = now.toISOString().split('T')[0];
    // Get the current time in the format "HH:MM"
    const currentHour = now.toTimeString().split(' ')[0].substring(0, 5);
    //Buld the FileName
    let fileName = item.numero + '_VERBETE_INEM_' + currentDate + '_' + currentHour + '.pdf';

    const formData = JSON.parse(localStorage.getItem("VerbeteData"))
    const num_ocorrencia = item.numero;
    const gravidadeValue = localStorage.getItem("selectedGravidade");

    const sexoMap = {
        "": "Feminino",
        "X": "Masculino"
      };

    useEffect(() => {
        const loadGeolocation = async () => {
            try {
                const locationData = await GeoLocation.fetchGeolocation();
                setGeoLocation(locationData);
            } catch (error) {
                console.error("Geolocation error:", error);
            }
        };
    
        loadGeolocation();
    }, []);
    
    // Load EmergencyData from localStorage if available on component start
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

        const hora_chegada_local = localStorage.getItem('hora_chegada_local');
        if(hora_chegada_local){
            setChegadaLocalTime(hora_chegada_local);
            setIsChegadaLocalSet(true);
        }

        const hora_saida_local = localStorage.getItem('hora_saida_local');
        if(hora_saida_local){
            setSaidaLocalTime(hora_saida_local);
            setIsSaidaLocalSet(true);
        }

        const hora_chegada_unidade_hospitalar = localStorage.getItem('hora_chegada_unidade_hospitalar');
        if(hora_chegada_unidade_hospitalar)
        {
            setChegadaUnidadeHospTime(hora_chegada_unidade_hospitalar);
            setIsChegadaUnidadeHospSet(true);
        }

        const hora_saida_unidade_hospitalar = localStorage.getItem('hora_saida_unidade_hospitalar');
        if(hora_saida_unidade_hospitalar){
            setDisponivelTime(hora_saida_unidade_hospitalar);
            setIsDisponivel(true);
        }

        const hora_chegada_unidade = localStorage.getItem('hora_chegada_unidade');
        if(hora_chegada_unidade){
            setChegadaUnidadeTime(hora_chegada_unidade);
            setIsChegadaUnidadeSet(true);
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
        };

        refreshItemData();

        const intervalId = setInterval(refreshItemData, 10000);

        return () => clearInterval(intervalId);
    }, [state]);

    //FETCH EMERGENCIES
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
                    } catch (e) {
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

    }, [item.id]);

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
            localStorage.setItem('hora_chegada_local', currentHour);

            if (response.data && response.data.status === 'success') {
                alert('Chegada ao Local Enviada com Sucesso');

                if (descricao === 'ABSC01' || descricao === 'ABSC02'
                    || descricao === 'ABSC03' || descricao === 'ABSC04' || descricao === 'ABSC09' || descricao === 'VOPE06') {

                    await Promise.allSettled([

                            IncidentCoordinates.updateIncidentCoordinates(emergencies[0].id,
                                geoLocation.geolocation.latitude,
                                geoLocation.geolocation.longitude),
                    
                            IncidentState.updateIncidentState(emergencies[0].id, '5')
                    ]);   

                }
                else {
                    
                    await Promise.allSettled([

                        IncidentCoordinates.updateIncidentCoordinates(emergencies[0].id,
                            geoLocation.geolocation.latitude,
                            geoLocation.geolocation.longitude),
                
                        IncidentState.updateIncidentState(emergencies[0].id, '5')
                    ]);  
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

    //SAIDA DO LOCAL
    const handleSetTimeSaidaLocal = async () => {
        
        const chegadaTime = new Date().toLocaleTimeString();
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

            if (response.data && response.data.status === 'success') {

                if (descricao === 'ABSC01' || descricao === 'ABSC02'
                    || descricao === 'ABSC03' || descricao === 'ABSC04' || descricao === 'ABSC09' || descricao === 'VOPE06') {
                        
                    try {

                        const result = await IncidentState.updateIncidentState(emergencies[0].id, '5');

                        if (result.status === 'success') {

                            setSaidaLocalTime(chegadaTime);
                            setIsSaidaLocalSet(true);
                            localStorage.setItem('hora_saida_local', currentHour);
    
                            alert('Saida do Local Enviada com Sucesso');
                        }
                    } 
                    catch (error) {
                        alert(error.message);
                    }
                    
                }
                else {

                    try {

                        const result = await IncidentState.updateIncidentState(emergencies[0].id, '7');

                        if (result.status === 'success') {
                            
                            setSaidaLocalTime(chegadaTime);
                            setIsSaidaLocalSet(true);
                            localStorage.setItem('hora_saida_local', currentHour);
    
                            alert('Saida do Local Enviada com Sucesso');
                        }
                    } 
                    catch (error) {
                        alert(error.message);
                    }
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

    //CHEGADA UNIDADE HOSPITALAR
    const handleSetTimeChegadaUnidadeHosp = async () => {

        const chegadaTime = new Date().toLocaleTimeString();
        const now = new Date();
        // Get the current date in the format "YYYY-MM-DD"
        const currentDate = formatDateDDMMYYYY(now);
        // Get the current time in the format "HH:MM"
        const currentHour = now.toTimeString().split(' ')[0].substring(0, 5);

        try {

            if (descricao === 'ABSC01' || descricao === 'ABSC02'
                || descricao === 'ABSC03' || descricao === 'ABSC04' || descricao === 'ABSC09' || descricao === 'VOPE06') {

                try {

                    const result = await IncidentState.updateIncidentState(emergencies[0].id, '7');

                    if (result.status === 'success') {

                        setChegadaUnidadeHospTime(chegadaTime);
                        setIsChegadaUnidadeHospSet(true);

                        localStorage.setItem('hora_chegada_unidade_hospitalar', currentHour);

                        alert('Chegada à Unidade Hospitalar Enviada com Sucesso');
                    }
                
                } catch (error) {
                    alert(error.message);
                }
            }

            await fetchEmergencies();

        } catch (error) {
            console.error('Error updating chegada time:', error);
            setError('Error updating chegada time');
        }
    };

    //DISPONIVEL
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

                localStorage.setItem('hora_saida_unidade_hospitalar', currentHour);

                try{

                    const result = await IncidentState.updateIncidentState(emergencies[0].id, '8');

                    if (result.status === 'success') {
                        alert(descricao + ' Ambulância Disponível com Sucesso');
                    }
                
                } catch (error) {
                    alert(error.message);
                }
            }

            disponivelTime(currentHour);
            setIsDisponivel(true);
            
            await fetchEmergencies();

        } catch (error) {
            console.error('Error updating chegada time:', error);
            setError('Error updating chegada time');
        }
    };

    //CHEGADA UNIDADE
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
            localStorage.setItem('hora_chegada_unidade', currentHour);


            if (response.data && response.data.status === 'success') {
                alert('Chegada à Unidade Enviada com Sucesso');

                if (descricao === 'ABSC01' || descricao === 'ABSC02'
                    || descricao === 'ABSC03' || descricao === 'ABSC04' || descricao === 'ABSC09' || descricao === 'VOPE06') {
                    
                    await IncidentState.updateIncidentState(emergencies[0].id, '8');
                }
                else {

                    await IncidentState.updateIncidentState(emergencies[0].id, '8');

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

    //FINALIZAR OCORRENCIA
    const handleFinalizarOcorrencia = async () => {

        // Confirm the action with a Yes/No dialog
        const isConfirmed = window.confirm("Você tem certeza que deseja finalizar a ocorrência?");
        if (!isConfirmed) {
            return; // If user clicks "No", stop the function
        }

        if (!incidentReport || incidentReport.descricao.length === 0 || kmFim === 0) {
            alert("Dados não preenchidos (Km's veículo / Relatório Final). Por favor, preencha antes de finalizar.");
            return;
        }

        try {
            // Send Victim Data to GESCORP
            await IncidentReportService.insertVictim(emergencies, formData, gravidadeValue);
    
            // Send Verbete to Google Drive
            try {
                await SendToGoogleDrive.initializeGapi(); // Ensure gapi is initialized
                const isAuthenticated = await SendToGoogleDrive.authenticateUser(); // Ensure user is signed in
            
                if (isAuthenticated) {
                    await SendToGoogleDrive.sendToDrive(
                        pdfBlob, fileName, formData, num_ocorrencia, setIsUploading, setUploadProgress, item
                    );
                } else {
                    console.error("User authentication failed.");
                }
            } catch (error) {
                console.error("Error initializing Google API:", error);
            }
    
            // Change Incident State to "Encerrada"
            /*
            const result = await IncidentState.updateIncidentState(emergencies[0].id, '10');
            if (result.status === 'success') {
                alert(`${descricao} Ocorrência Finalizada com Sucesso`);
                navigate('/homepage');
            } else {
                throw new Error("Erro ao atualizar estado da ocorrência");
            }
    
            // Clear all LocalStorage Metadata referent to this Incident
            const localStorageKeys = [
                "IncidentReport", "EmergencyData", "DataNascimento", "hora_chegada_local",
                "hora_saida_local", "hora_chegada_unidade_hospitalar", "hora_saida_unidade_hospitalar",
                "hora_chegada_unidade", "assistido", "morto", "grave", "leve"
            ];
            localStorageKeys.forEach(key => localStorage.removeItem(key));
            */
    
        } catch (error) {
            console.error("Erro no processo de finalização:", error);
            setError(error.message || "Ocorreu um erro ao finalizar a ocorrência");
        }
    }

    //OPEN GOOGLE MAPS
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
            const address = `${emergencies[0].requestList[0].morada}, ${emergencies[0].requestList[0].numero_morada}, ${emergencies[0].requestList[0].localidade_morada}`
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
                            disponivelTime={disponivelTime}
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
                            chegadaUnidadeHospTime={chegadaUnidadeHospTime}
                            handleFinalizarOcorrencia={handleFinalizarOcorrencia}
                            emergencies={emergencies}
                        />
                    ))
                )}
            </div>

            {
                isUploading && (
                    <Box
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay
                            zIndex: 1300, // Ensure it's above other elements
                        }}
                    >
                        <Card
                            sx={{
                                padding: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "white",
                                borderRadius: "16px",
                                boxShadow: 5,
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    display: "inline-flex",
                                    width: "150px",
                                    height: "150px",
                                }}
                            >
                                <CircularProgress
                                    variant="determinate"
                                    value={uploadProgress}
                                    size={150}
                                    thickness={5}
                                />
                                <Box
                                    sx={{
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        position: "absolute",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography variant="h6" component="div" color="text.secondary">
                                        {`${uploadProgress}%`}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="body1" sx={{ marginTop: 2 }}>
                                A enviar para Google Drive, por favor aguarde...
                            </Typography>
                        </Card>
                    </Box>
                )
            }

        </div>
    );
};

//CSS
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