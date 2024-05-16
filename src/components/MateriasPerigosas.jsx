import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';


function Ocorrencias() {

    const [queryONU, setQueryONU] = useState('');
    const [hintsONU, setHintsONU] = useState([]);
    const [searchResultsONU, setSearchResultsONU] = useState([]);
    const [queryName, setQueryName] = useState('');
    const [hintsName, setHintsName] = useState([]);
    const [searchResultsName, setSearchResultsName] = useState([]);
    const navigate = useNavigate();

    // Make a request to your API for hints
    useEffect(() => {
        const fetchDataONU = async () => {
            try {
                axios.get(`https://preventech-proxy-service.onrender.com/api/materiasperigosas/getALLNumONU`)
                    .then(response => {
                        const uniqueData = [...new Set(response.data)];
                        console.log(response.data);
                        setHintsONU(uniqueData);
                    })
            } catch (error) {
                console.error('Error fetching hints:', error);
            }
        };
        fetchDataONU(); // Call the function once when the component mounts

        const fetchDataName = async () => {
            try {
                axios.get(`https://preventech-proxy-service.onrender.com/api/materiasperigosas/getALLNomeMateria`)
                    .then(response => {
                        const uniqueData = [...new Set(response.data)];
                        console.log(response.data);
                        setHintsName(uniqueData);
                    })
            } catch (error) {
                console.error('Error fetching hints:', error);
            }
        };

        fetchDataName();
    }, []);

    const handleSearchONU = async () => {
        // Make a request to another API after search button is pressed
        try {
            const response = await axios.get(`https://preventech-proxy-service.onrender.com/api/materiasperigosas/getByONU?onu=${queryONU}`);
            setSearchResultsONU(response.data);
            navigate('/materiasPerigosasResult', { state: { results: response.data } });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSearchName = async () => {
        // Make a request to another API after search button is pressed
        try {
            const response = await axios.get(`https://preventech-proxy-service.onrender.com/api/materiasperigosas/getByNome?name=${queryName}`);
            setSearchResultsName(response.data);
            navigate('/materiasPerigosasResult', { state: { results: response.data } });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div style={styles.center}>
            <div style={styles.container}>
                <p style={styles.titleONU} >Pesquisa por Número ONU</p>
                <Autocomplete
                    disablePortal
                    id="pesquisa_onu"
                    options={hintsONU}
                    getOptionLabel={(option) => option.toString()}
                    value={queryONU || ''}
                    onChange={(event, newValue) => setQueryONU(newValue)}
                    sx={{ width: '75%' }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Número ONU..."
                            defaultValue={queryONU}
                            style={styles.textFieldONU} // Use defaultValue instead of value
                        />
                    )}
                />
                <Button style={styles.button_ONU} onClick={handleSearchONU}>Pesquisar Número ONU</Button>

                <p style={styles.titleNome}>Pesquisa por Nome da Matéria</p>
                <Autocomplete
                    disablePortal
                    id="pesquisa_nome"
                    options={hintsName}
                    getOptionLabel={(option) => option.toString()}
                    value={queryName || ''}
                    onChange={(event, newValue) => setQueryName(newValue)}
                    sx={{ width: '75%' }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Nome da Matéria..."
                            defaultValue={queryName}
                            style={styles.textFieldName} // Use defaultValue instead of value
                        />
                    )}
                />
                <Button style={styles.button_Name} onClick={handleSearchName}>Pesquisar Nome Matéria</Button>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    button_ONU: {
        width: '65%',
        height: 65,
        backgroundColor: '#A0A0A0',
        borderRadius: 10,
        color:'white',
        marginTop: 50,
    },
    button_Name: {
        width: '65%',
        height: 65,
        backgroundColor: '#A0A0A0',
        borderRadius: 10,
        color:'white',
        marginTop: 50,
    },
    titleONU: {
        fontSize: 24,
        marginTop: 75,
        fontWeight: 'bold'
    },
    titleNome: {
        fontSize: 24,
        marginTop: 125,
        fontWeight: 'bold'
    },
    textFieldONU: {
        marginTop: 50,
    },
    textFieldName: {
        marginTop: 50,
    },
};

export default Ocorrencias;