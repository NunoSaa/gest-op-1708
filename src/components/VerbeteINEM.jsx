import React, { useState, useEffect, useContext, createContext } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { useNavigate, useLocation } from "react-router-dom";
import pdfFile from '../assets/Verbete-INEM.pdf';
import '../css/Login.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../css/EmergencyForm.css';
import '../css/VerbeteINEM.css'
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
import { Box, CircularProgress, Card, Grid, Checkbox, FormControlLabel } from '@mui/material';
import EscalasComponent from './VerbeteINEMComponents/EscalasComponent';
import HistorialClinicoComponent from './VerbeteINEMComponents/HistorialClinicoComponent.jsx';
import SinaisSintomasComponent from './VerbeteINEMComponents/SinaisSintomasComponent.jsx';
import OcorrenciaComponent from './VerbeteINEMComponents/OcorrenciaComponent.jsx';
import IdentificacaoComponent from './VerbeteINEMComponents/IdentificacaoComponent.jsx';
import AvaliacaoComponent from './VerbeteINEMComponents/AvaliacaoComponent.jsx';
import DownloadIcon from '@mui/icons-material/Download'; // Download icon for saving
import UploadIcon from '@mui/icons-material/Upload';
import { gapi } from 'gapi-script';
import Utils from '../utils/utils.js';
import FarmacologiaComponent from './VerbeteINEMComponents/FarmacologiaComponent.jsx';
import NaoTransporteComponent from './VerbeteINEMComponents/NaoTransporteComponent.jsx';
import TransporteComponent from './VerbeteINEMComponents/TransporteComponent.jsx';
import ObservacoesComponent from './VerbeteINEMComponents/ObservacoesComponent.jsx';


