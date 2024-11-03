import React from 'react';
import { TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const IdentificacaoComponent = ({ formData, handleChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="event-form" style={{ flexGrow: 1 }}>
            {/* Victim Details Section */}
            <div style={styles.rowInfo}>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                    <label>Nome</label>
                    <TextField
                        name="nome"
                        variant="outlined"
                        fullWidth
                        value={formData.nome} // Controlled component
                        onChange={handleChange} // Handle change from parent
                    />
                </div>
            </div>

            <div style={styles.rowInfo}>
                <div style={{ ...styles.inputGroup, flex: 0.3 }}>
                    <label>Nascimento</label>
                    <DatePicker
                        value={formData.nascimento}
                        onChange={(date) => {
                            handleChange({
                                target: { name: 'nascimento', value: date }
                            });
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
                    />
                </div>
                <div style={{ ...styles.inputGroup, flex: 0.2 }}>
                    <label style={{ paddingLeft: '15px' }}>Idade</label>
                    <TextField
                        name="idade"
                        variant="outlined"
                        fullWidth
                        value={formData.idade}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ ...styles.inputGroup, flex: 0.2 }}>
                    <label style={{ paddingLeft: '15px', marginRight: '10px' }}>Sexo</label>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="sexoM"
                                    checked={formData.sexoM} // Controlled component
                                    onChange={handleChange} // Handle change from parent
                                />
                            }
                            label="M"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="sexoF"
                                    checked={formData.sexoF} // Controlled component
                                    onChange={handleChange} // Handle change from parent
                                />
                            }
                            label="F"
                        />
                    </FormGroup>
                </div>
                <div style={{ ...styles.inputGroup, flex: 0.5 }}>
                    <label style={{ paddingLeft: '15px' }}>Nº SNS</label>
                    <TextField
                        name="nr_sns"
                        variant="outlined"
                        fullWidth
                        value={formData.nr_sns}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div style={styles.rowInfo}>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                    <label>Residência</label>
                    <TextField
                        name="residencia"
                        variant="outlined"
                        fullWidth
                        value={formData.residencia}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
        </LocalizationProvider>
    );
};

const styles = {
    container: {
        //marginLeft: 15,
        //marginRight: 15,
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
        padding: '5px',
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
        marginRight: '0px',
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
    formControlCheckbox: {
        paddingLeft: '20px'
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

export default IdentificacaoComponent;