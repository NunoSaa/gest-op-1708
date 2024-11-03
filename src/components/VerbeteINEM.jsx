import React, { useState, useEffect, useContext, createContext } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { useNavigate, useLocation } from "react-router-dom";
import pdfFile from '../assets/TEMPLATE_INEM.pdf';
import '../css/Login.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../css/EmergencyForm.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LegendaComponent from '../components/VerbeteINEMComponents/LegendaComponent';
import RCPComponent from './VerbeteINEMComponents/RCPComponent';
import VentilacaoComponent from './VerbeteINEMComponents/VentilacaoComponent';
import CirculacaoComponent from './VerbeteINEMComponents/CirculacaoComponent';
import ProtocolosComponent from './VerbeteINEMComponents/ProtocolosComponent';
import { Box, Grid, Checkbox, FormControlLabel } from '@mui/material';
import EscalasComponent from './VerbeteINEMComponents/EscalasComponent';
import HistorialClinicoComponent from './VerbeteINEMComponents/HistorialClinicoComponent.jsx';
import SinaisSintomasComponent from './VerbeteINEMComponents/SinaisSintomasComponent.jsx';
import OcorrenciaComponent from './VerbeteINEMComponents/OcorrenciaComponent.jsx';
import IdentificacaoComponent from './VerbeteINEMComponents/IdentificacaoComponent.jsx';
import AvaliacaoComponent from './VerbeteINEMComponents/AvaliacaoComponent.jsx';
import DownloadIcon from '@mui/icons-material/Download'; // Download icon for saving
import UploadIcon from '@mui/icons-material/Upload';

