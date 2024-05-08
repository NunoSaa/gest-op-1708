import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function MateriasPerigosasResult() {

    const location = useLocation();
    const results = location.state.results;
    
    console.log(results);
    return (
        <div style={styles.center}>
            <div style={styles.container}>
            <h2>Resultados da Pesquisa:</h2>
                <ul>
                    {results.map((result, index) => (
                        <a key={index}>{result.NOME_SUB}, {result.NOME_SUB1}</a>
                    ))}
                </ul>
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
        marginBottom: 20,
    },
    button_ocorrencias: {
        width: 150, // Set the width and height to create square buttons
        height: 150,
        backgroundColor: '#FF6666',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        flex: 1, // Each button takes up equal space within the row
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_decisao: {
        width: 150, // Set the width and height to create square buttons
        height: 150,
        backgroundColor: '#A0A0A0',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        flex: 1, // Each button takes up equal space within the row
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
    },
    button_checklist: {
        width: 150, // Set the width and height to create square buttons
        height: 150,
        backgroundColor: '#00CC00',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        flex: 1, // Each button takes up equal space within the row
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_azmat: {
        width: 150, // Set the width and height to create square buttons
        height: 150,
        backgroundColor: '#FF9933',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        flex: 1, // Each button takes up equal space within the row
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
    },
    button_emPreHosp: {
        width: 150, // Set the width and height to create square buttons
        height: 150,
        backgroundColor: '#3399FF',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        //flex: 1, // Each button takes up equal space within the row
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center",
    },
}

export default MateriasPerigosasResult;
