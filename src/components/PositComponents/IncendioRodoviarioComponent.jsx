import React from 'react';
import { TextField, FormGroup, FormControlLabel, Checkbox, Card, CardContent, formControlClasses } from '@mui/material';

const IncendiosRodoviariosComponent = ({
    pontosSituacao,
    handleCheckboxChange,
    fogoVista,
    handleFogoVistaChange,
    em,
    handleEmChange,
    geolocationGMS,
    estouEm,
    setEstouEm,
    localidade,
    handleChange,
}) => {
    return (
<span style={styles.infoProp}>Incendios rodoviarios</span>
    );
};

// Styles can be moved to a shared styles object or kept here
const styles = {
    rowInfo: {
        flexDirection: 'row',
        marginBottom: 25,
        paddingLeft: 0,
    },
    infoProp: {
        fontSize: 18,
        paddingBottom: 10,
        textAlign: "right",
        fontWeight: "bold",
        marginRight: 15,
        width: 200,
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginLeft: 0,
        marginRight: 15,
        marginTop: 15,
    },
    formControlCheckbox: {
        paddingLeft: ' 20px'
    }
};

export default IncendiosRodoviariosComponent;