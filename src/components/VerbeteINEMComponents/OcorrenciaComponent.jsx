import React from 'react';
import { TextField, FormGroup, FormControlLabel, Checkbox, Card, CardContent, formControlClasses } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const OcorrenciaComponent = ({ formData, handleChange }) => {
    const today = new Date().toLocaleDateString("pt-PT"); // Format as "DD/MM/YYYY"

    const handleTimeChange = (e) => {
        const { name, value } = e.target;

        // Format the time to hh:mm
        const formattedTime = value.slice(0, 5); // Extract first 5 characters (hh:mm)

        handleChange({
            target: {
                name,
                value: formattedTime, // Set the formatted time
            },
        });
    };

    return (
        <div className="event-form" style={{ flexGrow: 1 }}>
            {/* Event Form */}
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
                            name="meio"
                            variant="outlined"
                            fullWidth
                            value={formData.meio}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={{ paddingLeft: '15px' }}>Nº CODU</label>
                        <TextField
                            name="nr_evento"
                            variant="outlined"
                            fullWidth
                            value={formData.nr_evento}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={{ paddingLeft: '15px' }}>Data</label>
                        <TextField
                            variant="outlined"
                            defaultValue={today}
                            fullWidth
                        />
                    </div>
                </div>

                <div style={styles.rowInfo}>
                    <div style={{ ...styles.inputGroup, flex: 8 }}>
                        <label>Motivo</label>
                        <TextField
                            name="motivo"
                            variant="outlined"
                            fullWidth
                            value={formData.motivo}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ ...styles.inputGroup, flex: 6 }}>
                        <label style={{ paddingLeft: '15px' }}>Local da Ocorrência</label>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="local_residencia"
                                        checked={formData.local_residencia === 'X'}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            handleChange({
                                                target: {
                                                    name: 'local_residencia',
                                                    value: isChecked ? 'X' : '',
                                                },
                                            });
                                        }}
                                    />
                                }
                                label="Residência"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="local_trabalho"
                                        checked={formData.local_trabalho === 'X'}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            handleChange({
                                                target: {
                                                    name: 'local_trabalho',
                                                    value: isChecked ? 'X' : '',
                                                },
                                            });
                                        }}
                                    />
                                }
                                label="Trabalho"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="local_via"
                                        checked={formData.local_via === 'X'}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            handleChange({
                                                target: {
                                                    name: 'local_via',
                                                    value: isChecked ? 'X' : '',
                                                },
                                            });
                                        }}
                                    />
                                }
                                label="Via Pública"
                            />
                        </FormGroup>
                    </div>
                </div>

                <div style={styles.rowInfo}>
                    <div style={{ ...styles.inputGroup, flex: 1 }}>
                        <label>Local</label>
                        <TextField
                            name="local"
                            variant="outlined"
                            fullWidth
                            value={formData.local} // Controlled component
                            onChange={handleChange} // Handle change from parent
                        />
                    </div>
                </div>
            </section>

            {/* Local Section */}
            <section className="local-section">
                <div style={styles.rowInfo}>
                    <div style={{ ...styles.inputGroup, flex: 4 }}>
                        <label>Freguesia</label>
                        <TextField
                            name="freguesia"
                            variant="outlined"
                            fullWidth
                            value={formData.freguesia}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ ...styles.inputGroup, flex: 4 }}>
                        <label style={{ paddingLeft: '15px' }}>Concelho</label>
                        <TextField
                            variant="outlined"
                            defaultValue="Vila Pouca de Aguiar"
                            fullWidth
                        />
                    </div>
                </div>
            </section>

            <section className="local-section">
                <div style={styles.rowInfo}>
                    <div style={{ ...styles.inputGroup, flex: 2 }}>
                        <label style={{ paddingLeft: '0px' }}>Caminho do Local</label>
                        <TextField
                            name="hora_local"
                            variant="outlined"
                            fullWidth
                            type="time" // Use time input type
                            value={formData.hora_local || ''} // Set default value
                            onChange={handleTimeChange} // Use custom handler
                        />
                    </div>
                    <div style={{ ...styles.inputGroup, flex: 2 }}>
                        <label style={{ paddingLeft: '15px' }}>Chegada à vitima</label>
                        <TextField
                            name="hora_vitima"
                            variant="outlined"
                            fullWidth
                            type="time" // Use time input type
                            value={formData.hora_vitima || ''} // Set default value
                            onChange={handleTimeChange} // Use custom handler
                        />
                    </div>
                    <div style={{ ...styles.inputGroup, flex: 2 }}>
                        <label style={{ paddingLeft: '15px' }}>Chegada SIV / SAV</label>
                        <TextField
                            name="hora_siv_sav"
                            variant="outlined"
                            fullWidth
                            type="time" // Use time input type
                            value={formData.hora_siv_sav || ''} // Set default value
                            onChange={handleTimeChange} // Use custom handler
                        />
                    </div>
                    <div style={{ ...styles.inputGroup, flex: 2 }}>
                        <label style={{ paddingLeft: '15px' }}>Caminho U. Saúde</label>
                        <TextField
                            name="hora_caminho_hospital"
                            variant="outlined"
                            fullWidth
                            type="time" // Use time input type
                            value={formData.hora_caminho_hospital || ''} // Set default value
                            onChange={handleTimeChange} // Use custom handler
                        />
                    </div>
                    <div style={{ ...styles.inputGroup, flex: 2 }}>
                        <label style={{ paddingLeft: '15px' }}>Chegada U. Saúde</label>
                        <TextField
                            name="hora_chegada_unidade_hospitalar"
                            variant="outlined"
                            fullWidth
                            type="time" // Use time input type
                            value={formData.hora_chegada_unidade_hospitalar || ''} // Set default value
                            onChange={handleTimeChange} // Use custom handler
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

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

export default OcorrenciaComponent;