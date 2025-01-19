import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Login.css';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useNavigate, useLocation } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IncendiosUrbanosComponent from './PositComponents/IncendiosUrbanosComponent';
import IncendiosRodoviariosComponent from './PositComponents/IncendioRodoviarioComponent';


function NovoPosit() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [geolocation, setGeoLocation] = useState({ latitude: null, longitude: null });
    const [geolocationGMS, setGeoLocationGMS] = useState({ latitude: '', longitude: '' });
    const [item, setItem] = useState(state);
    const [selectedValue, setSelectedValue] = useState('posit');
    const descricao = localStorage.getItem('username');
    const [guiaComandoState, setGuiaComandoState] = useState(false);

    const fetchGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude.toFixed(6);
                    const longitude = position.coords.longitude.toFixed(6);
                    setGeoLocation({ latitude, longitude });
                    setGeoLocationGMS({
                        latitude: decimalDegreesToGMS(latitude, 'latitude'),
                        longitude: decimalDegreesToGMS(longitude, 'longitude')
                    });
                },
                error => {
                    console.error('Error obtaining geolocation', error);
                    alert('Unable to obtain your location. Please check your permissions.');
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser');
            alert('Geolocation is not supported by your browser.');
        }
    };

    const decimalDegreesToGMS = (decimalDegrees, type) => {
        const absolute = Math.abs(decimalDegrees);
        const degrees = Math.floor(absolute);
        const minutesNotTruncated = (absolute - degrees) * 60;
        const minutes = Math.floor(minutesNotTruncated);
        const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);

        const direction = decimalDegrees >= 0
            ? (type === 'latitude' ? 'N' : 'E')
            : (type === 'latitude' ? 'S' : 'W');

        return `${degrees}°${minutes}'${seconds}"${direction}`;
    };

    useEffect(() => {

        fetchGeolocation();

        const interval = setInterval(() => {
        }, 60000);

        return () => clearInterval(interval);
    }, [state, navigate]);

    const now = new Date();

    // Get the current date in the format "YYYY-MM-DD"
    const currentDate = now.toISOString().split('T')[0];

    // Get the current time in the format "HH:MM"
    const currentHour = now.toTimeString().split(' ')[0].substring(0, 5);

    const [formData, setFormData] = useState({
        id_ocorrencia: item.id,
        data: currentDate,
        hora: currentHour,
        tipo: '',
        de: '',
        para: '',
        descricao: '',
        estou: '',
        localidade: '',
    });

    const [estouEm, setEstouEm] = useState('');

    const [pontosSituacao, setPontosSituacao] = useState({
        curso: false,
        resolucao: false,
        conclusao: false,
        finalizado: false,
    });

    const handleCheckboxChange = (event, setState) => {
        const { name, checked } = event.target;
        setState(prevState => ({ ...prevState, [name]: checked }));
    };

    const handlePontosSituacaoChange = (event) => {
        const { name, checked } = event.target;
        setPontosSituacao((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const [fogoVista, setFogoVista] = useState({
        fogoVista: false,
        semFogo: false,
    });

    const handleFogoVistaChange = (event) => {
        const { name, checked } = event.target;
        setFogoVista((prevState) => ({
            ...prevState, // Keep the previous selections
            [name]: checked, // Update the selected checkbox value
        }));
    };

    const [em, setEm] = useState({
        habitacoes: false,
        industria: false,
        comercio: false,
        outros: false,
    });

    const handleEmChange = (event) => {
        const { name, checked } = event.target;
        setEm((prevState) => ({
            ...prevState, // Keep the previous selections
            [name]: checked, // Update the selected checkbox value
        }));
    };

    const [emVeiculo, setEmVeiculo] = useState({
        rodoviario_ligeiro: false,
        rodoviarioLigeiroMercadorias: false,
        rodoviarioPesadoMercadorias: false,
        rodoviarioPesadosPassageiros: false,
        rodoviarioOutros: false
    });

    const handleEmVeiculoChange = (event) => {
        const { name, checked } = event.target;
        setEmVeiculo((prevState) => ({
            ...prevState, // Keep the previous selections
            [name]: checked, // Update the selected checkbox value
        }));
    };

    const [tipoEdificio, setTipoEdificio] = useState({
        unifamiliar: false,
        grandeAltura: false,
        utilidadePublica: false,
        hospitaLarEscola: false,
        militarSeguranca: false,
        outros: false,
    });

    const handleTipoEdificioChange = (event) => {
        const { name, checked } = event.target;
        setTipoEdificio((prevState) => ({
            ...prevState, // Keep the previous selections
            [name]: checked, // Update the selected checkbox value
        }));
    };

    const [pontosSensiveis, setPontosSensiveis] = useState({
        habitacoes: false,
        industria: false,
        comercio: false,
        outros: false,
    });

    const handlePontosSensiveisChange = (event) => {
        const { name, checked } = event.target;
        setPontosSensiveis((prevState) => ({
            ...prevState, // Keep the previous selections
            [name]: checked, // Update the selected checkbox value
        }));
    };

    const [propagacao, setPropagacao] = useState({
        horizontal: false,
        vertical: false,
    });

    const handlePropagacaoChange = (event) => {
        const { name, checked } = event.target;
        setPropagacao((prevState) => ({
            ...prevState, // Keep the previous selections
            [name]: checked, // Update the selected checkbox value
        }));
    };

    const [faco, setFaco] = useState({
        reconhecimento: false,
        estrategiaDefensiva: false,
        estrategiaOfensiva: false,
        estabelecimentoMeiosAcao: false,
        salvamentos: false,
        rescaldo: false,
        vigilancia: false,
        protecaoExposicoes: false,
    });

    const handleFacoChange = (event) => {
        const { name, checked } = event.target;
        setFaco((prevState) => ({
            ...prevState, // Keep the previous selections
            [name]: checked, // Update the selected checkbox value
        }));
    };

    const [solicito, setSolicito] = useState({
        vuciVECI: false,
        vuciVECIQt: '',
        vttuVALE: false,
        vttuVALEQt: '',
        veVP: false,
        veVPQt: ''
    });

    const handleSolicitoChange = (name, value) => {
        setSolicito((prevSolicito) => ({
            ...prevSolicito,
            [name]: value
        }));
    };

    const [cos, setCOS] = useState({
        categoriaNome: '',
        designacaoCOS: '',
        numMecanografico: ''
    });

    const handleCOSChange = (name, value) => {
        setCOS((prevCOS) => ({
            ...prevCOS,
            [name]: value
        }));
    };

    const [elementoComando, setElementoComando] = useState({
        elementoComando: false,
    });

    const handleElementoComandoChange = (event) => {
        const { name, checked } = event.target;
        setElementoComando((prevState) => ({
            ...prevState, // Keep the previous selections
            [name]: checked, // Update the selected checkbox value
        }));
    };

    const [tipoCarga, setTipoCarga] = useState({
        tipoCarga: '',
    });

    const handleTipoCargaChange = (name, value) => {
        setTipoCarga((prevTipoCarga) => ({
            ...prevTipoCarga,
            [name]: value
        }));
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle change
    const handleDropdownChange = (event) => {
        setSelectedValue(event.target.value);
        formData.tipo = String(event.target.value)
        console.log(event.target.value)
    };

    // Function to dynamically update descricao string
    const getDescriptionFromState = (state, descriptions) => {
        return Object.keys(state)
            .filter((key) => state[key])
            .map((key) => descriptions[key])
            .join(', ');
    };

    const buildDescricao = (item, geolocationGMS, descricaoSections, cos) => {
        let descricao = `Estou em ${item.morada}, nº ${item.requestList[0].numero_morada}, freguesia de ${item.localidade}
Latitude N: ${geolocationGMS.latitude}, Longitude W: ${geolocationGMS.longitude}`;

        descricaoSections.forEach((section) => {
            if (section.value !== '') {
                descricao += `\n${section.label}: ${section.value}`;
            }
        });

        // Add COS details to the description if they have values
        if (cos && (cos.categoriaNome || cos.designacaoCOS || cos.numMecanografico)) {
            descricao += `\nCOS:`;
            if (cos.categoriaNome) descricao += ` ${cos.categoriaNome}`;
            if (cos.numMecanografico) descricao += `, Nº Mecanográfico: ${cos.numMecanografico}`;
            if (cos.designacaoCOS) descricao += `
Designação COS: ${cos.designacaoCOS}`;
        }

        return descricao;
    };

    useEffect(() => {
        console.log(item);

        if (['2101', '2111', '2115', '2127', '2129'].includes(item.classificacao)) {
            const pontosDescriptions = {
                curso: "em curso",
                resolucao: "em resolução",
                conclusao: "em conclusão",
                finalizado: "finalizado"
            };

            const fogoDescriptions = {
                fogoVista: "com fogo à vista",
                semFogo: "sem fogo à vista",
            };

            const tipoDescriptions = {
                habitacoes: "em Habitação",
                industria: "em Indústria",
                comercio: "em Comércio",
                outros: "em Outro tipo",
            };

            const tipoEdificioDescriptions = {
                unifamiliar: "Unifamiliar",
                grandeAltura: "Edifício de Grande Altura",
                utilidadePublica: "Edifício de Utilidade Pública",
                hospitaLarEscola: "Hospital / Lar / Escola",
                militarSeguranca: "Militar / Segurança",
                outros: "Outros",
            };

            const pontosSensiveisDescriptions = {
                habitacoes: "Habitação",
                industria: "Indústria",
                comercio: "Comércio",
                outros: "Outro tipo",
            };

            const propagacaoDescriptions = {
                horizontal: "com Progapagção horizontal",
                vertical: "com propagação vertical",
            };

            const facoDescriptions = {
                reconhecimento: "Reconhecimento",
                estrategiaDefensiva: "Estratégia Defensiva",
                estrategiaOfensiva: "Estratégia Ofensiva",
                estabelecimentoMeiosAcao: "Estabelecimento de meios de ação",
                salvamentos: "Salvamentos",
                rescaldo: "Rescaldo",
                vigilancia: "Vigilância",
                protecaoExposicoes: "Proteção de exposições",
            };

            const solicitoDescriptions = {
                vuciVECI: "VUCI / VECI",
                vttuVALE: "VTTU / VALE",
                veVP: "VE / VP",
                absc: "ABSC",
                vmer: "VMER",
                outros: ""
            };

            const elementoComandoDescriptions = {
                elementoComando: "Elemento de comando para o local",
            };

            const descricaoSections = [
                {
                    label: "Ponto de situação actual",
                    value: `Incêndio em ${item.desc_classificacao} ${getDescriptionFromState(pontosSituacao, pontosDescriptions)} ${getDescriptionFromState(fogoVista, fogoDescriptions)} ${getDescriptionFromState(propagacao, propagacaoDescriptions)} ${getDescriptionFromState(em, tipoDescriptions)} ${getDescriptionFromState(tipoEdificio, tipoEdificioDescriptions)}`
                },
                {
                    label: "Pontos sensíveis",
                    value: getDescriptionFromState(pontosSensiveis, pontosSensiveisDescriptions)
                },
                {
                    label: "Faço",
                    value: getDescriptionFromState(faco, facoDescriptions)
                },
                ...(Object.keys(solicito).some(key => solicito[key] && !key.includes('Qt')) ? [{
                    label: "Solicito",
                    value: getDescriptionFromState(solicito, solicitoDescriptions)
                        .split(', ')
                        .map((desc, index) => {
                            const qtKey = `${Object.keys(solicito)[index]}Qt`;
                            const quantity = solicito[qtKey];
                
                            // If quantity exists and is not undefined or empty, append it to the description
                            if (quantity !== undefined && quantity !== '') {
                                return `${desc}: ${quantity}`;
                            }
                            return desc; // If no quantity, just return the description itself
                        })
                        .filter((desc) => desc !== '') // Filter out empty entries
                        .join(', ') // Join with a comma separating the descriptions
                }] : []),
                {
                    label: "Solicito Elemento Comando",
                    value: getDescriptionFromState(elementoComando, elementoComandoDescriptions)
                }
            ];

            console.log(cos.categoriaNome)

            const updatedDescricao = buildDescricao(item, geolocationGMS, descricaoSections, cos);

            setFormData((prevState) => ({
                ...prevState,
                descricao: updatedDescricao
            }));
        }

        if (item.classificacao === '2301') {
            const tipoVeiculoDescriptions = {
                rodoviario_ligeiro: "em Veículo ligeiro",
                rodoviarioLigeiroMercadorias: "em Veículo ligeiro de mercadorias",
                rodoviarioPesadoMercadorias: "em Veículo pesado de mercadorias",
                rodoviarioPesadosPassageiros: "em Veículo pesado de passageiros",
                rodoviarioOutros: "em outro tipo de Veículos"
            };

            const descricaoSections = [
                {
                    label: "Ponto de situação actual",
                    //value: `Incêndio em ${item.desc_classificacao} ${getDescriptionFromState(pontosSituacao, pontosDescriptions)} ${getDescriptionFromState(emVeiculo, tipoVeiculoDescriptions)}`
                },
                {
                    label: "Tipo de Carga",
                    value: tipoCarga.tipoCarga
                }
            ];

            const updatedDescricao = buildDescricao(item, geolocationGMS, descricaoSections);

            setFormData((prevState) => ({
                ...prevState,
                descricao: updatedDescricao
            }));
        }

    }, [estouEm, pontosSituacao, fogoVista, geolocationGMS, em, emVeiculo, tipoEdificio, pontosSensiveis, propagacao, faco, solicito, elementoComando, tipoCarga, cos]);


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'https://preventech-proxy-service.onrender.com/api/timetape/postTimeTapeByIncidentID/';

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            console.log('Response:', response.data);
            // Check if the response is successful
            if (response.data && response.data.status === 'success') {
                // If the response is OK, navigate back to the previous page
                navigate(-1);  // This will take the user back to the previous page
            } else {
                // Handle any other cases (like errors in the response)
                console.error('Unexpected response:', response.data);
                alert('Aconteceu um erro ao inserir a informação. Tente mais tarde.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Aconteceu um erro ao inserir a informação. Tente mais tarde.');
        }
    };

    const handleBackClick = () => {
        window.history.back(); // Go back to the previous page
    };

    const isMobile = window.innerWidth <= 768;

    return (

        <div>
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: "#A0A0A0" }}>
                    <IconButton edge="start" color="inherit" onClick={handleBackClick} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Fita de Tempo
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={styles.container}>

                <form onSubmit={handleSubmit}>

                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        {/* Vertical Column with "Ocorrência" */}
                        <div style={{
                            width: '25px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            writingMode: 'vertical-lr',
                            textAlign: 'center',
                            backgroundColor: '#99CCFF',  // Optional background for visual separation
                            padding: '10px',
                            fontWeight: 'bold',
                            flexShrink: 0,    // Prevents the column from shrinking,
                            marginBottom: "25px",
                            transform: 'rotate(180deg)'
                        }}>
                            Ocorrência
                        </div>

                        {/* Event Form */}
                        <div className="event-form" style={{ flexGrow: 1 }}>
                            <section className="header-section">
                                <div style={{
                                    ...styles.rowInfoContainer,
                                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' // Adjust columns based on screen size
                                }}>
                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>Data: </span>
                                        <TextField style={styles.input} value={formData.data} disabled />
                                    </div>

                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>Hora: </span>
                                        <TextField style={styles.input} value={formData.hora} disabled />
                                    </div>

                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>Número Ocorrência: </span>
                                        <TextField style={styles.input} value={item.id} disabled />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        {/* Vertical Column with "Ocorrência" */}
                        <div style={{
                            width: '25px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            writingMode: 'vertical-lr',
                            textAlign: 'center',
                            backgroundColor: '#99CCFF',  // Optional background for visual separation
                            padding: '10px',
                            fontWeight: 'bold',
                            flexShrink: 0,    // Prevents the column from shrinking,
                            marginBottom: "25px",
                            transform: 'rotate(180deg)'
                        }}>
                            Comunicação
                        </div>

                        {/* Event Form */}
                        <div className="event-form" style={{ flexGrow: 1 }}>
                            <section className="header-section">
                                <div style={{
                                    ...styles.rowInfoContainer,
                                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' // Adjust columns based on screen size
                                }}>
                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>Tipo: </span>
                                        <FormControl fullWidth style={styles.input}>
                                            <InputLabel id="dropdown-label" >Tipo</InputLabel>
                                            <Select
                                                labelId="dropdown-label"
                                                id="dropdown"
                                                name='tipo'
                                                value={selectedValue}
                                                label="Select an Option"
                                                onChange={handleDropdownChange}
                                            >
                                                <MenuItem value={'comunicacao'}>Comunicação</MenuItem>
                                                <MenuItem value={'posit'}>POSIT</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>De:</span>
                                        <TextField
                                            style={styles.input}
                                            type="text"
                                            name="de"
                                            value={descricao}
                                            disabled
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>

                                    <div style={styles.rowInfo}>
                                        <span style={styles.infoProp}>Para: </span>
                                        <TextField
                                            style={styles.input}
                                            type="text"
                                            name="para"
                                            value='SALOP'
                                            disabled
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>



                    <div style={styles.rowInfo}>
                        {(item.classificacao === '2101' || item.classificacao === '2111' || item.classificacao === '2115'
                            || item.classificacao === '2127' || item.classificacao === '2129'
                        ) && (
                                <IncendiosUrbanosComponent
                                    pontosSituacao={pontosSituacao}
                                    handleCheckboxChange={(e) => handleCheckboxChange(e, setPontosSituacao)}
                                    fogoVista={fogoVista}
                                    handleFogoVistaChange={handleFogoVistaChange}
                                    em={em}
                                    handleEmChange={handleEmChange}
                                    tipoEdificio={tipoEdificio}
                                    handleTipoEdificio={handleTipoEdificioChange}
                                    pontosSensiveis={pontosSensiveis}
                                    handlePontosSensiveis={handlePontosSensiveisChange}
                                    propagacao={propagacao}
                                    handlePropagacao={handlePropagacaoChange}
                                    faco={faco}
                                    handleFaco={handleFacoChange}
                                    solicito={solicito}
                                    handleSolicito={handleSolicitoChange}
                                    elementoComando={elementoComando}
                                    handleElementoComando={handleElementoComandoChange}
                                    cos={cos}
                                    handleCOS={handleCOSChange}
                                    geolocationGMS={geolocationGMS}
                                    estouEm={item.requestList[0].morada + ', nº' + item.requestList[0].numero_morada + ', ' + item.requestList[0].localidade_morada}
                                    setEstouEm={setEstouEm}
                                    localidade={item.localidade}
                                    handleChange={handleChange}
                                />
                            )}


                        {(item.classificacao === '2301')
                            && (
                                <IncendiosRodoviariosComponent
                                    pontosSituacao={pontosSituacao}
                                    handleCheckboxChange={handlePontosSituacaoChange}
                                    geolocationGMS={geolocationGMS}
                                    estouEm={item.morada}
                                    setEstouEm={setEstouEm}
                                    localidade={item.localidade}
                                    handleChange={handleChange}
                                    emVeiculo={emVeiculo}
                                    handleEmVeiculoChange={handleEmVeiculoChange}
                                    tipoCarga={tipoCarga}
                                    handleTipoCargaChange={handleTipoCargaChange}
                                />
                            )}
                    </div>

                    <div style={styles.rowInfo}>
                        <span style={styles.infoProp}>Descrição: </span>
                        <TextField
                            style={styles.input}
                            type="text"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            multiline
                            rows={10}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div style={styles.rowButton}>
                        <Button type="submit" style={styles.button_SAVE}>
                            <p style={styles.buttonText}>Guardar</p>
                        </Button>
                    </div>
                </form>
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
        marginLeft: 25,
        marginRight: 25,
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch', // Ensure children take full width
    },
    content: {
        flex: 1,
        marginLeft: 25,
    },
    item: {
        display: 'flex', // Add this to make the item a flex container
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 20,
        borderColor: '#C0C0C0',
        border: '1px solid #C0C0C0',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 15
    },
    title: {
        fontSize: 24,
        paddingBottom: 5,
    },
    rowButton: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 275,
    },
    description: {
        fontSize: 18,
        paddingBottom: 5,
    },
    vehicle: {
        marginTop: '5',
        fontSize: 14,
        fontWeight: 'bold'
    },
    rightContainer: {
        flex: 1,
        alignItems: 'right',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    timestamp: {
        marginRight: 25,
        marginLeft: 25,
        color: '#888',
        fontSize: 16
    },
    estado: {
        fontWeight: 'bold',
        fontSize: 16
    },
    image: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
    },
    button_POSIT: {
        width: "100%",
        height: 75,
        backgroundColor: '#FF6666',
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000', // Set the text color to white
        fontSize: 18,
        fontWeight: 'bold',
    },
    dropdown: {
        width: "85%",
        height: 75,
        fontSize: 16,
        padding: 5,
    },
    divider: {
        flex: 1,
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25
    },
    input: {
        height: 50,
        width: '100%', // Full width of parent container
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginLeft: 0, // Align to the right edge
        marginRight: 15, // Consistent margin
        marginTop: 15
    },
    row: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    rowInfo: {
        flexDirection: 'row',
        marginBottom: 25,
        paddingLeft: 0
    },
    infoProp: {
        fontSize: 18,
        paddingBottom: 10,
        textAlign: "right", // Align text to the right
        fontWeight: "bold",
        marginRight: 15, // Consistent margin to align with input fields
        width: 200, // Set a width to ensure consistent alignment
    },
    info: {
        fontSize: 16,
        paddingBottom: 10,
        paddingLeft: 5,
        textAlign: "center",
        color: "grey",
        marginRight: 20,
    },
    button_SAVE: {
        width: "100%",
        height: 75,
        backgroundColor: '#63bf3c',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25, // Adjusted for consistent spacing
    },
};

export default NovoPosit