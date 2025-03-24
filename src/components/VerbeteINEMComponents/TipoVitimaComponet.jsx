import React, { useState, useEffect } from "react";
import { Checkbox } from "@mui/material"; // Assuming you're using Material UI

const TipoVitimaComponent = ({ onSelectionChange }) => {
    // Initialize state from localStorage or set defaults
    const [selectedTipoVitimaOption, setSelectedTipoVitimaOption] = useState(localStorage.getItem("selectedTipoVitima") || "");

    // Function to handle checkbox selection (only one at a time)
    const handleChangeTipoVitima = (e) => {
        const { name } = e.target;

        // Update the selected option
        setSelectedTipoVitimaOption(name);

        // Save the selected option in localStorage
        localStorage.setItem("selectedTipoVitima", name);

        // Notify the parent component
        if (onSelectionChange) {
            onSelectionChange(name);
        }
    };

    return (

        <div className="event-form" style={{ flexGrow: 1 }}>
            {/* Event Form */}
            <section className="header-section">
                <div style={styles.rowInfo}>
                    <div style={{ ...styles.inputGroup, flex: 3}}>
                        
                                    <table style={styles.table}>
                                        <thead>
                                            <tr>
                                                <th style={styles.th_1}>Civil</th>
                                                <th style={styles.th_1}>Bombeiro</th>
                                                <th style={styles.th_1}>APC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {["Civil", "Bombeiro", "APC"].map((key) => (
                                                    <td key={key} style={styles.td}>
                                                        <Checkbox
                                                            name={key}
                                                            checked={selectedTipoVitimaOption === key}
                                                            onChange={handleChangeTipoVitima}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Styles (you can customize these as needed)
const styles = {
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        backgroundColor: "#0065ad", // Blue color for headers
        color: "white",
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "center",
        fontSize: "12px",
    },
    th_1: {
        backgroundColor: "#3F9CFA", // Lighter blue for subheaders
        color: "white",
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "center",
        fontSize: "12px",
    },
    td: {
        padding: "5px",
        border: "1px solid #ddd",
        textAlign: "center",
        fontSize: "12px",
    },
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

export default TipoVitimaComponent;
