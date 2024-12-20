import React from 'react';
import { TextField, FormGroup, FormControlLabel, Checkbox, Card, CardContent, formControlClasses } from '@mui/material';

const ProtocolosComponent = ({ formData, handleChange }) => {
    return (
        <table style={{ ...styles.table, marginTop: '10px' }}>
            <thead>
                <tr>
                    <th style={styles.th}>Protocolos</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th_1}>Imobilização</th>
                                <th style={styles.th_1}>VV AVC</th>
                                <th style={styles.th_1}>VV Coronária</th>
                                <th style={styles.th_1}>VV Sepsís</th>
                                <th style={styles.th_1}>VV Trauma</th>
                                <th style={styles.th_1}>VV PCR</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={styles.td}>
                                    <Checkbox
                                        name="protocolos_imo"
                                        checked={formData.protocolos_imo === 'X'}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            handleChange({
                                                target: {
                                                    name: 'protocolos_imo',
                                                    value: isChecked ? 'X' : '',
                                                },
                                            });
                                        }}
                                    />
                                </td>
                                <td style={styles.td}>
                                    <Checkbox
                                        name="protocolos_avc"
                                        checked={formData.protocolos_avc === 'X'}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            handleChange({
                                                target: {
                                                    name: 'protocolos_avc',
                                                    value: isChecked ? 'X' : '',
                                                },
                                            });
                                        }}
                                    />
                                </td>
                                <td style={styles.td}>
                                    <Checkbox
                                        name="protocolos_coronaria"
                                        checked={formData.protocolos_coronaria === 'X'}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            handleChange({
                                                target: {
                                                    name: 'protocolos_coronaria',
                                                    value: isChecked ? 'X' : '',
                                                },
                                            });
                                        }}
                                    />
                                </td>
                                <td style={styles.td}>
                                    <Checkbox
                                        name="protocolos_sepsis"
                                        checked={formData.protocolos_sepsis === 'X'}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            handleChange({
                                                target: {
                                                    name: 'protocolos_sepsis',
                                                    value: isChecked ? 'X' : '',
                                                },
                                            });
                                        }}
                                    />
                                </td>
                                <td style={styles.td}>
                                    <Checkbox
                                        name="protocolos_trauma"
                                        checked={formData.protocolos_trauma === 'X'}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            handleChange({
                                                target: {
                                                    name: 'protocolos_trauma',
                                                    value: isChecked ? 'X' : '',
                                                },
                                            });
                                        }}
                                    />
                                </td>
                                <td style={styles.td}>
                                    <Checkbox
                                        name="protocolos_pcr"
                                        checked={formData.protocolos_pcr === 'X'}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            handleChange({
                                                target: {
                                                    name: 'protocolos_pcr',
                                                    value: isChecked ? 'X' : '',
                                                },
                                            });
                                        }}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>
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

export default ProtocolosComponent;