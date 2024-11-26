import React from 'react';
import { TextField, FormGroup, FormControlLabel, Checkbox, Card, CardContent, formControlClasses } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Utils from '../../utils/utils';

const AvaliacaoComponent = ({ formData, handleChange }) => {

    const [age1, setAge1] = React.useState('');
    const [age2, setAge2] = React.useState('');
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

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

    const handleChange1 = (event) => {
        setAge1(event.target.value);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleOpen1 = () => {
        setOpen1(true);
    };

    const handleChange2 = (event) => {
        setAge2(event.target.value);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleOpen2 = () => {
        setOpen2(true);
    };

    return (
        <div className="event-form" style={{ flexGrow: 1 }}>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Hora h:m</th>
                        <th style={styles.th}>AVDS OCS</th>
                        <th style={styles.th}>Vent. gpm</th>
                        <th style={styles.th}>SpO2 %</th>
                        <th style={styles.th}>O2 Sup l/min</th>
                        <th style={styles.th}>EtCO2 mmHg</th>
                        <th style={styles.th}>Pulso bpm</th>
                        <th style={styles.th}>ECG ver/r</th>
                        <th style={styles.th}>P. Arterial Sistólica</th>
                        <th style={styles.th}>P. Arterial Diastólica</th>
                        <th style={styles.th}>Pele</th>
                        <th style={styles.th}>Temp. °C</th>
                        <th style={styles.th}>Pupilas</th>
                        <th style={styles.th}>Dor 0-10</th>
                        <th style={styles.th}>Glicemia mg/dL</th>
                        <th style={styles.th}>NEWS/TAP q.v./0-5</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={styles.td}>
                            <TextField
                                name="avaliacao_hora"
                                variant="outlined"
                                fullWidth
                                type="time" // Use time input type
                                value={formData.avaliacao_hora || ''} // Set default value
                                onChange={handleTimeChange} // Use custom handler
                            />
                        </td>
                        <td style={styles.td}>
                            <Select
                                name="avaliacao_avds"
                                value={formData.avaliacao_avds} // Fallback to 'na'
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value="A">A</MenuItem>
                                <MenuItem value="V">V</MenuItem>
                                <MenuItem value="D">D</MenuItem>
                                <MenuItem value="S">S</MenuItem>
                            </Select>
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                name="avaliacao_vent"
                                value={formData.avaliacao_vent}
                                onChange={handleChange}
                                fullWidth
                            />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                name="avaliacao_spo2"
                                value={formData.avaliacao_spo2}
                                onChange={handleChange}
                                fullWidth
                            />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                value={formData.avaliacao_o2}
                                name="avaliacao_o2"
                                onChange={handleChange}
                                fullWidth
                            />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                value={formData.avaliacao_co2}
                                name="avaliacao_co2"
                                onChange={handleChange}
                                fullWidth
                            />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                value={formData.avaliacao_pulso}
                                name="avaliacao_pulso"
                                onChange={handleChange}
                                fullWidth
                            />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                value={formData.avaliacao_ecg}
                                name="avaliacao_ecg"
                                onChange={handleChange}
                                fullWidth
                            />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                value={formData.avaliacao_p_arterial_s}
                                name="avaliacao_p_arterial_s"
                                onChange={handleChange}
                                fullWidth
                            />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                value={formData.avaliacao_p_arterial_d}
                                name="avaliacao_p_arterial_d"
                                onChange={handleChange}
                                fullWidth
                            />
                        </td>
                        <td style={styles.td}>
                        <TextField
                                variant="outlined"
                                value={formData.avaliacao_pele}
                                name="avaliacao_pele"
                                onChange={handleChange}
                                fullWidth
                            />
                        </td>
                        <td style={styles.td}>
                        <TextField
                                variant="outlined"
                                value={formData.avaliacao_temp}
                                name="avaliacao_temp"
                                onChange={handleChange}
                                fullWidth
                            />
                        </td>
                        <td style={styles.td}>
                        <TextField
                                variant="outlined"
                                value={formData.avaliacao_pupilas}
                                name="avaliacao_pupilas"
                                onChange={handleChange}
                                fullWidth
                            />
                        </td>
                        <td style={styles.td}>
                        <TextField
                                variant="outlined"
                                value={formData.avaliacao_dor}
                                name="avaliacao_dor"
                                onChange={handleChange}
                                fullWidth
                            />
                        </td>
                        <td style={styles.td}>
                        <TextField
                                variant="outlined"
                                value={formData.avaliacao_glicemia}
                                name="avaliacao_glicemia"
                                onChange={handleChange}
                                fullWidth
                            />
                        </td>
                        <td style={styles.td}>
                        <TextField
                                variant="outlined"
                                value={formData.avaliacao_news}
                                name="avaliacao_news"
                                onChange={handleChange}
                                fullWidth
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <FormControl sx={{ s: 1, minWidth: 30 }}>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open1}
                                    onClose={handleClose1}
                                    onOpen={handleOpen1}
                                    value={age1}
                                    onChange={handleChange1}
                                    inputProps={{
                                        style: { height: '26px', display: 'flex', alignItems: 'center' },
                                    }}>
                                    <MenuItem value={"A"}>A</MenuItem>
                                    <MenuItem value={"V"}>V</MenuItem>
                                    <MenuItem value={"D"}>D</MenuItem>
                                    <MenuItem value={"S"}>S</MenuItem>
                                </Select>
                            </FormControl>
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                    </tr>
                    <tr>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <FormControl sx={{ s: 1, minWidth: 30 }}>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open2}
                                    onClose={handleClose2}
                                    onOpen={handleOpen2}
                                    value={age2}
                                    onChange={handleChange2}
                                    inputProps={{
                                        style: { height: '26px', display: 'flex', alignItems: 'center' },
                                    }}>
                                    <MenuItem value={"A"}>A</MenuItem>
                                    <MenuItem value={"V"}>V</MenuItem>
                                    <MenuItem value={"D"}>D</MenuItem>
                                    <MenuItem value={"S"}>S</MenuItem>
                                </Select>
                            </FormControl>
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                        <td style={styles.td}>
                            <TextField
                                variant="outlined"
                                fullWidth />
                        </td>
                    </tr>
                </tbody>
            </table>
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

export default AvaliacaoComponent;