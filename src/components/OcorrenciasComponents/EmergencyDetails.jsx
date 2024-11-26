import React, { useState, useEffect } from 'react';
import { Button, Chip, Stack, Checkbox } from '@mui/material';
import EPH_RequestComponent from './EPH_RequestComponent';
import AcidenteRequestComponent from './AcidenteRequestComponent';


const EmergencyDetails = ({
    item,
    currentTime,
    isChegadaLocalSet,
    isSaidaLocalSet,
    chegadaLocalTime,
    saidaLocalTime,
    isChegadaUnidadeSet,
    chegadaUnidadeTime,
    handleSetTimeChegadaLocal,
    handleSetTimeSaidaLocal,
    handleSetTimeChegadaUnidade,
    handleDisponivel,
    isDisponivel,
    openMaps,
    navigate,
    descricao,
    viaturas,
    isChegadaUnidadeHospSet,
    handleSetTimeChegadaUnidadeHosp,
    isChegadaHospSet,
    handleFinalizarOcorrencia,
    emergencies
}) => {

    const isInserirKmsDisabled = viaturas !== descricao;
    const incidentReport = JSON.parse(localStorage.getItem('IncidentReport'));
    const emergency = JSON.parse(localStorage.getItem('EmergencyData'));

    console.log("emergencies = ", emergencies)

    const vehicles = emergency[0].viaturas || [];
    const filteredVehicles = vehicles.filter(
        (vehicle) => vehicle.descricao === descricao
    );

    const [kmFim, setKmFim] = useState(
        filteredVehicles.length > 0 && filteredVehicles[0].km_fim
    );

    useEffect(() => {
        // Split the viaturas string by comma and remove extra spaces
        const viaturasArray = viaturas.split(',').map(item => item.trim());

        // Check if the descricao matches any value in the viaturas array
        const isMatch = viaturasArray.some(viatura => viatura === descricao);

        console.log(viaturasArray);

        if (!isMatch) {

            alert('Aviso: O Username de login não corresponde aos Veículos associado a esta Ocorrência');
        }
    }, [descricao, viaturas]);

    return (
        <div style={styles.center}>
            <div style={styles.container}>
                <div>
                    <h3 style={styles.title}>{item.desc_classificacao}</h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                    <div style={{
                        width: '25px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        writingMode: 'vertical-lr',
                        textAlign: 'center',
                        backgroundColor: '#99CCFF',
                        padding: '10px',
                        fontWeight: 'bold',
                        flexShrink: 0,
                        marginBottom: "25px",
                        transform: 'rotate(180deg)'
                    }}>
                        Ocorrência
                    </div>

                    {/* Event Form */}
                    <div className="event-form" style={{ flexGrow: 1 }}>
                        <section className="header-section">
                            <div style={styles.rowInfoContainer}>
                                <div style={styles.rowInfo}>
                                    <span style={styles.infoProp}>Data: </span>
                                    <span style={styles.info}>{item.data_hora_alerta}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.infoProp}>Classificação: </span>
                                    <span style={styles.info}>{item.desc_classificacao}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.infoProp}>Estado: </span>
                                    <Chip
                                        label={item.estado}
                                        style={{
                                            fontSize: 16,
                                            color: "black",
                                            backgroundColor: item.cor_estado,
                                        }}
                                    />
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.infoProp}>Número de elementos: </span>
                                    <span style={styles.info}>{item.n_bombeiros}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.infoProp}>Veículos: </span>
                                    <span style={styles.infoViaturas}>{viaturas}</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                    <div style={{
                        width: '25px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        writingMode: 'vertical-lr',
                        textAlign: 'center',
                        backgroundColor: '#99CCFF',
                        padding: '10px',
                        fontWeight: 'bold',
                        flexShrink: 0,
                        marginBottom: "25px",
                        transform: 'rotate(180deg)'
                    }}>
                        Local
                    </div>

                    <div className="event-form" style={{ flexGrow: 1 }}>
                        <section className="header-section">
                            <div style={styles.rowInfoContainer}>
                                <div style={styles.rowInfo}>
                                    <span style={styles.infoProp}>Local: </span>
                                    <span style={styles.info}>{item.morada}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.infoProp}>Localidade: </span>
                                    <span style={styles.info}>{item.localidade_morada}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.infoProp}>Freguesia: </span>
                                    <span style={styles.info}>{item.localidade}</span>
                                </div>
                                <div style={styles.rowInfo}>
                                    <span style={styles.infoProp}>Ponto de Referência: </span>
                                    <span style={styles.info}>{item.ponto_referencia}</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Vitima */}
                {emergencies?.[0]?.requestList?.[0]?.tipo_pedido === "emergenciaph" && (
                    <EPH_RequestComponent emergencies={emergencies} />
                )}

                {/* Vitima */}
                {emergencies?.[0]?.requestList?.[0]?.tipo_pedido === "acidente" && (
                    <AcidenteRequestComponent emergencies={emergencies} />
                )}

                <div style={styles.row}>
                    <Button title="Localizar Trajecto" style={styles.button_LocTrajeto} onClick={openMaps}>
                        <p style={styles.buttonText}>Localizar Trajecto</p>
                    </Button>
                </div>

                <div style={styles.row}>
                    <Button style={styles.button_ChegadaLocal} onClick={handleSetTimeChegadaLocal} disabled={isChegadaLocalSet}>
                        <p style={{ ...styles.buttonText, marginRight: '5px' }}>Chegada ao Local</p>
                        <p style={styles.buttonText}>{isChegadaLocalSet ? chegadaLocalTime : currentTime}</p>
                    </Button>

                    <Button style={styles.button_POSIT} onClick={() => navigate('/fitaTempo', { state: item })}>
                        <p style={styles.buttonText}>POSIT</p>
                        <p style={styles.buttonTextPosit}>.</p>
                    </Button>
                </div>

                <div style={styles.row}>
                    <Button style={styles.button_SaidaLocal} onClick={handleSetTimeSaidaLocal} disabled={isSaidaLocalSet}>
                        <p style={{ ...styles.buttonText, marginRight: '5px' }}>Saída do Local </p>
                        <p style={styles.buttonText}>{isSaidaLocalSet ? saidaLocalTime : currentTime}</p>
                    </Button>

                    <Button style={styles.button_Fotos} onClick={() => navigate('/takePicturePosit', { state: item })}>
                        <p style={styles.buttonText}>Anexar Fotos</p>
                        <p style={styles.buttonTextOther}>.</p>
                    </Button>
                </div>

                {!['ABSC01', 'ABSC02', 'ABSC03', 'ABSC04', 'ABSC09', 'VOPE06', 'USER_ADMIN'].includes(descricao) && (
                    <>
                        <div style={styles.row}>

                            <div style={styles.buttonPlaceholder}></div>

                            <Button style={styles.button_InserirKms} onClick={() => navigate('/inserirKms', { state: item })} disabled={isInserirKmsDisabled}>
                                <p style={styles.buttonText}>Inserir Km's Veículo</p>
                                <p style={styles.buttonTextOther}>.</p>
                            </Button>
                        </div>
                    </>
                )}

                {['ABSC01', 'ABSC02', 'ABSC03', 'ABSC04','ABSC09', 'VOPE06', 'USER_ADMIN'].includes(descricao) && (
                    <>
                        <div style={styles.row}>
                            <Button style={styles.button_ChegadaUnidadeHosp} onClick={handleSetTimeChegadaUnidadeHosp} disabled={isChegadaUnidadeHospSet}>
                                <p style={{ ...styles.buttonText, marginRight: '5px' }}>Chegada à Unidade Hospitalar</p>
                            </Button>

                            <Button style={styles.button_VerbeteInem} onClick={() => navigate('/verbeteINEM', { state: item })}>
                                <p style={styles.buttonText}>Verbete INEM</p>
                                <p style={styles.buttonTextOther}>.</p>
                            </Button>
                        </div>

                        <div style={styles.row}>
                            <Button style={styles.button_Disponivel} onClick={handleDisponivel} disabled={isDisponivel}>
                                <p style={{ ...styles.buttonText, marginRight: '5px' }}>Disponível</p>
                            </Button>
                            <Button style={styles.button_InserirKms} onClick={() => navigate('/inserirKms', { state: item })} disabled={isInserirKmsDisabled}>
                                <p style={styles.buttonText}>Inserir Km's Veículo</p>
                                <p style={styles.buttonTextOther}>.</p>
                            </Button>
                        </div>
                    </>
                )}

                <div style={styles.row}>
                    <Button style={styles.button_ChegadaUnidade} onClick={handleSetTimeChegadaUnidade} disabled={isChegadaUnidadeSet}>
                        <p style={{ ...styles.buttonText, marginRight: '5px' }}>Chegada à Unidade</p>
                        <p style={styles.buttonText}>{isChegadaUnidadeSet ? chegadaUnidadeTime : currentTime}</p>
                    </Button>

                    <Button style={styles.button_RelatorioFinal} onClick={() => navigate('/relatorioFinal', { state: item })}>
                        <p style={styles.buttonText}>Finalizar Relatório</p>
                        <p style={styles.buttonTextOther}>.</p>
                    </Button>
                </div>

                <div style={styles.row}>
                    <Button
                        title="Finalizar Ocorrência"
                        style={styles.button_FimOcorrencia}
                        onClick={handleFinalizarOcorrencia}>
                        <p style={styles.buttonText}>Finalizar Ocorrência</p>
                    </Button>
                </div>
            </div>
        </div >
    );
};

