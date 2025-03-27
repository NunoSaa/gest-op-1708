import { Grid, Card, CircularProgress, Typography, Box, Chip } from "@mui/material";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Login.css';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDwPtarKsroUHdTRU1mWDXSHHCXElmTJgk';

const EmergencyCard = ({ data }) => {

    // Split the date and time
    const [date, time] = data.dataHoraAlerta.split(' ');
    const filteredItems = data.timeTapeList
        .filter(item => item.tipo === 'posit') // Filter by 'posit'
        .slice(-3); // Take the last 3 items

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 2,
                    boxShadow: 7,
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
                                    : data.requestList[0].tipo_pedido === "acidente"
                                        ? "orange" // Orange background for "acidente"
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
                        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Date in gray */}
                            <Typography sx={{ color: 'gray', mr: 1, fontSize: '1.2rem' }}>
                                {date}
                            </Typography>

                            {/* Time in bold */}
                            <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                {time}
                            </Typography>
                        </Typography>
                    </Box>
                </Box>

                {/* Location and Description */}
                <Typography variant="h6" sx={{ marginBottom: 1 }}>
                    <Box component="span" sx={{ fontWeight: "bold" }}>
                        {data.requestList && data.requestList.length > 0
                            ? `${data.requestList[0].morada} nº ${data.requestList[0].numero_morada}, ${data.requestList[0].localidade_morada}`
                            : `${data.morada}, ${data.localidadeMorada || data.localidade}`}
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
                                : `${data.morada}, ${data.localidadeMorada || data.localidade}`
                        )}
                        &zoom=15
                        &size=800x800
                        &maptype=satellite&format=jpg
                        &markers=color:red|${encodeURIComponent(
                            data.requestList && data.requestList.length > 0
                                ? `${data.requestList[0].morada} nº ${data.requestList[0].numero_morada}, ${data.requestList[0].localidade_morada}`
                                : `${data.morada}, ${data.localidadeMorada || data.localidade}`
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
                        backgroundColor: "#f44336",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                    }}
                >
                    POSIT
                </Typography>

                <Box sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 2, marginTop: "10px" }}>
                    {filteredItems.map((item, index) => (
                        <Box
                            key={item.id}
                            sx={{
                                padding: 1,
                                backgroundColor: index % 2 === 0 ? "grey.100" : "grey.300", // Alternate colors
                            }}
                        >
                            {/* Time on the left */}
                            <Typography variant="caption" sx={{ fontWeight: "bold", width: "80px", textAlign: "left", marginRight: "10px" }}>
                                {time}
                            </Typography>

                            {/* Description */}
                            <Typography variant="caption" sx={{ fontWeight: 500, flex: 1 }}>
                                {item.descricao}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Card>
        </Grid>
    );
};

const OcorrenciasDashboad = () => {

    const [emergencies, setEmergencies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch data with retry mechanism
    const fetchData = async (retryCount = 5) => {
        try {
            const response = await axios.get('https://preventech-proxy-service.onrender.com/api/emergency/getIncidentsWithDetails');
            const fetchedEmergencies = response.data;

            console.log("Fetched emergencies: ", fetchedEmergencies); // Log fetched data
            setEmergencies(fetchedEmergencies); // Set the emergencies data
            setLoading(false); // Data loaded, set loading to false
        } catch (error) {
            console.error('Error fetching data:', error);

            if (retryCount > 0) {
                console.log(`Retrying... Attempts left: ${retryCount}`);
                setTimeout(() => fetchData(retryCount - 1), 5000); // Retry after 5 seconds
            } else {
                console.log("Max retry attempts reached.");
                setLoading(false); // Stop loading after max retries
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            window.location.reload();
        }, 180000); // Refresh every 3 minutes (180000 milliseconds)

        // Initial fetch
        fetchData();

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, []);

    return (
        <Box sx={{ padding: 2 }}>
            {loading ? (
                // Show loading spinner while data is being fetched
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
                    <CircularProgress />
                    <Typography sx={{ marginTop: 2, color: 'gray' }}>
                        A carregar...
                    </Typography>
                </Box>
            ) : emergencies.length === 0 ? (
                // If no emergencies are found after loading
                <Typography
                    variant="h4"
                    sx={{ textAlign: "center", color: "gray", marginTop: 6 }}
                >
                    Não foram encontradas ocorrências.
                </Typography>
            ) : (
                // Render emergency cards once data is loaded
                <Grid container spacing={2}>
                    {emergencies.slice(0, 6).map((emergency) => (
                        <EmergencyCard key={emergency.id} data={emergency} />
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default OcorrenciasDashboad;