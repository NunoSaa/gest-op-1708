import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { ClipLoader } from 'react-spinners';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Text from '@mui/material/TextField'
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useNavigate, useLocation } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


function NovoPosit() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [selectedOption, setSelectedOption] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [geolocation, setGeoLocation] = useState({ latitude: null, longitude: null });
    const [geolocationGMS, setGeoLocationGMS] = useState({ latitude: '', longitude: '' });

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
    };

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

        fetchGeolocation();

        const interval = setInterval(() => {
        }, 60000);

        return () => clearInterval(interval);
    }, [state, navigate]);

    return (


        <div style={styles.container}>
            <div>
                <h2>Selecione o Tipo de POSIT:</h2>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">POSIT</InputLabel>
                        <Select
                            value={selectedOption}
                            label="POSIT"
                            onChange={handleOptionChange}>
                            <MenuItem value={"incendioEstrutural"}>Comunicação</MenuItem>
                            <MenuItem value={"incendioFlorestal"}>POSIT</MenuItem>
                            <MenuItem value={"incendioRodoviario"}>Incêndio Rodoviario</MenuItem>
                            <MenuItem value={"acidenteMateriasPerigosas"}>Acidente Matérias Perigosas</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {selectedOption && (
                    <div>
                        {selectedOption === 'incendioEstrutural' && (

                            <div>
                                <h3>Incêndio Estrutural</h3>
                                <a><b>Hora: </b> {currentTime}</a>

                                <Divider style={styles.divider} />
                                <h1>ESTOU: </h1>

                                <div style={styles.rowInfo}>
                                    <span style={styles.infoProp}>Estou em: </span>
                                    <TextField style={styles.input} label="Estou em..." />
                                </div>
                                <div style={styles.rowInfo}>
                                    <p><b>Latitude GMS: </b>{geolocationGMS.latitude}</p>
                                    <p><b>Longitude GMS: </b>{geolocationGMS.longitude}</p>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.infoProp}>Freguesia / Municipio: </span>
                                    <TextField style={styles.input} label="Freguesia / Municipio..." />
                                </div>

                                <Divider style={styles.divider} />
                                <h1>VEJO: </h1>

                                <div style={styles.rowInfo}>
                                    <span style={styles.infoProp}>PONTOS DE SITUAÇÃO: </span>
                                    <div style={styles.rowInfo}>
                                        <div>
                                            <FormControlLabel
                                                label="Curso (Ativo)"
                                                control={
                                                    <Checkbox name="curso" />
                                                }
                                            />
                                        </div>
                                        <div>
                                            <FormControlLabel
                                                label="Resolução (Dominado)"
                                                control={
                                                    <Checkbox name="resolucao" />
                                                }
                                            />
                                        </div>
                                        <div>
                                            <FormControlLabel
                                                label="Conclusao (Rescaldo)"
                                                control={
                                                    <Checkbox name="conclusao" />
                                                }
                                            />
                                        </div><div>
                                            <FormControlLabel
                                                label="Finalizado (Extinto)"
                                                control={
                                                    <Checkbox name="finalizado" />
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div style={styles.rowInfo}>
                                    <span style={styles.infoProp}>Com: </span>
                                    <div style={styles.rowInfo}>
                                        <div>
                                            <FormControlLabel
                                                label="Fogo à vista"
                                                control={
                                                    <Checkbox name="fogo_vista" />
                                                }
                                            />
                                        </div>
                                        <div>
                                            <FormControlLabel
                                                label="Sem fogo à vista"
                                                control={
                                                    <Checkbox name="sem_fogo_vista" />
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div style={styles.center}>
                                    <div style={styles.row}>
                                        <Button style={styles.button_SAVE}>
                                            <p style={styles.buttonText}>Guardar</p>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {selectedOption === 'incendioFlorestal' && (
                            <div>
                                <h3>Incêndio Florestal</h3>
                            </div>
                        )}
                        {selectedOption === 'incendioRodoviario' && (
                            <div>
                                <h3>Incêndio Rodoviario</h3>
                            </div>
                        )}
                        {selectedOption === 'acidenteMateriasPerigosas' && (
                            <div>
                                <h3>Acidente Matérias Perigosas</h3>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

}

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
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25
    },
    content: {
        flex: 1,
        marginLeft: 25,
    },
    item: {
        display: 'flex', // Add this to make the item a flex container
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 20,
        borderColor: '#C0C0C0',
        border: '1px solid #C0C0C0',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 15
    },
    title: {
        fontSize: 24,
        paddingBottom: 5,
    },
    description: {
        fontSize: 18,
        paddingBottom: 5,
    },
    vehicle: {
        marginTop: '5',
        fontSize: 14,
        fontWeight: 'bold'
    },
    rightContainer: {
        flex: 1,
        alignItems: 'right',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    timestamp: {
        marginRight: 25,
        marginLeft: 25,
        color: '#888',
        fontSize: 16
    },
    estado: {
        fontWeight: 'bold',
        fontSize: 16
    },
    image: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
    },
    button_POSIT: {
        width: "100%",
        height: 75,
        backgroundColor: '#FF6666',
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000', // Set the text color to white
        fontSize: 18,
        fontWeight: 'bold',
    },
    dropdown: {
        width: "85%",
        height: 75,
        fontSize: 16,
        padding: 5,
    },
    divider: {
        flex: 1,
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25
    },
    input: {
        height: 50,
        width: "95%",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 15,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    rowInfo: {
        flexDirection: 'row',
        marginBottom: 25,
        paddingLeft: 25
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
    buttonText: {
        color: '#000000', // Set the text color to white
        fontSize: 16,
        fontWeight: 'bold',
    },
};

export default NovoPosit