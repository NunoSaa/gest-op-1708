import React from 'react';
import { TextField, FormGroup, FormControlLabel, Checkbox, Card, CardContent, formControlClasses } from '@mui/material';

const NaoTransporteComponent = ({ formData, handleChange }) => {
    return (
        <table style={{ ...styles.table, marginTop: '10px' }}>
            <thead>
                <tr>
                    {/* "Não Transporte" fills 100% of the row */}
                    <th style={styles.th} colSpan="9">Não Transporte</th>
                </tr>
            </thead>
            <tbody>
                {/* Existing checkboxes section */}
                <tr>
                    <td colSpan="9">
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th_1}>Abandonou o local</th>
                                    <th style={styles.th_1}>Decisão médica</th>
                                    <th style={styles.th_1}>Morte</th>
                                    <th style={styles.th_1}>Desativação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={styles.td}>
                                        <Checkbox
                                            name="n_transporte_abandonou"
                                            checked={formData.n_transporte_abandonou === 'X'}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                handleChange({
                                                    target: {
                                                        name: 'n_transporte_abandonou',
                                                        value: isChecked ? 'X' : '',
                                                    },
                                                });
                                            }}
                                        />
                                    </td>
                                    <td style={styles.td}>
                                        <Checkbox
                                            name="n_transporte_medica"
                                            checked={formData.n_transporte_medica === 'X'}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                handleChange({
                                                    target: {
                                                        name: 'n_transporte_medica',
                                                        value: isChecked ? 'X' : '',
                                                    },
                                                });
                                            }}
                                        />
                                    </td>
                                    <td style={styles.td}>
                                         <Checkbox
                                            name="n_transporte_morte"
                                            checked={formData.n_transporte_morte === 'X'}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                handleChange({
                                                    target: {
                                                        name: 'n_transporte_morte',
                                                        value: isChecked ? 'X' : '',
                                                    },
                                                });
                                            }}
                                        />
                                    </td>
                                    <td style={styles.td}>
                                        <Checkbox
                                            name="n_transporte_desativacao"
                                            checked={formData.n_transporte_desativacao === 'X'}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                handleChange({
                                                    target: {
                                                        name: 'n_transporte_desativacao',
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

                {/* New "Recusa" section */}
                <tr>
                    <th style={styles.th} colSpan="9">Recusa</th>
                </tr>
                <tr>
                    <td colSpan="9">
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th_1}>Próprio</th>
                                    <th style={styles.th_1}>Representante</th>
                                    <th style={styles.th_1}>Avaliação</th>
                                    <th style={styles.th_1}>Tratamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={styles.td}>
                                        <Checkbox
                                            name="recusa_proprio"
                                            checked={formData.recusa_proprio === 'X'}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                handleChange({
                                                    target: {
                                                        name: 'recusa_proprio',
                                                        value: isChecked ? 'X' : '',
                                                    },
                                                });
                                            }}
                                        />
                                    </td>
                                    <td style={styles.td}>
                                        <Checkbox
                                            name="recusa_representante"
                                            checked={formData.recusa_representante === 'X'}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                handleChange({
                                                    target: {
                                                        name: 'recusa_representante',
                                                        value: isChecked ? 'X' : '',
                                                    },
                                                });
                                            }}
                                        />
                                    </td>
                                    <td style={styles.td}>
                                        <Checkbox
                                            name="recusa_avaliacao"
                                            checked={formData.recusa_avaliacao === 'X'}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                handleChange({
                                                    target: {
                                                        name: 'recusa_avaliacao',
                                                        value: isChecked ? 'X' : '',
                                                    },
                                                });
                                            }}
                                        />
                                    </td>
                                    <td style={styles.td}>
                                        <Checkbox
                                            name="recusa_tratamento"
                                            checked={formData.recusa_tratamento === 'X'}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                handleChange({
                                                    target: {
                                                        name: 'recusa_tratamento',
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

export default NaoTransporteComponent;