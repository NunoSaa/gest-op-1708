import '../css/Login.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function RelatorioFinal() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(state);
    const [selectedValue, setSelectedValue] = useState(state);
    const [selectedValue1, setSelectedValue1] = useState(state);
    const [selectedValue2, setSelectedValue2] = useState(state);
    const [selectedValue3, setSelectedValue3] = useState(state);
    const [selectedValue4, setSelectedValue4] = useState(state);
    const [reportData, setReportData] = useState({
        id: '',
        id_relatorio: '',
        descricao: '',
        trabalhoDesenvolvido: '',
        danos_causados: '',
        desalojados_num: '',
        desalojados_descricao: '',
        csrepc: '',
        vitimas_bombeiros_assistidas: '',
        vitimas_bombeiros_feridos: '',
        vitimas_bombeiros_graves: '',
        vitimas_bombeiros_mortos: '',
        vitimas_civis_assistidas: '',
        vitimas_civis_feridos: '',
        vitimas_civis_graves: '',
        vitimas_civis_mortos: '',
        vitimas_apc_assistidas: '',
        vitimas_apc_feridos: '',
        vitimas_apc_graves: '',
        vitimas_apc_mortos: '',
        aa_outra1: '',
        aa_outra2: '',
        aa_outra3: '',
        aa_outra4: '',
        aa_outra5: '',
        aa_valor1: '',
        aa_valor2: '',
        aa_valor3: '',
        aa_valor4: '',
        aa_valor5: ''
    });

    const [verbeteData, setVerbeteData] = useState(() => {
        // Try to load initial state from localStorage
        const savedData = localStorage.getItem('VerbeteData');
        return savedData ? JSON.parse(savedData) : {}; // Parse JSON or default to an empty object
    });

    useEffect(() => {
            const intervalId = setInterval(() => {
                setVerbeteData(localStorage.getItem('VerbeteData'));
            }, 2000); // Runs every 30 seconds
        
            return () => clearInterval(intervalId); // Cleanup interval on component unmount
        }, []);

    const handleDropdownChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);

        // Decode the value using the typologyMap and update aa_outra1
        const decodedValue = typologyMap[value] || value;

        setReportData((prevState) => ({
            ...prevState,
            aa_outra1: decodedValue  // Set the decoded value to aa_outra1
        }));
    };

    const handleDropdown1Change = (event) => {
        const value = event.target.value;
        setSelectedValue1(value);

        // Decode the value using the typologyMap and update aa_outra1
        const decodedValue = typologyMap[value] || value;

        setReportData((prevState) => ({
            ...prevState,
            aa_outra2: decodedValue  // Set the decoded value to aa_outra1
        }));
    };

    const handleDropdown2Change = (event) => {
        const value = event.target.value;
        setSelectedValue2(value);

        // Decode the value using the typologyMap and update aa_outra1
        const decodedValue = typologyMap[value] || value;

        setReportData((prevState) => ({
            ...prevState,
            aa_outra3: decodedValue  // Set the decoded value to aa_outra1
        }));
    };

    const handleDropdown3Change = (event) => {
        const value = event.target.value;
        setSelectedValue3(value);

        // Decode the value using the typologyMap and update aa_outra1
        const decodedValue = typologyMap[value] || value;

        setReportData((prevState) => ({
            ...prevState,
            aa_outra4: decodedValue  // Set the decoded value to aa_outra1
        }));
    };

    const handleDropdown4Change = (event) => {
        const value = event.target.value;
        setSelectedValue4(value);

        // Decode the value using the typologyMap and update aa_outra1
        const decodedValue = typologyMap[value] || value;

        setReportData((prevState) => ({
            ...prevState,
            aa_outra5: decodedValue  // Set the decoded value to aa_outra1
        }));
    };

    const typologyMap = {
        mato: 'Mato',
        pinhal: 'Pinhal',
        eucalipto: 'Eucalipto',
        carvalho: 'Carvalho',
        agricola: 'Comb. Agricola'
    };

    const fetchIncidentReport = async () => {
        try {
            const response = await axios.get('https://preventech-proxy-service.onrender.com/api/finalreport/getFinalReport?id_ocorrencia=' + item.id);
            if (response.data) {
                console.log('Fetched Report:', response.data);

                // Decode the aa_outra1 to match the dropdown option
                const fetchedTypology = response.data[0].aa_outra1;
                const selectedOption = Object.keys(typologyMap).find(key => typologyMap[key] === fetchedTypology);
                const fetchedTypology1 = response.data[0].aa_outra2;
                const selectedOption1 = Object.keys(typologyMap).find(key => typologyMap[key] === fetchedTypology1);
                const fetchedTypology2 = response.data[0].aa_outra3;
                const selectedOption2 = Object.keys(typologyMap).find(key => typologyMap[key] === fetchedTypology2);
                const fetchedTypology3 = response.data[0].aa_outra4;
                const selectedOption3 = Object.keys(typologyMap).find(key => typologyMap[key] === fetchedTypology3);
                const fetchedTypology4 = response.data[0].aa_outra5;
                const selectedOption4 = Object.keys(typologyMap).find(key => typologyMap[key] === fetchedTypology4);


                // Set fetched data into state
                setReportData({
                    id: response.data[0].id || '',
                    id_relatorio: response.data[0].id_relatorio || '',
                    descricao: 
                        (verbeteData.sinais_sintomas ? verbeteData.sinais_sintomas + ' ' : '') + 
                        (response.data[0].descricao ? response.data[0].descricao : ''),
                    trabalho_desenvolvido: 
                        (verbeteData.observacoes ? verbeteData.observacoes + ' ' : '') + 
                        (response.data[0].trabalho_desenvolvido ? response.data[0].trabalho_desenvolvido : ''),
                    danos_causados: response.data[0].danos_causados || '',
                    desalojados_num: response.data[0].desalojados_num || '',
                    desalojados_descricao: response.data[0].desalojados_descricao || '',
                    csrepc: response.data[0].csrepc || '',
                    vitimas_bombeiros_assistidas: response.data[0].vitimas_bombeiros_assistidas || '',
                    vitimas_bombeiros_feridos: response.data[0].vitimas_bombeiros_feridos || '',
                    vitimas_bombeiros_graves: response.data[0].vitimas_bombeiros_graves || '',
                    vitimas_bombeiros_mortos: response.data[0].vitimas_bombeiros_mortos || '',
                    vitimas_civis_assistidas: response.data[0].vitimas_civis_assistidas || '',
                    vitimas_civis_feridos: response.data[0].vitimas_civis_feridos || '',
                    vitimas_civis_graves: response.data[0].vitimas_civis_graves || '',
                    vitimas_civis_mortos: response.data[0].vitimas_civis_mortos || '',
                    vitimas_apc_assistidas: response.data[0].vitimas_apc_assistidas || '',
                    vitimas_apc_feridos: response.data[0].vitimas_apc_feridos || '',
                    vitimas_apc_graves: response.data[0].vitimas_apc_graves || '',
                    vitimas_apc_mortos: response.data[0].vitimas_apc_mortos || '',
                    aa_outra1: fetchedTypology, // Store decoded value
                    aa_outra2: fetchedTypology1,
                    aa_outra3: fetchedTypology2,
                    aa_outra4: fetchedTypology3,
                    aa_outra5: fetchedTypology4,
                    aa_valor1: response.data[0].aa_valor1 || '',
                    aa_valor2: response.data[0].aa_valor2 || '',
                    aa_valor3: response.data[0].aa_valor3 || '',
                    aa_valor4: response.data[0].aa_valor4 || '',
                    aa_valor5: response.data[0].aa_valor5 || ''
                });

                setSelectedValue(selectedOption);
                setSelectedValue1(selectedOption1);
                setSelectedValue2(selectedOption2);
                setSelectedValue3(selectedOption3);
                setSelectedValue4(selectedOption4);

                setLoading(false);
            } else {
                console.log('No report data');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching report:', error);
            setLoading(false);
        }
    };

    console.log('report data: ', reportData)
    localStorage.setItem('IncidentReport', JSON.stringify(reportData));

    const updateIncidentsReport = async () => {
        try {
            const response = await axios.post('https://preventech-proxy-service.onrender.com/api/finalreport/updateIncidentsReport', {
                id_ocorrencia: item.id,
                ...reportData
            });

            if (response.data && response.data.status === 'success') {
                localStorage.setItem('IncidentReport', JSON.stringify(reportData));
                alert('Dados Guardados com Sucesso');
                setTimeout(() => window.history.back(), 0); // Go back after alert
            }
            else if (response.status === 200) {
                console.log('Report updated successfully');
                alert('Dados Guardados com Sucesso');
                setTimeout(() => window.history.back(), 0); // Go back after alert
            } else {
                // Handle any other cases (like errors in the response)
                console.error('Unexpected response:', response.data);
                setTimeout(() => window.history.back(), 0); // Go back after alert
            }
        } catch (error) {
            console.error('Error updating report:', error);
        }
    };

    useEffect(() => {
        fetchIncidentReport(); // Fetch the report data initially
    }, [item.id]);


    // Handle input change to update the state
    const handleInputChange = (field, value) => {
        setReportData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

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
                        Ocorrência
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={styles.container}>
                {/* Loading spinner */}
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div style={styles.rowInfo}>
                            <div style={styles.Geralontainer}>
                                <div style={styles.desalojadosLabel}>
                                    <span style={styles.infoProp}>Geral: </span>
                                </div>
                            </div>
                        </div>

                        {/* Descrição */}
                        <div style={styles.rowInfo}>
                            <span style={styles.infoProp}>Descrição: </span>
                            <TextField
                                style={styles.input}
                                multiline
                                rows={10}
                                variant="outlined"
                                fullWidth
                                value={reportData.descricao}
                                onChange={(e) => handleInputChange('descricao', e.target.value)}
                            />
                        </div>

                        <div style={styles.rowInfo}>
                            <span style={styles.infoProp}>Trabalho Desenvolvido: </span>
                            <TextField
                                style={styles.input}
                                multiline
                                rows={10}
                                variant="outlined"
                                fullWidth
                                value={reportData.trabalho_desenvolvido}
                                onChange={(e) => handleInputChange('trabalho_desenvolvido', e.target.value)}
                            />
                        </div>

                        <div style={styles.rowInfo}>
                            <div style={styles.Geralontainer}>
                                <div style={styles.desalojadosLabel}>
                                    <span style={styles.infoProp}>Efeitos do Sinistro: </span>
                                </div>
                            </div>
                        </div>

                        <div style={styles.rowInfo}>
                            <span style={styles.infoProp}>Danos Causados: </span>
                            <TextField
                                style={styles.input}
                                multiline
                                rows={10}
                                variant="outlined"
                                fullWidth
                                value={reportData.danos_causados}
                                onChange={(e) => handleInputChange('danos_causados', e.target.value)}
                            />
                        </div>

                        <div style={styles.rowInfo}>
                            <span style={styles.infoProp}>Vítimas: </span>
                            <div style={styles.vitimasContainer}>
                                <div style={styles.headerRow}>
                                    <div style={styles.headerCell}></div>
                                    <div style={styles.headerCell}>Leves</div>
                                    <div style={styles.headerCell}>Graves</div>
                                    <div style={styles.headerCell}>Mortos</div>
                                    <div style={styles.headerCell}>Assistidos</div>
                                </div>
                                <div style={styles.dataRow}>
                                    <div style={styles.labelCell}>Bombeiros</div>
                                    <TextField
                                        style={styles.inputCell}
                                        variant="outlined"
                                        value={reportData.vitimas_bombeiros_feridos}
                                        onChange={(e) => handleInputChange('vitimas_bombeiros_feridos', e.target.value)} />
                                    <TextField
                                        style={styles.inputCell}
                                        variant="outlined"
                                        value={reportData.vitimas_bombeiros_graves}
                                        onChange={(e) => handleInputChange('vitimas_bombeiros_graves', e.target.value)} />
                                    <TextField
                                        style={styles.inputCell}
                                        variant="outlined"
                                        value={reportData.vitimas_bombeiros_mortos}
                                        onChange={(e) => handleInputChange('vitimas_bombeiros_mortos', e.target.value)} />
                                    <TextField
                                        style={styles.inputCell}
                                        variant="outlined"
                                        value={reportData.vitimas_bombeiros_assistidas}
                                        onChange={(e) => handleInputChange('vitimas_bombeiros_assistidas', e.target.value)} />
                                </div>
                                <div style={styles.dataRow}>
                                    <div style={styles.labelCell}>APC</div>
                                    <TextField
                                        style={styles.inputCell}
                                        variant="outlined"
                                        value={reportData.vitimas_apc_feridos}
                                        onChange={(e) => handleInputChange('vitimas_apc_feridos', e.target.value)} />
                                    <TextField
                                        style={styles.inputCell}
                                        variant="outlined"
                                        value={reportData.vitimas_apc_graves}
                                        onChange={(e) => handleInputChange('vitimas_apc_graves', e.target.value)} />
                                    <TextField
                                        style={styles.inputCell}
                                        variant="outlined"
                                        value={reportData.vitimas_apc_mortos}
                                        onChange={(e) => handleInputChange('vitimas_apc_mortos', e.target.value)} />
                                    <TextField
                                        style={styles.inputCell}
                                        variant="outlined"
                                        value={reportData.vitimas_apc_assistidas}
                                        onChange={(e) => handleInputChange('vitimas_apc_assistidas', e.target.value)} />
                                </div>
                                <div style={styles.dataRow}>
                                    <div style={styles.labelCell}>Civis</div>
                                    <TextField
                                        style={styles.inputCell}
                                        variant="outlined"
                                        value={reportData.vitimas_civis_feridos}
                                        onChange={(e) => handleInputChange('vitimas_civis_feridos', e.target.value)} />
                                    <TextField
                                        style={styles.inputCell}
                                        variant="outlined"
                                        value={reportData.vitimas_civis_graves}
                                        onChange={(e) => handleInputChange('vitimas_civis_graves', e.target.value)} />
                                    <TextField
                                        style={styles.inputCell}
                                        variant="outlined"
                                        value={reportData.vitimas_civis_mortos}
                                        onChange={(e) => handleInputChange('vitimas_civis_mortos', e.target.value)} />
                                    <TextField
                                        style={styles.inputCell}
                                        variant="outlined"
                                        value={reportData.vitimas_civis_assistidas}
                                        onChange={(e) => handleInputChange('vitimas_civis_assistidas', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div style={styles.rowInfo}>
                            <span style={styles.infoProp}>Desalojados: </span>
                            <div style={styles.desalojadosContainer}>
                                <div style={styles.desalojadosRow}>
                                    <div style={styles.desalojadosLabel}>Qt.</div>
                                    <TextField
                                        style={styles.desalojadosInputQt}
                                        variant="outlined"
                                        value={reportData.desalojados_num}
                                        onChange={(e) => handleInputChange('desalojados_num', e.target.value)} />
                                    <div style={styles.desalojadosLabel}>Desc.</div>
                                    <TextField
                                        style={styles.desalojadosInputDesc}
                                        variant="outlined"
                                        fullWidth
                                        value={reportData.desalojados_descricao}
                                        onChange={(e) => handleInputChange('desalojados_descricao', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div style={styles.rowInfo}>
                            <span style={styles.infoProp}>Incêndios Rurais: </span>
                            <div style={styles.incendiosRuraisContainer}>
                                <div style={styles.incendiosRuraisRow}>
                                    <div style={styles.incendiosRuraisLabel}>Tipologia: </div>
                                    <FormControl fullWidth style={styles.incendiosRuraisInputQt}>
                                        <InputLabel id="dropdown-label" >Tipologia</InputLabel>
                                        <Select
                                            labelId="dropdown-label"
                                            id="dropdown"
                                            name='tipo'
                                            value={selectedValue}
                                            label="Select an Option"
                                            onChange={handleDropdownChange}>

                                            <MenuItem value={''}>&nbsp;</MenuItem>
                                            <MenuItem value={'mato'}>Mato</MenuItem>
                                            <MenuItem value={'pinhal'}>Pinhal</MenuItem>
                                            <MenuItem value={'eucalipto'}>Eucalipto</MenuItem>
                                            <MenuItem value={'carvalho'}>Carvalho</MenuItem>
                                            <MenuItem value={'agricola'}>Agrícola</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div style={styles.incendiosRuraisLabel}>Área: </div>
                                    <TextField
                                        style={styles.incendiosRuraisInputDesc}
                                        variant="outlined" fullWidth
                                        value={reportData.aa_valor1}
                                        onChange={(e) => handleInputChange('aa_valor1', e.target.value)} />
                                    <div style={{ paddingLeft: "10px" }}>hectares</div>
                                </div>
                                <div style={styles.incendiosRuraisRow}>
                                    <div style={styles.incendiosRuraisLabel}>Tipologia: </div>
                                    <FormControl fullWidth style={styles.incendiosRuraisInputQt}>
                                        <InputLabel id="dropdown-label" >Tipologia</InputLabel>
                                        <Select
                                            labelId="dropdown-label"
                                            id="dropdown"
                                            name='tipo'
                                            value={selectedValue1}
                                            label="Select an Option"
                                            onChange={handleDropdown1Change}>

                                            <MenuItem value={''}>&nbsp;</MenuItem>
                                            <MenuItem value={'mato'}>Mato</MenuItem>
                                            <MenuItem value={'pinhal'}>Pinhal</MenuItem>
                                            <MenuItem value={'eucalipto'}>Eucalipto</MenuItem>
                                            <MenuItem value={'carvalho'}>Carvalho</MenuItem>
                                            <MenuItem value={'agricola'}>Agrícola</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div style={styles.incendiosRuraisLabel}>Área: </div>
                                    <TextField
                                        style={styles.incendiosRuraisInputDesc}
                                        variant="outlined" fullWidth
                                        value={reportData.aa_valor2}
                                        onChange={(e) => handleInputChange('aa_valor2', e.target.value)} />
                                    <div style={{ paddingLeft: "10px" }}>hectares</div>
                                </div>
                                <div style={styles.incendiosRuraisRow}>
                                    <div style={styles.incendiosRuraisLabel}>Tipologia: </div>
                                    <FormControl fullWidth style={styles.incendiosRuraisInputQt}>
                                        <InputLabel id="dropdown-label" >Tipologia</InputLabel>
                                        <Select
                                            labelId="dropdown-label"
                                            id="dropdown"
                                            name='tipo'
                                            value={selectedValue2}
                                            label="Select an Option"
                                            onChange={handleDropdown2Change}>

                                            <MenuItem value={''}>&nbsp;</MenuItem>
                                            <MenuItem value={'mato'}>Mato</MenuItem>
                                            <MenuItem value={'pinhal'}>Pinhal</MenuItem>
                                            <MenuItem value={'eucalipto'}>Eucalipto</MenuItem>
                                            <MenuItem value={'carvalho'}>Carvalho</MenuItem>
                                            <MenuItem value={'agricola'}>Agrícola</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div style={styles.incendiosRuraisLabel}>Área: </div>
                                    <TextField
                                        style={styles.incendiosRuraisInputDesc}
                                        variant="outlined" fullWidth
                                        value={reportData.aa_valor3}
                                        onChange={(e) => handleInputChange('aa_valor3', e.target.value)} />
                                    <div style={{ paddingLeft: "10px" }}>hectares</div>
                                </div>
                                <div style={styles.incendiosRuraisRow}>
                                    <div style={styles.incendiosRuraisLabel}>Tipologia: </div>
                                    <FormControl fullWidth style={styles.incendiosRuraisInputQt}>
                                        <InputLabel id="dropdown-label" >Tipologia</InputLabel>
                                        <Select
                                            labelId="dropdown-label"
                                            id="dropdown"
                                            name='tipo'
                                            value={selectedValue3}
                                            label="Select an Option"
                                            onChange={handleDropdown3Change}>

                                            <MenuItem value={''}>&nbsp;</MenuItem>
                                            <MenuItem value={'mato'}>Mato</MenuItem>
                                            <MenuItem value={'pinhal'}>Pinhal</MenuItem>
                                            <MenuItem value={'eucalipto'}>Eucalipto</MenuItem>
                                            <MenuItem value={'carvalho'}>Carvalho</MenuItem>
                                            <MenuItem value={'agricola'}>Agrícola</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div style={styles.incendiosRuraisLabel}>Área: </div>
                                    <TextField
                                        style={styles.incendiosRuraisInputDesc}
                                        variant="outlined" fullWidth
                                        value={reportData.aa_valor4}
                                        onChange={(e) => handleInputChange('aa_valor4', e.target.value)} />
                                    <div style={{ paddingLeft: "10px" }}>hectares</div>
                                </div>
                                <div style={styles.incendiosRuraisRow}>
                                    <div style={styles.incendiosRuraisLabel}>Tipologia: </div>
                                    <FormControl fullWidth style={styles.incendiosRuraisInputQt}>
                                        <InputLabel id="dropdown-label" >Tipologia</InputLabel>
                                        <Select
                                            labelId="dropdown-label"
                                            id="dropdown"
                                            name='tipo'
                                            value={selectedValue4}
                                            label="Select an Option"
                                            onChange={handleDropdown4Change}>

                                            <MenuItem value={''}>&nbsp;</MenuItem>
                                            <MenuItem value={'mato'}>Mato</MenuItem>
                                            <MenuItem value={'pinhal'}>Pinhal</MenuItem>
                                            <MenuItem value={'eucalipto'}>Eucalipto</MenuItem>
                                            <MenuItem value={'carvalho'}>Carvalho</MenuItem>
                                            <MenuItem value={'agricola'}>Agrícola</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div style={styles.incendiosRuraisLabel}>Área: </div>
                                    <TextField
                                        style={styles.incendiosRuraisInputDesc}
                                        variant="outlined" fullWidth
                                        value={reportData.aa_valor5}
                                        onChange={(e) => handleInputChange('aa_valor5', e.target.value)} />
                                    <div style={{ paddingLeft: "10px" }}>hectares</div>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div style={styles.rowButton}>
                            <Button
                                type="submit"
                                style={styles.button_SAVE}
                                onClick={updateIncidentsReport}
                            >
                                <p style={styles.buttonText}>Submeter Relatório Final</p>
                            </Button>
                        </div>

                    </>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        marginLeft: 25,
        marginRight: 25,
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 5,
        paddingRight: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    rowInfo: {
        flexDirection: 'column', // Stack items vertically
        marginBottom: 15,
        paddingLeft: 0,
    },
    infoProp: {
        fontSize: 18,
        paddingBottom: 10,
        textAlign: "left",
        fontWeight: "bold",
        marginBottom: 10, // Space between label and input field
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15, // Space between input fields
    },
    divider: {
        marginBottom: 50,
        marginTop: 50
    },
    vitimasContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr repeat(4, 1fr)',
        gap: '10px',
        maxWidth: '100%',
        margin: 'auto',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginTop: 25
    },
    headerRow: {
        display: 'contents',
    },
    headerCell: {
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: '10px',
    },
    dataRow: {
        display: 'contents',
    },
    labelCell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    inputCell: {
        width: '100%',
    },
    desalojadosContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginTop: 25
    },
    desalojadosRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    desalojadosLabel: {
        fontWeight: 'bold',
        marginRight: '10px',
    },
    desalojadosInputQt: {
        width: '60px',
        marginRight: '20px',
    },
    desalojadosInputDesc: {
        flex: 1,
    },
    incendiosRuraisContainer: {
        display: 'flex',
        flexDirection: 'column', // Changed to stack rows vertically
        alignItems: 'flex-start', // Aligning items to start
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginTop: 25
    },
    incendiosRuraisRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10, // Added margin to create space between rows
    },
    incendiosRuraisLabel: {
        fontWeight: 'bold',
        marginRight: '10px',
    },
    incendiosRuraisInputQt: {
        width: "60%",
        marginRight: '20px',
    },
    incendiosRuraisInputDesc: {
        flex: 1,
    },
    button_SAVE: {
        width: "100%",
        height: 75,
        backgroundColor: '#99FF99',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50, // Adjusted for consistent spacing
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    Geralontainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: "#A0A0A0",
        marginTop: 25,
        marginBottom: 25
    },
};

export default RelatorioFinal;
