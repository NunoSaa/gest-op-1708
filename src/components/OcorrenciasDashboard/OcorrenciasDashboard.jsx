import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Login.css';
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMediaQuery } from '@mui/material'; // Import to handle responsiveness
import { Button, Chip, Stack, Checkbox } from '@mui/material';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDwPtarKsroUHdTRU1mWDXSHHCXElmTJgk';

const EmergencyCard = ({ data }) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 2,
                    boxShadow: 3,
                    position: "relative",
                }}
            >

                {/* Top Bar */}
                <Box
                    sx={{
                        backgroundColor: data.requestList && data.requestList.length > 0
                            ? data.requestList[0].tipo_pedido === "emergenciaph"
                                ? "primary.main" // Background color for "emergenciaph"
                                : data.requestList[0].tipo_pedido === "incendio"
                                ? "red" // Red background for "incendio"
                                : "grey" // Default grey if tipo_pedido is not matched
                            : "grey", // Grey background if requestList does not exist
                        color: "white",
                        padding: "8px",
                        textAlign: "center",
                        fontWeight: "bold",
                        marginBottom: "15px"
                    }}
                >
                    {data.descClassificacao}
                </Box>

                {/* Top Section */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", gap: 1 }}>
                        <Chip
                            label={data.estado}
                            style={{
                                fontSize: 16,
                                color: "black",
                                backgroundColor: data.corEstado,
                            }}
                        />
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
                        >
                            {data.dataHoraAlerta}
                        </Typography>
                    </Box>
                </Box>

                {/* Location and Description */}
                <Typography variant="h6" sx={{ marginBottom: 1 }}>
                    <Box component="span" sx={{ fontWeight: "bold" }}>
                        {data.requestList && data.requestList.length > 0
                            ? `${data.requestList[0].morada} nº ${data.requestList[0].numero_morada}, ${data.requestList[0].localidade_morada}`
                            : `${data.morada}, ${data.localidadeMorada}`}
                    </Box>
                </Typography>

                {/* Map Section */}
                <Box
                    sx={{
                        border: "1px solid gray",
                        borderRadius: "8px",
                        overflow: "hidden",
                        marginBottom: 2,
                    }}
                >
                    <img
                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
                            data.requestList && data.requestList.length > 0
                                ? `${data.requestList[0].morada} nº ${data.requestList[0].numero_morada}, ${data.requestList[0].localidade_morada}`
                                : `${data.morada}, ${data.localidadeMorada}`
                        )}
                        &zoom=16
                        &size=400x400
                        &maptype=satellite
                        &markers=color:red|${encodeURIComponent(
                            data.requestList && data.requestList.length > 0
                                ? `${data.requestList[0].morada} nº ${data.requestList[0].numero_morada}, ${data.requestList[0].localidade_morada}`
                                : `${data.morada}, ${data.localidadeMorada}`
                        )}
                        &key=${GOOGLE_MAPS_API_KEY}`}
                        alt="Location map"
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                </Box>

                {/* Vehicles Section */}
                {/* List of Vehicles (IDs) */}
                <Box sx={{ marginBottom: 2 }}>
                    {data.viaturas && data.viaturas.length > 0 ? (
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            {data.viaturas[0].join(", ")}
                        </Typography>
                    ) : (
                        <Typography variant="body2" sx={{ color: "gray" }}>
                            No vehicles available.
                        </Typography>
                    )}
                </Box>

                {/* Footer Section */}
                <Typography
                    variant="button"
                    sx={{
                        display: "inline-block",
                        backgroundColor: "red",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                    }}
                >
                    POSIT
                </Typography>
                <Typography variant="caption" sx={{ display: "block", marginTop: 1 }}>
                    {data.timeTapeList[1]?.descricao || ""}
                </Typography>
            </Card>
        </Grid>
    );
};

const OcorrenciasDashboad = () => {

    const [emergencies, setEmergencies] = useState([]);
    let navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const username = localStorage.username;

    // Use media queries to detect screen size
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const interval = setInterval(() => {
            window.location.reload();
        }, 60000); // Refresh every minute (60000 milliseconds)

        const fetchData = async () => {
            try {
                const response = await axios.get('https://preventech-proxy-service.onrender.com/api/emergency/getIncidentsWithDetails');
                let fetchedEmergencies = response.data;

                console.log("Fetched emergencies: ", fetchedEmergencies); // Log fetched data
                setEmergencies(fetchedEmergencies); // Set the emergencies data
                setLoading(false); // Data loaded, set loading to false
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => clearInterval(interval); // Cleanup the interval on unmount

    }, [username]);

    const emergencyData = [
        {
            time: "11:33",
            status: "ACIDENTE",
            tags: [
                { label: "VECIO2", color: "red" },
                { label: "ABSC01", color: "blue" },
                { label: "ABSC02", color: "blue" },
            ],
            location: {
                street: "Rua Dr. Antonio Gil",
                city: "Vila Pouca de Aguiar",
            },
            description: "Colisão dois Veiculos Ligeiros, 1 ferido",
            mapImage: "https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg",
            coordinates: "41.01.0215N, 007.45.2555W",
            details: "Colisão entre dois veículos ligeiros",
        },
        {
            time: "12:45",
            status: "INCÊNDIO",
            tags: [
                { label: "BOM01", color: "orange" },
                { label: "EQU03", color: "green" },
            ],
            location: {
                street: "Rua do Mercado",
                city: "Vila Real",
            },
            description: "Fogo em área comercial",
            mapImage: "https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg",
            coordinates: "41.29.0321N, 007.44.1234W",
            details: "Incêndio controlado, sem vítimas.",
        },
        {
            time: "13:20",
            status: "DESASTRE",
            tags: [
                { label: "EQU05", color: "purple" },
                { label: "MED01", color: "yellow" },
            ],
            location: {
                street: "Avenida Central",
                city: "Braga",
            },
            description: "Desabamento de estrutura, vítimas no local",
            mapImage: "https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg",
            coordinates: "41.55.0456N, 008.25.7890W",
            details: "Equipes de resgate em ação.",
        },
        {
            time: "09:15",
            status: "ACIDENTE",
            tags: [
                { label: "VEC03", color: "red" },
            ],
            location: {
                street: "Rua das Flores",
                city: "Lisboa",
            },
            description: "Colisão entre bicicleta e carro",
            mapImage: "https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg",
            coordinates: "38.71.0145N, 009.13.2555W",
            details: "Sem ferimentos graves relatados.",
        },
        {
            time: "17:00",
            status: "ALAGAMENTO",
            tags: [
                { label: "PROT01", color: "blue" },
            ],
            location: {
                street: "Rua das Águas",
                city: "Porto",
            },
            description: "Inundação em área residencial",
            mapImage: "https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg",
            coordinates: "41.08.5567N, 008.36.4545W",
            details: "Área isolada, evacuação em andamento.",
        },
        {
            time: "15:40",
            status: "ASSALTO",
            tags: [
                { label: "POL01", color: "black" },
            ],
            location: {
                street: "Praça dos Heróis",
                city: "Coimbra",
            },
            description: "Assalto à mão armada em banco",
            mapImage: "https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg",
            coordinates: "40.20.3544N, 008.25.5678W",
            details: "Suspeitos fugiram, polícia no local.",
        },
    ];

    return (
        <Box sx={{ padding: 2 }}>
            {emergencies.length === 0 ? (
                <Typography
                    variant="h4"
                    sx={{ textAlign: "center", color: "gray", marginTop: 6 }}
                >
                    Não foram encontradas ocorrências.
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {emergencies.slice(0, 6).map((emergency, index) => (
                        <EmergencyCard key={index} data={emergency} />
                    ))}
                </Grid>
            )}
        </Box>
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
        marginLeft: 25,
        marginRight: 25,
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        marginLeft: 25,
    },
    item: {
        display: 'flex', // Flexbox layout
        alignItems: 'center', // Center vertically
        backgroundColor: '#E0E0E0',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 20,
        borderColor: '#C0C0C0',
        border: '1px solid #C0C0C0',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 15,
        flexDirection: 'row', // Default for desktop, adjusted for mobile in renderItem
        transition: '0.3s ease', // Smooth transition for better UX
    },
    title: {
        fontSize: '1.5em', // Use responsive units for fonts
        paddingBottom: 5,
    },
    description: {
        fontSize: '1.2em',
        paddingBottom: 5,
    },
    vehicle: {
        marginTop: 5,
        fontSize: '1em',
        fontWeight: 'bold'
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center vertically
        alignItems: 'flex-end', // Align to the right
        textAlign: 'right',
        paddingRight: 25 // Add padding to the right
    },
    timestamp: {
        color: '#888',
        fontSize: '1em',
        marginTop: 10 // Add some spacing between estado and timestamp
    },
    estado: {
        fontWeight: 'bold',
        fontSize: '1.2em',
    },
    image: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
    },
    // Media query for mobile responsiveness
    '@media (max-width: 600px)': {
        container: {
            marginLeft: 10,
            marginRight: 10,
        },
        item: {
            flexDirection: 'column', // Stack elements for mobile
            padding: 10,
            marginHorizontal: 10,
        },
        title: {
            fontSize: '1.2em',
        },
        description: {
            fontSize: '1em',
        },
        vehicle: {
            fontSize: '0.9em',
        },
        timestamp: {
            fontSize: '0.8em',
        },
        estado: {
            fontSize: '1em',
        }
    }
};

export default OcorrenciasDashboad;