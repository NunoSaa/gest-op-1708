import React from 'react';
import { TextField, FormGroup, FormControlLabel, Checkbox, Card, CardContent, formControlClasses } from '@mui/material';

const OcorrenciaComponent = ({ formData, handleChange}) => {
    const today = new Date().toLocaleDateString("pt-PT"); // Format as "DD/MM/YYYY"

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
                            variant="outlined"
                            value={formData.meio}
                            defaultValue="Reserva"
                            onChange={handleChange}
                            fullWidth
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={{ paddingLeft: '15px' }}>Nº Evento</label>
                        <TextField
                            name="nr_vitimas"
                            variant="outlined"
                            fullWidth
                            value={formData.numero_codu}
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
                    <div style={{ ...styles.inputGroup, flex: 2 }}>
                        <label>Nº Vítimas</label>
                        <TextField
                            name="nr_vitimas"
                            variant="outlined"
                            fullWidth
                            value={formData.nr_vitimas}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ ...styles.inputGroup, flex: 8 }}>
                        <label style={{ paddingLeft: '15px' }}>Local</label>
                        <TextField
                            name="local"
                            variant="outlined"
                            fullWidth
                            value={formData.local}
                            onChange={handleChange}
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
                            name="caminhoLocal"
                            variant="outlined"
                            fullWidth
                            value={formData.hora_local} // Assuming you want to manage this value
                            onChange={handleChange} // Ensure this is handled correctly
                        />
                    </div>
                    <div style={{ ...styles.inputGroup, flex: 2 }}>
                        <label style={{ paddingLeft: '15px' }}>Chegada à vitima</label>
                        <TextField
                            name="chegadaVitima"
                            variant="outlined"
                            fullWidth
                            value={formData.hora_vitima} // Manage this state similarly
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ ...styles.inputGroup, flex: 2 }}>
                        <label style={{ paddingLeft: '15px' }}>Caminho U.Saúde</label>
                        <TextField
                            name="caminhoUSaude"
                            variant="outlined"
                            fullWidth
                            value={formData.hora_caminho} // Manage this state similarly
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ ...styles.inputGroup, flex: 2 }}>
                        <label style={{ paddingLeft: '15px' }}>Chegada U.Saúde</label>
                        <TextField
                            name="chegadaUSaude"
                            variant="outlined"
                            fullWidth
                            value={formData.hora_hospital} // Manage this state similarly
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ ...styles.inputGroup, flex: 2 }}>
                        <label style={{ paddingLeft: '15px' }}>Disponível</label>
                        <TextField
                            name="disponivel"
                            variant="outlined"
                            fullWidth
                            value={formData.hora_disponivel} // Manage this state similarly
                            onChange={handleChange}
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