import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/Logo.png'
import '../css/Login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';



function OcorrenciasDetail() {

    const location = useLocation();
    const { state } = location;

    // Ensure state is defined before accessing its properties
    if (!state) {
        // Handle case where state is undefined
        return <div>State is undefined</div>;
    }

    // Now you can access properties of the state object
    const item = state;

    console.log(item);

    return (
        <div>
            <h1>Ocorrências</h1>
        </div>
    );
};

const styles = {
    container: {
        marginLeft: 25,
        marginRight: 25,
        flex: 1,
        backgroundColor: 'white',
    },
    item: {

        backgroundColor: '#E0E0E0',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#C0C0C0',
        borderWidth: 5,
        borderRadius: 5,
        marginTop: 15
    },
    title: {
        fontSize: 24,
        paddingBottom: 10,
    },
    description: {
        fontSize: 18,
        paddingBottom: 10,
    },
    vehicle: {
        marginTop: '10',
        fontSize: 14,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    timestamp: {
        marginRight: 25,
        marginLeft: 25,
        color: '#888',
        fontSize: 16
    },
    image: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
    },
};

export default OcorrenciasDetail;