function VerbeteINEM() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [item, setItem] = useState(state);

    console.log(item);
    const [selectedLabelLocalOcorrencia, setSelectedLabelLocalOcorrencia] = useState('Domícilio'); // Default to the label of the first option

    // State to hold form data
    const [formData, updateFormData] = useState({
        //ocorrencia
        local: '',
        freguesia: '',
        hora_local: '',
        hora_vitima: '',
        hora_caminho: '',
        hora_hospital: '',
        hora_disponivel: '',

        //identificacao
        nome: '',
        nr_sns: '',
        residencia: '',
        dia_1: '',
        mes_1: '',
        ano_1: '',
        idade: '',
        sexo: '',


    });

    // Function to get form field names from the PDF template
    const getFormFieldNames = async (templateUrl) => {
        try {
            const existingPdfBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const form = pdfDoc.getForm();
            const fields = form.getFields();
            const fieldNames = fields.map(field => field.getName());
            console.log('Form Field Names:', fieldNames);
            return fieldNames;
        } catch (error) {
            console.error('Error fetching or parsing the PDF template:', error);
        }
    };

    // Function to fill the PDF template with data
    const fillPdfTemplate = async (templateUrl, data) => {
        try {
            const existingPdfBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const form = pdfDoc.getForm();

            console.log(data)

            // Fill the fields with data from the form
            Object.keys(data).forEach(key => {
                console.log("data:", data);
                console.log("key:", key);

                const field = form.getField(key);
                if (field) {
                    field.setText(data[key]); // Set the value of the field
                }
            });

            const pdfBytes = await pdfDoc.save();

            let fileName = 'VerbeteINEM_' + item.numero + '.pdf';
            saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), fileName);
        } catch (error) {
            console.error('Error filling the PDF template:', error);
        }
    };

    // Load data from localStorage when the component mounts
    useEffect(() => {
        const descricao = localStorage.getItem('username');
        const emergency = JSON.parse(localStorage.getItem('EmergencyData')) || {}; // Safely parse in case it's null

        // Extract and filter viaturas by descricao
        const vehicles = emergency[0].viaturas || [];
        const filteredVehicles = vehicles.filter(
            (vehicle) => vehicle.descricao === descricao
        );
        // Update formData with emergency data for local and freguesia
        updateFormData(prevFormData => ({
            ...prevFormData,
            freguesia: emergency[0].localidade || '',
            hora_local: filteredVehicles[0].hora_saida || '',
            hora_vitima: filteredVehicles[0].hora_chegada_to || '',
            hora_caminho: filteredVehicles[0].hora_saida_to || '',
            hora_hospital:  '',
            hora_disponivel: filteredVehicles[0].hora_chegada || '',
        }));

        console.log(filteredVehicles)

    }, [item]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target || e; // Account for the event structure
        const isNascimento = name === 'nascimento';
        const isSexoM = name === 'sexoM';
        const isSexoF = name === 'sexoF';

        // Skip updating formData for 'nascimento', 'sexoM', and 'sexoF'
        if (isNascimento || isSexoM || isSexoF) {
            updateFormData(prevFormData => {
                let updatedData = { ...prevFormData };

                // If handling "sexoM" or "sexoF", set "sexo" based on checkbox states
                if (isSexoM || isSexoF) {
                    updatedData.sexo = checked ? (isSexoM ? 'M' : 'F') : ''; // Set "M" or "F" based on checked box
                }

                // If handling "nascimento", calculate and update "idade" and date parts without storing "nascimento"
                if (isNascimento && value) {
                    const formattedDate = value.toISOString().split('T')[0];
                    const [year, month, day] = formattedDate.split('-');
                    const birthDate = new Date(year, month - 1, day);

                    updatedData.dia_1 = day;
                    updatedData.mes_1 = month;
                    updatedData.ano_1 = year;
                    updatedData.idade = calculateAge(birthDate).toString(); // Convert age to string
                }

                return updatedData;
            });
        } else {
            // Update other fields as normal
            updateFormData(prevFormData => ({
                ...prevFormData,
                [name]: type === 'checkbox' ? checked : value
            }));
        }


    };

    // Helper function to calculate age based on a birthdate
    const calculateAge = (birthDate) => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // Adjust age if birthdate hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    };

    const handleDropdownLocalOcorrenciaChange = (event) => {
        const value = event.target.value; // Use the value directly
        setSelectedLabelLocalOcorrencia(value); // Update the state
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        console.log("formData before submission:", formData); // Log formData to check its state
        const templateUrl = pdfFile; // Path to your PDF template
        fillPdfTemplate(templateUrl, formData); // Pass entire formData object
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
                <form onSubmit={handleSubmit}>

                    {/* Ocorrência */}
                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        <div style={{
                            width: '25px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            writingMode: 'vertical-lr',
                            textAlign: 'center',
                            backgroundColor: '#99CCFF',
                            padding: '10px',
                            fontWeight: 'bold',
                            flexShrink: 0,
                            marginBottom: "25px",
                            transform: 'rotate(180deg)'
                        }}>
                            Ocorrência
                        </div>

                        <OcorrenciaComponent formData={formData} handleChange={handleChange} />
                    </div>




                    {/* Identificação */}
                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        <div style={{
                            width: '25px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            writingMode: 'vertical-lr',
                            textAlign: 'center',
                            backgroundColor: '#99CCFF',
                            padding: '10px',
                            fontWeight: 'bold',
                            flexShrink: 0,
                            marginBottom: "25px",
                            transform: 'rotate(180deg)'
                        }}>
                            Identificação
                        </div>

                        <IdentificacaoComponent formData={formData} handleChange={handleChange} />

                    </div>

                    {/* Avaliação */}
                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        <div style={{
                            width: '25px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            writingMode: 'vertical-lr',
                            textAlign: 'center',
                            backgroundColor: '#99CCFF',
                            padding: '10px',
                            fontWeight: 'bold',
                            flexShrink: 0,
                            marginBottom: "25px",
                            transform: 'rotate(180deg)'
                        }}>
                            Avaliação
                        </div>

                        <AvaliacaoComponent />
                    </div>

                    {/* Historial Clinico */}
                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        <div style={{
                            width: '25px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            writingMode: 'vertical-lr',
                            textAlign: 'center',
                            backgroundColor: '#99CCFF',
                            padding: '10px',
                            fontWeight: 'bold',
                            flexShrink: 0,
                            marginBottom: "25px",
                            transform: 'rotate(180deg)'
                        }}>
                            Historial Clinico
                        </div>
                        <div className="event-form" style={{ flexGrow: 1 }}>

                            {/* Historial Clinico */}
                            <HistorialClinicoComponent />

                        </div>
                    </div>

                    {/* Exame da Vítima, Procedimentos e Terapêutica */}
                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        <div style={{
                            width: '25px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            writingMode: 'vertical-lr',
                            textAlign: 'center',
                            backgroundColor: '#99CCFF',
                            padding: '10px',
                            fontWeight: 'bold',
                            flexShrink: 0,
                            marginBottom: "25px",
                            transform: 'rotate(180deg)'
                        }}>
                            Exame da Vítima, Procedimentos e Terapêutica
                        </div>
                        <div className="event-form" style={{ flexGrow: 1 }}>

                            {/* Sinais e Sintomas */}
                            <SinaisSintomasComponent />

                            {/* RCP */}
                            <RCPComponent />

                            {/* VA / Ventilação */}
                            <VentilacaoComponent />

                            {/* Circulação */}
                            <CirculacaoComponent />

                            {/* Protocolos */}
                            <ProtocolosComponent />

                            {/* Escalas */}
                            <EscalasComponent />

                        </div>
                    </div>


                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        {/* Vertical Column with "Ocorrência" */}
                        <div style={{
                            width: '25px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            writingMode: 'vertical-lr',
                            textAlign: 'center',
                            backgroundColor: '#99CCFF',  // Optional background for visual separation
                            padding: '10px',
                            fontWeight: 'bold',
                            flexShrink: 0,    // Prevents the column from shrinking,
                            marginBottom: "25px",
                            transform: 'rotate(180deg)'
                        }}>
                            Observações
                        </div>
                        <div className="event-form" style={{ flexGrow: 1 }}>

                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>Observações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={styles.td}>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={5}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>Não Transporte</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={styles.td}>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={1}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>Transporte</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={styles.td}>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={1}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>

                    {/* Add other input fields as needed 
                    <Button type="submit" variant="contained" color="primary">
                        Guardar No Dispositivo
                    </Button>
                    */}

                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={5}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ height: 60 }}
                                    onClick={handleSubmit}>
                                    Guardar no dispositivo
                                    <DownloadIcon sx={{ marginRight: 1 }} /> {/* Download icon */}
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    sx={{ height: 60 }}>
                                    Enviar para Gescorp
                                    <UploadIcon sx={{ marginRight: 1 }} /> {/* Upload icon */}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </form>
            </div>

            <div style={{ display: 'flex', alignItems: 'stretch' }}>
                {/* Legenda */}
                <LegendaComponent />
            </div>

        </div >
    );
}

