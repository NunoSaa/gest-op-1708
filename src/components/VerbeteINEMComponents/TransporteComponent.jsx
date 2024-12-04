import React from 'react';
import { TextField, Checkbox, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const TransporteComponent = ({ formData, handleChange }) => {

    return (
        <table style={{ ...styles.table, marginTop: '10px' }}>
            <thead>
                <tr>
                    {/* "Não Transporte" fills 100% of the row */}
                    <th style={styles.th} colSpan="9">Transporte</th>
                </tr>
            </thead>
            <tbody>
                {/* Existing checkboxes section */}
                <tr>
                    <td colSpan="9">
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th_1}>Primário</th>
                                    <th style={styles.th_1}>Secundário</th>
                                    <th style={styles.th_1}>Acompanhamento médico</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={styles.td}>
                                        <Checkbox
                                            name="transporte_primario"
                                            checked={formData.transporte_primario === 'X'}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                handleChange({
                                                    target: {
                                                        name: 'transporte_primario',
                                                        value: isChecked ? 'X' : '',
                                                    },
                                                });
                                            }}
                                        />
                                    </td>
                                    <td style={styles.td}>
                                         <Checkbox
                                            name="transporte_secundario"
                                            checked={formData.transporte_secundario === 'X'}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                handleChange({
                                                    target: {
                                                        name: 'transporte_secundario',
                                                        value: isChecked ? 'X' : '',
                                                    },
                                                });
                                            }}
                                        />
                                    </td>
                                    <td style={styles.td}>
                                        <Checkbox
                                            name="acompanhamento_medico"
                                            checked={formData.acompanhamento_medico === 'X'}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                handleChange({
                                                    target: {
                                                        name: 'acompanhamento_medico',
                                                        value: isChecked ? 'X' : '',
                                                    },
                                                });
                                            }}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

                <table style={{ ...styles.table, marginTop: '10px' }}>
                    <div style={styles.rowInfo}>
                        <div style={{ ...styles.inputGroup, flex: 5 }}>
                            <label>Unidade de Saúde de Origem</label>
                            <TextField
                                name="transporte_unidade_origem"
                                variant="outlined"
                                fullWidth
                                value={formData.transporte_unidade_origem}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ ...styles.inputGroup, flex: 2 }}>
                            <label style={{ paddingLeft: '15px' }}>Nrº de Episódio</label>
                            <TextField
                                name="transporte_nr_processo_origem"
                                variant="outlined"
                                fullWidth
                                value={formData.transporte_nr_processo_origem}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </table>

                <table style={{ ...styles.table, marginTop: '10px' }}>
                    <div style={styles.rowInfo}>
                        <div style={{ ...styles.inputGroup, flex: 5 }}>
                            <label>Unidade de Saúde de Destino</label>
                            <TextField
                                name="transporte_unidade_destino"
                                variant="outlined"
                                fullWidth
                                value={formData.transporte_unidade_destino}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ ...styles.inputGroup, flex: 2 }}>
                            <label style={{ paddingLeft: '15px' }}>Nrº de Episódio</label>
                            <TextField
                                name="transporte_nr_processo_destino"
                                variant="outlined"
                                fullWidth
                                value={formData.transporte_nr_processo_destino}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </table>

                <table style={{ ...styles.table, marginTop: '10px' }}>
                    <div style={styles.rowInfo}>
                        <div style={{ ...styles.inputGroup, flex: 5 }}>
                            <label>Responsável do Meio</label>
                            <TextField
                                name="transporte_responsavel_meio"
                                variant="outlined"
                                fullWidth
                                value={formData.transporte_responsavel_meio}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ ...styles.inputGroup, flex: 2 }}>
                            <label style={{ paddingLeft: '15px' }}>Nrº Profissional</label>
                            <TextField
                                name="transporte_nr_profissional"
                                variant="outlined"
                                fullWidth
                                value={formData.transporte_nr_profissional}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </table>

            </tbody>
        </table>
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
    th_1: {
        backgroundColor: '#3F9CFA', // Blue color for headers
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

export default TransporteComponent;