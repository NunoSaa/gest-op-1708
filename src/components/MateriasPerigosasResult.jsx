import React from 'react';
import { useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function MateriasPerigosasResult() {

    const location = useLocation();
    const results = location.state.results;

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
                        Matérias Perigosas - Pesquisa
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={styles.center}>
                <div style={styles.container}>
                    <p>
                        {results.map((result, index) => (
                            <div style={styles.row}>
                                <div style={styles.rowInfo}>
                                    <span style={styles.titleProp}>Nome da Substância: </span>
                                    <span style={styles.info}>{result.NOME_SUB !== '' && result.NOME_SUB + ', '}</span>
                                    <span style={styles.info}>{result.NOME_SUB1 !== '' && result.NOME_SUB1 + ', '} </span>
                                    <span style={styles.info}>{result.NOME_SUB2 !== '' && result.NOME_SUB2 + ', '} </span>
                                    <span style={styles.info}>{result.NOME_SUB3 !== '' && result.NOME_SUB3 + ', '} </span>
                                    <span style={styles.info}>{result.NOME_SUB4 !== '' && result.NOME_SUB4 + ', '} </span>
                                    <span style={styles.info}>{result.NOME_SUB5 !== '' && result.NOME_SUB5 + ', '}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.titleProp}>Número ONU: </span>
                                    <span style={styles.info}>{result.ONU}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.titleProp}>Estado: </span>
                                    <span style={styles.info}>{result.ESTADO}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.titleProp}>Características: </span>
                                    <span style={styles.info}>{result.CARACTERISTICAS}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.titleProp}>Equipamento: </span>
                                    <span style={styles.info}>{result.EQUIPAMENTO}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.titleProp}>Segurança: </span>
                                    <span style={styles.info}>{result.SEGURANCA}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.titleProp}>Fuga: </span>
                                    <span style={styles.info}>{result.FUGA}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.titleProp}>Incêndio: </span>
                                    <span style={styles.info}>{result.INCENDIO}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.titleProp}>Socorros: </span>
                                    <span style={styles.info}>{result.SOCORROS}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.titleProp}>Evecuação: </span>
                                    <span style={styles.info}>{result.EVACUACAO}</span>
                                </div>
                            </div>
                        ))}
                    </p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "white",
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 75,
    },
    rowInfo: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingLeft: 25
    },
    titleProp: {
        fontWeight: 'bold'
    },
    info: {
        fontSize: 16,
        paddingBottom: 10,
        paddingLeft: 5,
        textAlign: "center",
        color: "grey"
    },
}

export default MateriasPerigosasResult;
