import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


function HomePage() {

    let navigate = useNavigate()

    const openApoioDecisaoPage = () => {
        // Replace 'https://example.com' with the URL you want to open
        window.open('https://www.google.com/maps/d/viewer?mid=1hcFft-BfiEyawGCVxkRu2LgEd_cjte0&ll=41.519126909132694%2C-7.626061528903792&z=11', '_blank');
    };

    const handleClickOcorrencias = () => {
        // Navigate to the new page
        navigate('/ocorrencias');
    };

    const handleClickCheckList = () => {
        // Navigate to the new page
        navigate('/checklist');
    };

    const handleClickMateriasPerigosas = () => {
        // Navigate to the new page
        navigate('/materiasPerigosas');
    };

    return (
        <div style={styles.center}>
            <div style={styles.container}>
                <div style={styles.row}>
                    <Button style={styles.button_ocorrencias} variant="contained" onClick={handleClickOcorrencias}>Ocorrências</Button>
                    <Button style={styles.button_decisao} variant="contained" onClick={openApoioDecisaoPage}>Apoio Decisão</Button>
                </div>
                <div style={styles.row}>
                    <Button style={styles.button_checklist} variant="contained" onClick={handleClickCheckList}>CheckList</Button>
                    <Button style={styles.button_azmat} variant="contained" onClick={handleClickMateriasPerigosas}>Matérias Perigosas</Button>
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

export default HomePage;
