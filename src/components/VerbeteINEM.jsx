import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
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
import RaceAssessment from '../components/RaceAssessment';

function VerbeteINEM() {
    const [selectedLabelLocalOcorrencia, setSelectedLabelLocalOcorrencia] = useState('Domícilio'); // Default to the label of the first option

    // State to hold form data
    const [formData, setFormData] = useState({
        entidade: "B. V. Vila Pouca de Aguiar",
        meio: "Reserva",
        hora: "",
        nr_saida_interno: "",
        Text2: ""
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

            // Fill the fields with data from the form
            Object.keys(data).forEach(key => {
                const field = form.getField(key);
                if (field) {
                    field.setText(data[key]);
                }
            });

            const pdfBytes = await pdfDoc.save();
            saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), 'filled_template.pdf');
        } catch (error) {
            console.error('Error filling the PDF template:', error);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDropdownLocalOcorrenciaChange = (event) => {
        const value = event.target.value; // Use the value directly
        setSelectedLabelLocalOcorrencia(value); // Update the state
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const templateUrl = pdfFile; // Path to your PDF template
        const templateData = {
            nome: 'NUno',
            local: 'Vila Pouca de Aguiar',
            Text2: selectedLabelLocalOcorrencia.toString(),
            Text3: 'teste3',
            nr_saida_interno: formData.nr_saida_interno
        };

        // Call the function to fill the PDF template with data
        fillPdfTemplate(templateUrl, templateData);
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
                        Ocorrência
                    </div>

                    {/* Event Form */}
                    <div className="event-form" style={{ flexGrow: 1 }}>
                        <section className="header-section">
                            <div style={styles.rowInfo}>
                                <div style={{ ...styles.inputGroup, flex: 2 }}>
                                    <label>Entidade</label>
                                    <TextField
                                        variant="outlined"
                                        value="B. V. Vila Pouca de Aguiar"
                                        disabled
                                        fullWidth
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={{ paddingLeft: '15px' }}>Meio</label>
                                    <TextField
                                        variant="outlined"
                                        defaultValue="Reserva"
                                        fullWidth
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={{ paddingLeft: '15px' }}>Nº Evento</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div style={styles.rowInfo}>
                                <div style={{ ...styles.inputGroup, flex: 2 }}>  {/* 20% */}
                                    <label>Nº Vítimas</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>

                                <div style={{ ...styles.inputGroup, flex: 8 }}>  {/* 80% */}
                                    <label style={{ paddingLeft: '15px' }}>Local</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Local Section */}
                        <section className="local-section">
                            <div style={styles.rowInfo}>
                                <div style={{ ...styles.inputGroup, flex: 4 }}>  {/* 50% */}
                                    <label >Freguesia</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>

                                <div style={{ ...styles.inputGroup, flex: 4 }}>  {/* 50% */}
                                    <label style={{ paddingLeft: '15px' }}>Concelho</label>
                                    <TextField
                                        variant="outlined"
                                        defaultValue={"Vila Pouca de Aguiar"}
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </section>


                        {/* Local Section */}
                        <section className="local-section">
                            <div style={styles.rowInfo}>
                                <div style={{ ...styles.inputGroup, flex: 2 }}>  {/* 50% */}
                                    <label>Caminho do Local</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>

                                <div style={{ ...styles.inputGroup, flex: 2 }}>  {/* 50% */}
                                    <label style={{ paddingLeft: '15px' }}>Chegada à vitima</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>

                                <div style={{ ...styles.inputGroup, flex: 2 }}>  {/* 50% */}
                                    <label style={{ paddingLeft: '15px' }}>Caminho U.Saúde</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>

                                <div style={{ ...styles.inputGroup, flex: 2 }}>  {/* 50% */}
                                    <label style={{ paddingLeft: '15px' }}>Chegada U.Saúde</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>

                                <div style={{ ...styles.inputGroup, flex: 2 }}>  {/* 50% */}
                                    <label style={{ paddingLeft: '15px' }}>Disponível</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </section>
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
                        Identificação
                    </div>
                    <div className="event-form" style={{ flexGrow: 1 }}>
                        {/* Victim Details Section */}
                        <section className="victim-section">

                            <div style={styles.rowInfo}>
                                <div style={{ ...styles.inputGroup, flex: 10 }}>  {/* 50% */}
                                    <label>Nome</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div style={{ ...styles.inputGroup, flex: 2 }}>  {/* 50% */}
                                    <label>Nascimento</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                                <div style={{ ...styles.inputGroup, flex: 1 }}>  {/* 50% */}
                                    <label style={{ paddingLeft: '15px' }}>Idade</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                                <div style={{ ...styles.inputGroup, flex: 1 }}>  {/* 50% */}
                                    <label style={{ paddingLeft: '15px' }}>Sexo</label>
                                    <div className="radio-group">
                                        <label>
                                            <input type="radio" name="sexo" value="M" />
                                            M
                                        </label>
                                        <label>
                                            <input type="radio" name="sexo" value="F" />
                                            F
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div style={{ ...styles.inputGroup, flex: 3 }}>  {/* 50% */}
                                        <label style={{ paddingLeft: '25px' }}>Nº SNS</label>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>
                                </div>
                            </div>
                            <div style={styles.rowInfo}>
                                <div style={{ ...styles.inputGroup, flex: 10 }}>  {/* 50% */}
                                    <label>Residência</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </section>
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
                        Avaliação
                    </div>
                    <div className="event-form" style={{ flexGrow: 1 }}>

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
                        Historial Clínico
                    </div>
                    <div className="event-form" style={{ flexGrow: 1 }}>

                        {/* Victim Details Section */}
                        <section className="victim-section">

                            <div style={styles.rowInfo}>
                                <div style={{ ...styles.inputGroup, flex: 10 }}>  {/* 50% */}
                                    <label>Circunstâncias</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div style={styles.rowInfo}>
                                <div style={{ ...styles.inputGroup, flex: 10 }}>  {/* 50% */}
                                    <label>Histórico Doenças</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div style={styles.rowInfo}>
                                <div style={{ ...styles.inputGroup, flex: 10 }}>  {/* 50% */}
                                    <label>Alergias</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div style={styles.rowInfo}>
                                <div style={{ ...styles.inputGroup, flex: 10 }}>  {/* 50% */}
                                    <label>Medicação Habitual</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </section>

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
                        Exame da Vítmia, Procedimentos e Terapêutica
                    </div>
                    <div className="event-form" style={{ flexGrow: 1 }}>

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

                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <RaceAssessment />
            </div>


        </div>
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
};

export default VerbeteINEM;