const styles = {
    container: {
        marginLeft: 15,
        marginRight: 15,
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 15,
        paddingRight: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    rowInfo: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-between',
        width: '100%',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', // Ensure the label and input are vertically aligned
        flex: 1, // Let it grow to fill available space (you can adjust the flex value for custom widths)
        gap: '10px', // Optional gap between label and input
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginRight: 15,
    },
    infoProp: {
        fontSize: 18,
        paddingBottom: 10,
        textAlign: "left",
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 5,
        marginBottom: 15
    },
    rowButton: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 25,
    },
    button_SAVE: {
        width: "100%",
        height: 75,
        backgroundColor: '#99FF99',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        backgroundColor: '#0065ad', // Blue color for headers
        color: 'white',
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
        fontSize: '12px',
    },
    td: {
        //backgroundColor: '#e6f0ff', // Light background for cells
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
        fontSize: '12px',
    },
    tdBlank: {
        backgroundColor: '#f7faff', // Slightly lighter background for blank cells
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
        fontSize: '12px',
    },
    formContainer: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    formSection: {
        marginBottom: '20px',
    },
    sectionTitle: {
        marginBottom: '10px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: '16px',
    },
    checkboxSection: {
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
    },
    checkboxInput: {
        marginRight: '10px',
    },
    bodyDiagramContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #ccc',
        height: '250px',
        marginTop: '10px',
    },
    formField: {
        marginBottom: '10px',
    },
    medicationSection: {
        marginTop: '20px',
    },
    medicationFields: {
        display: 'flex',
        gap: '15px',
        marginTop: '10px',
    },
    tableContainer: {
        border: '1px solid #ccc',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        marginTop: '20px',
    },
    '@media (max-width: 768px)': {
        medicationFields: {
            flexDirection: 'column',
        },
    },
};

export default VerbeteINEM;