function VerbeteINEM() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [item, setItem] = useState(state);
    const [pdfBlob, setPdfBlob] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0); // Upload progress
    const [isUploading, setIsUploading] = useState(false); // Uploading state
    const num_ocorrencia = item.numero;
    const CLIENT_ID = '214123389323-3c7npk6e2hasbi2jt3pnrg1jqvjtm92m.apps.googleusercontent.com';  // Replace with your OAuth Client ID
    const API_KEY = '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';  // Replace with your Google Cloud API Key
    const SCOPES = 'https://www.googleapis.com/auth/drive.file'; // Scope to upload file


    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                scope: SCOPES,
            });
        }
        gapi.load('client:auth2', start);

    }, []);

    const [selectedLabelLocalOcorrencia, setSelectedLabelLocalOcorrencia] = useState('Domícilio'); // Default to the label of the first option
    const now = new Date();
    // Get the current date in the format "YYYY-MM-DD"
    const currentDate = now.toISOString().split('T')[0];
    // Get the current time in the format "HH:MM"
    const currentHour = now.toTimeString().split(' ')[0].substring(0, 5);
    //Buld the FileName
    let fileName = item.numero + '_VERBETE_INEM_' + currentDate + '_' + currentHour + '.pdf';

    let transporte_unidade_destino_tmp = '';
    let [transporte_unidade_origem_tmp, setTransporteUnidadeOrigemTmp] = React.useState('na'); // Default to 'na'

    // State to hold form data
    const [formData, updateFormData] = useState({
        //ocorrencia
        entidade: 'B. V. Vila Pouca de Aguiar',
        motivo: '',
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
        sexoM: '',
        sexoF: '',

        //Avaliacao
        avaliacao_hora: '',
        avaliacao_avds: '',

        //Historial Clinico
        circunstancias: '',
        historico: '',
        alergias: '',
        medicacao_1: '',
        ultima_refeicao: '',
        situacao_risco: '',

        //Sinais e Sintomas
        sinais_sintomas: '',

        //Farmacologia
        farmacologia_hora: '',
        farmacologia_farmaco: '',
        farmacologia_dose: '',
        farmacologia_via: '',
        farmacologia_hora1: '',
        farmacologia_farmaco1: '',
        farmacologia_dose1: '',
        farmacologia_via1: '',
        farmacologia_hora2: '',
        farmacologia_farmaco2: '',
        farmacologia_dose2: '',
        farmacologia_via2: '',
        farmacologia_hora3: '',
        farmacologia_farmaco3: '',
        farmacologia_dose3: '',
        farmacologia_via3: '',
        farmacologia_hora4: '',
        farmacologia_farmaco4: '',
        farmacologia_dose4: '',
        farmacologia_via4: '',

        //Observacoes
        observacoes: '',

        //VA / Ventilacao
        ventilacao_desobstrucao: '',
        ventilacao_orofaringeo: '',
        ventilacao_laringeo: '',
        ventilacao_masc_laringea: '',
        ventilacao_t_endotraqueal: '',
        ventilacao_mecanica: '',
        ventilacao_cpap: '',

        //Circulação
        circulacao_controlo_temp: '',
        circulacao_controlo_hemo: '',
        circulacao_penso: '',
        circulacao_torniquete: '',
        ciculacao_cinto: '',
        ciculacao_acesso: '',

        //Protocolos
        protocolos_imo: '',
        protocolos_avc: '',
        protocolos_coronaria: '',
        protocolos_sepsis: '',
        protocolos_trauma: '',
        protocolos_pcr: '',

        //Escalas
        escalas_cincinatti: '',
        escalas_proacs: '',
        escalas_rts: '',
        escalas_mgap: '',
        escalas_race: '',

        //Não Transporte
        n_transporte_abandonou: '',
        n_transporte_medica: '',
        n_transporte_morte: '',
        n_transporte_desativacao: '',
        recusa_proprio: '',
        recusa_representante: '',
        recusa_avaliacao: '',
        recusa_tratamento: '',

        //Transporte
        transporte_primario: '',
        transporte_secundario: '',
        acompanhamento_medico: '',
        transporte_unidade_origem: '',
        transporte_nr_processo_origem: '',
        transporte_unidade_destino: '',
        transporte_nr_processo_destino: '',
        transporte_responsavel_meio: '',
        transporte_nr_profissional: '',
    });

    // Load data from localStorage when the component mounts
    useEffect(() => {
        const savedData = localStorage.getItem('VerbeteData');
        if (savedData) {
            updateFormData(JSON.parse(savedData)); // Load saved data
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    // Save formData to localStorage every minute
    useEffect(() => {
        const saveInterval = setInterval(() => {
            localStorage.setItem('VerbeteData', JSON.stringify(formData));
        }, 60000); // 60000ms = 1 minute

        return () => clearInterval(saveInterval); // Clear interval on component unmount
    }, [formData]); // Dependency ensures it tracks the latest `formData`

    // Load data from localStorage when the component mounts
    useEffect(() => {
        const descricao = localStorage.getItem('username');
        const emergency = JSON.parse(localStorage.getItem('EmergencyData')) || {}; // Safely parse in case it's null

        // Extract and filter viaturas by descricao
        const vehicles = emergency[0].viaturas || [];
        const filteredVehicles = vehicles.filter(
            (vehicle) => vehicle.descricao === descricao
        );

        // Extract morada and numero_morada and concatenate
        const morada = emergency[0].requestList?.[0]?.morada || '';
        const numero_morada = emergency[0].requestList?.[0]?.numero_morada || '';
        const local = morada + (numero_morada ? ', nº ' + numero_morada : ''); // Concatenate morada and numero_morada

        // Update formData with emergency data for local and freguesia
        updateFormData(prevFormData => ({
            ...prevFormData,
            freguesia: emergency[0].localidade || '',
            local: local,
            nr_evento: emergency[0].requestList[0].numero_codu || '',
            //nr_vitimas: '1',
            hora_local: filteredVehicles[0].hora_saida !== null ? filteredVehicles[0].hora_saida : '',
            hora_vitima: filteredVehicles[0].hora_chegada_to || '',
            hora_caminho: filteredVehicles[0].hora_saida_to || '',
            hora_hospital: '',
            hora_disponivel: filteredVehicles[0].hora_chegada || '',
        }));

        console.log(filteredVehicles)

    }, [item]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target; // Destructure event
        const isNascimento = name === 'nascimento';
        const isSexo = name === 'sexoM' || name === 'sexoF';
        const isTransporteUnidadeOrigem = name === 'transporte_unidade_origem';
        const isTransporteUnidadeDestino = name === 'transporte_unidade_destino';

        const transporteMapping = {
            ch_vila_real: 'C.H. Vila Real',
            ch_chaves: 'C.H. Chaves',
            na: 'N/A',
        };

        updateFormData((prevFormData) => {
            let updatedData = { ...prevFormData, 
                transporte_unidade_origem: transporteMapping[transporte_unidade_origem_tmp] || transporte_unidade_origem_tmp};
            

            if (isNascimento) {
                // Handle 'nascimento' field
                if (value) {
                    const birthDate = new Date(value);
                    if (!isNaN(birthDate)) {
                        updatedData.dia_1 = birthDate.getDate().toString().padStart(2, '0');
                        updatedData.mes_1 = (birthDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
                        updatedData.ano_1 = birthDate.getFullYear().toString();
                        updatedData.idade = Utils.calculateAge(birthDate).toString();
                    }
                }
            } else if (isSexo) {
                // Handle 'sexoM' or 'sexoF'
                updatedData.sexoM = name === 'sexoM' ? (checked ? 'X' : '') : '';
                updatedData.sexoF = name === 'sexoF' ? (checked ? 'X' : '') : '';
            }
            else if (isTransporteUnidadeOrigem) {
                // Update the local state for the raw value
                setTransporteUnidadeOrigemTmp(value); // Raw value
                console.log("Raw value:", value);
            
                // Update the mapped value in formData
                updatedData.transporte_unidade_origem = transporteMapping[value] || value; // Mapped value
                console.log("Mapped value:", updatedData.transporte_unidade_origem);
            }
            else if (isTransporteUnidadeDestino) {
                transporte_unidade_destino_tmp = value; // Raw value
                console.log(transporte_unidade_destino_tmp)
                updatedData.transporte_unidade_destino = transporteMapping[value] || value; // Mapped value
                console.log(updatedData.transporte_unidade_destino)
            }
            else if(name == 'circulacao_controlo_temp'){
                updatedData.circulacao_controlo_temp = name === 'circulacao_controlo_temp' ? (checked ? 'X' : '') : '';
            }
            else {
                // General field update
                updatedData[name] = type === 'checkbox' ? (checked ? 'X' : '') : value;
            }

            return updatedData;
        });
    };

    const saveToDevice = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            console.log("formData before submission:", formData); // Debugging
            if (!pdfFile) {
                throw new Error("PDF template path is missing.");
            }

            const templateUrl = pdfFile; // Path to your PDF template

            // Ensure formData has necessary fields
            if (!formData || Object.keys(formData).length === 0) {
                throw new Error("formData is empty or invalid.");
            }

            // Call the function to generate the filled PDF
            const generatedPdf = await Utils.fillPdfTemplate(templateUrl, formData);

            // Check if the generatedPdf is valid
            if (!generatedPdf) {
                throw new Error("PDF generation failed.");
            }

            // Create a Blob from the generated PDF
            const pdfBlob = new Blob([generatedPdf], { type: "application/pdf" });

            // Create a download link
            const downloadUrl = URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = fileName; // Name for the downloaded file
            document.body.appendChild(link); // Append the link to the body
            link.click(); // Trigger the download
            document.body.removeChild(link); // Clean up the DOM

            console.log("PDF saved successfully.");
            alert("PDF saved successfully.");
        } catch (error) {
            console.error("Error during PDF generation or save:", error);
            alert("An error occurred while saving the PDF. Please try again.");
        }
    };

    const handleBackClick = () => {
        window.history.back(); // Go back to the previous page
    };

    // Upload the filled PDF to Google Drive
    const sendToDrive = async (pdfBytes) => {

        const templateUrl = pdfFile; // Path to your PDF template
        let file = new Blob([pdfBlob], { type: 'application/pdf' });

        // Fill the PDF template with formData and get the filled PDF blob
        file = await Utils.fillPdfTemplate(templateUrl, formData);
        console.log("formData before submission:", formData); // Log formData to check its state

        gapi.auth2.getAuthInstance().signIn().then(async () => {
            const metadata = {
                name: fileName,
                mimeType: 'application/pdf',
            };

            // Step 1: Find or create the 'Ocorrencias' folder in Google Drive shared from centralVPA
            const ocorrenciasFolderId = await Utils.createOrFindFolder('1yE6cG3Kwakq1V0ZcI8liMfqF4tLc2E4h');

            // Step 2: Inside 'Ocorrencias', find or create the 'num_ocorrencia' folder
            const ocorrenciaFolderId = await Utils.createOrFindFolder(num_ocorrencia, '1yE6cG3Kwakq1V0ZcI8liMfqF4tLc2E4h');

            if (!ocorrenciaFolderId) {
                alert('Erro ao criar a estrutura de pastas no Google Drive');
                return;
            }

            console.log(ocorrenciaFolderId);

            if (!ocorrenciaFolderId) {
                alert('Error creating the folder structure in Google Drive.');
                return;
            }

            const form = new FormData();
            metadata.parents = [ocorrenciaFolderId];
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', new Blob([file], { type: 'application/pdf' }));

            const xhr = new XMLHttpRequest();
            setIsUploading(true);
            xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', true);
            xhr.setRequestHeader('Authorization', `Bearer ${gapi.auth.getToken().access_token}`);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress(percentComplete);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    alert('Ficheiro enviado com sucesso para o Google Drive!');
                    localStorage.removeItem("VerbeteData");
                    setIsUploading(false); // Stop spinner
                    setUploadProgress(0); // Reset progress
                } else {
                    console.error('Erro no upload do ficheiro para o Google Drive: ', xhr.responseText);
                    setIsUploading(false); // Stop spinner
                }
            };

            xhr.onerror = () => {
                console.error('Erro no upload do ficheiro para o Google Drive.');
                setIsUploading(false); // Stop spinner
            };

            xhr.send(form); // Send the form data
        });
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

            <div className="container">
                <form onSubmit={saveToDevice}>

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

                        <AvaliacaoComponent formData={formData} handleChange={handleChange}/>
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
                            <HistorialClinicoComponent formData={formData} handleChange={handleChange} />

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
                            Exame da Vítima, Terapêutica e Observações
                        </div>
                        <div className="event-form" style={{ flexGrow: 1 }}>

                            {/* Sinais e Sintomas */}
                            <SinaisSintomasComponent formData={formData} handleChange={handleChange} />

                            {/* Farmacologia */}
                            <FarmacologiaComponent formData={formData} handleChange={handleChange} />

                            <ObservacoesComponent formData={formData} handleChange={handleChange}/>

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
                            Procedimentos
                        </div>
                        <div className="event-form" style={{ flexGrow: 1 }}>

                            {/* RCP */}
                            <RCPComponent />

                            {/* VA / Ventilação */}
                            <VentilacaoComponent formData={formData} handleChange={handleChange} />

                            {/* Circulação */}
                            <CirculacaoComponent formData={formData} handleChange={handleChange} />

                            {/* Protocolos */}
                            <ProtocolosComponent formData={formData} handleChange={handleChange} />

                            {/* Escalas */}
                            <EscalasComponent formData={formData} handleChange={handleChange} />

                            {/* Não Transporte */}
                            <NaoTransporteComponent formData={formData} handleChange={handleChange} />

                            {/* Transporte */}
                            <TransporteComponent formData={formData} handleChange={handleChange} />

                        </div>
                    </div>

                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={5}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ height: 60 }}
                                    onClick={saveToDevice}>
                                    Guardar no dispositivo
                                    <DownloadIcon sx={{ marginRight: 1 }} /> {/* Download icon */}
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    sx={{ height: 60 }}
                                    onClick={sendToDrive}>
                                    Enviar para Gescorp
                                    <UploadIcon sx={{ marginRight: 1 }} /> {/* Upload icon */}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {isUploading && (
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
                    )}


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
};

export default VerbeteINEM;