const styles = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',  // Adjust this height for full-screen alignment
    },
    container: {
        backgroundColor: "white",
        padding: 20,
        boxSizing: 'border-box',
        width: '100%',          // Set a max width for desktop
        maxWidth: '1200px',
        borderRadius: 10,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    time: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        marginBottom: 5,
        fontSize: 13,
    },
    buttonTextOther: {
        color: '#A0A0A0',
        marginBottom: 5,
        fontSize: 13,
    },
    buttonTextPosit: {
        color: '#FF6666',
        marginBottom: 5,
        fontSize: 13,
    },
    rowInfoContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Two columns for desktop view
        gap: '10px', // Space between grid items
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 15,
        flexWrap: 'wrap',
    },
    rowInfo: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: 5,
        paddingLeft: 25,
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    rowKmsFinais: {
        flexDirection: 'row',
        marginTop: 30,
        paddingLeft: 25,
        paddingRight: 25
    },
    button_ChegadaLocal: {
        width: "48%",        // Set the width to adjust for desktop
        height: 75,
        backgroundColor: '#FF0000',
        borderRadius: 10,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_SaidaLocal: {
        width: "48%",
        height: 75,
        backgroundColor: '#FF8000',
        borderRadius: 10,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_ChegadaUnidade: {
        width: "48%",
        height: 75,
        backgroundColor: '#0BAB00',
        borderRadius: 10,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_ChegadaUnidadeHosp: {
        width: "48%",
        height: 75,
        backgroundColor: '#e5c605',
        borderRadius: 10,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_Disponivel: {
        width: "48%",
        height: 75,
        backgroundColor: '#1cbdda',
        borderRadius: 10,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPlaceholder: {
        width: "48%",     // Matches button width to create equivalent left space
    },
    button_VerbeteInem: {
        width: "45%",
        height: 75,
        backgroundColor: '#0794cc',
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    button_Fotos: {
        width: "45%",
        height: 75,
        backgroundColor: '#A0A0A0',
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    button_RelatorioFinal: {
        width: "45%",
        height: 75,
        backgroundColor: '#0004ff',
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    button_POSIT: {
        width: "45%",
        height: 75,
        backgroundColor: '#FF6666',
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginLeft: 15,
    },
    button_LocTrajeto: {
        width: "100%",
        height: "10%",
        backgroundColor: '#3399FF',
        padding: 20,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 20,
    },
    button_FimOcorrencia: {
        width: "100%",
        height: "10%",
        backgroundColor: '#076812',
        padding: 20,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 20,
    },
    button_Inserir: {
        width: "30%",
        height: 50,
        backgroundColor: '#A0A0A0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_InserirKms: {
        width: "45%",
        height: 75,
        backgroundColor: '#4c33ff',
        borderRadius: 10,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15 // Matches the marginLeft in button_VerbeteInem
    },
    title: {
        fontSize: 24,
        paddingBottom: 10,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 35
    },
    infoProp: {
        fontSize: 18,
        paddingBottom: 10,
        textAlign: "center",
        fontWeight: "bold",
        marginRight: 5,
    },
    info: {
        fontSize: 16,
        paddingBottom: 10,
        paddingLeft: 5,
        textAlign: "center",
        color: "grey",
        marginRight: 20,
    },
    infoViaturas: {
        fontSize: 16,
        paddingBottom: 10,
        paddingLeft: 5,
        textAlign: "center",
        color: "grey",
        gap: 10,
    },
    input: {
        height: 50,
        width: "39%",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginLeft: 15,
        marginRight: 15
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        width: '100%',
        // other styles as needed
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '25px',
        paddingLeft: 25,
        // other styles as needed
    },
    viatura: {
        marginRight: '10px',
        // other styles as needed
    },
};

export default EmergencyDetails;
