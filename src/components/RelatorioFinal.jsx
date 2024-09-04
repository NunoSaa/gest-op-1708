import React from 'react';
import '../css/Login.css';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

function RelatorioFinal() {
    return (
        <div style={styles.container}>
            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Geral: </span>
            </div>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Descrição: </span>
                <TextField
                    style={styles.input}
                    multiline
                    rows={10}
                    variant="outlined"
                    fullWidth
                />
            </div>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Trabalho Desenvolvido: </span>
                <TextField
                    style={styles.input}
                    multiline
                    rows={10}
                    variant="outlined"
                    fullWidth
                />
            </div>

            <Divider style={styles.divider} />

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Efeitos do Sinistro: </span>
            </div>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Danos Causados: </span>
                <TextField
                    style={styles.input}
                    multiline
                    rows={6}
                    variant="outlined"
                    fullWidth
                />
            </div>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Vítimas: </span>
                <div style={styles.vitimasContainer}>
                    <div style={styles.headerRow}>
                        <div style={styles.headerCell}></div>
                        <div style={styles.headerCell}>Leves</div>
                        <div style={styles.headerCell}>Graves</div>
                        <div style={styles.headerCell}>Mortos</div>
                        <div style={styles.headerCell}>Assistidos</div>
                    </div>
                    <div style={styles.dataRow}>
                        <div style={styles.labelCell}>Bombeiros</div>
                        <TextField style={styles.inputCell} variant="outlined" />
                        <TextField style={styles.inputCell} variant="outlined" />
                        <TextField style={styles.inputCell} variant="outlined" />
                        <TextField style={styles.inputCell} variant="outlined" />
                    </div>
                    <div style={styles.dataRow}>
                        <div style={styles.labelCell}>APC</div>
                        <TextField style={styles.inputCell} variant="outlined" />
                        <TextField style={styles.inputCell} variant="outlined" />
                        <TextField style={styles.inputCell} variant="outlined" />
                        <TextField style={styles.inputCell} variant="outlined" />
                    </div>
                    <div style={styles.dataRow}>
                        <div style={styles.labelCell}>Civis</div>
                        <TextField style={styles.inputCell} variant="outlined" />
                        <TextField style={styles.inputCell} variant="outlined" />
                        <TextField style={styles.inputCell} variant="outlined" />
                        <TextField style={styles.inputCell} variant="outlined" />
                    </div>
                </div>
            </div>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Desalojados: </span>
                <div style={styles.desalojadosContainer}>
                    <div style={styles.desalojadosRow}>
                        <div style={styles.desalojadosLabel}>Qt.</div>
                        <TextField style={styles.desalojadosInputQt} variant="outlined" />
                        <div style={styles.desalojadosLabel}>Desc.</div>
                        <TextField style={styles.desalojadosInputDesc} variant="outlined" fullWidth />
                    </div>
                </div>
            </div>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Incêndios Rurais: </span>
                <div style={styles.incendiosRuraisContainer}>
                    <div style={styles.incendiosRuraisRow}>
                        <div style={styles.incendiosRuraisLabel}>Tipologia: </div>
                        <TextField style={styles.incendiosRuraisInputQt} variant="outlined" />
                        <div style={styles.incendiosRuraisLabel}>Área: </div>
                        <TextField style={styles.incendiosRuraisInputDesc} variant="outlined" fullWidth />
                        <div style={{ paddingLeft: "10px" }}>hectares</div>
                    </div>
                </div>
            </div>

            <div style={styles.rowButton}>
                    <Button type="submit" style={styles.button_SAVE}>
                        <p style={styles.buttonText}>Guardar</p>
                    </Button>
                </div>

        </div>
    );
}

const styles = {
    container: {
        marginLeft: 25,
        marginRight: 25,
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 5,
        paddingRight: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    rowInfo: {
        flexDirection: 'column', // Stack items vertically
        marginBottom: 15,
        paddingLeft: 0,
    },
    infoProp: {
        fontSize: 18,
        paddingBottom: 10,
        textAlign: "left",
        fontWeight: "bold",
        marginBottom: 10, // Space between label and input field
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15, // Space between input fields
    },
    divider: {
        marginBottom: 50,
        marginTop: 50
    },
    vitimasContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr repeat(4, 1fr)',
        gap: '10px',
        maxWidth: '100%',
        margin: 'auto',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginTop: 25
    },
    headerRow: {
        display: 'contents',
    },
    headerCell: {
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: '10px',
    },
    dataRow: {
        display: 'contents',
    },
    labelCell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    inputCell: {
        width: '100%',
    },
    desalojadosContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginTop: 25
    },
    desalojadosRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    desalojadosLabel: {
        fontWeight: 'bold',
        marginRight: '10px',
    },
    desalojadosInputQt: {
        width: '60px',
        marginRight: '20px',
    },
    desalojadosInputDesc: {
        flex: 1,
    },
    incendiosRuraisContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginTop: 25
    },
    incendiosRuraisRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    incendiosRuraisLabel: {
        fontWeight: 'bold',
        marginRight: '10px',
    },
    incendiosRuraisInputQt: {
        width: "60%",
        marginRight: '20px',
    },
    incendiosRuraisInputDesc: {
        flex: 1,
    },
    button_SAVE: {
        width: "100%",
        height: 75,
        backgroundColor: '#99FF99',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50, // Adjusted for consistent spacing
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
};

export default RelatorioFinal;
