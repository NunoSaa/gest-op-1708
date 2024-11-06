import React, { useState, useEffect } from 'react';
import { Button, Chip, Stack, Checkbox } from '@mui/material';



const AcidenteRequestComponent = ({
    emergencies
}) => {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
                {/* Vertical "Vítima" label */}
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
                    transform: 'rotate(180deg)',
                    marginBottom: '25px'
                }}>
                    Tipo Ocorrência
                </div>

                {/* Main form section */}
                <div className="event-form" style={{ flexGrow: 1 }}>
                    <section className="header-section">
                        <div style={styles.rowInfoContainer}>

                            {/* Estado Consciência with checkboxes */}
                            <div style={styles.rowInfo}>
                                <div style={styles.info}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Colisão</span>
                                        <Checkbox
                                            name="colisão"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].a_to_colisao === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Inconsciente</span>
                                        <Checkbox
                                            name="inconsciente"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].eph_ec_inconsciente === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Não Respira</span>
                                        <Checkbox
                                            name="naoRespira"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].eph_ec_nrespira === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Respira</span>
                                        <Checkbox
                                            name="respira"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].eph_ec_respira === 1}
                                        />
                                    </label>
                                </div>
                                <div style={styles.info}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Ligeiro</span>
                                        <Checkbox
                                            name="colisão"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].a_to_ligeiro === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Inconsciente</span>
                                        <Checkbox
                                            name="inconsciente"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].eph_ec_inconsciente === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Não Respira</span>
                                        <Checkbox
                                            name="naoRespira"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].eph_ec_nrespira === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Respira</span>
                                        <Checkbox
                                            name="respira"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].eph_ec_respira === 1}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'stretch' }}>
                {/* Vertical "Vítima" label */}
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
                    transform: 'rotate(180deg)',
                    marginBottom: '25px'
                }}>
                    Meios / Apoios
                </div>

                {/* Main form section */}
                <div className="event-form" style={{ flexGrow: 1 }}>
                    <section className="header-section">
                        <div style={styles.rowInfoContainer}>
                            {/* Estado Consciência with checkboxes */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span>VMER</span>
                                    <Checkbox
                                        name="vmer"
                                        className="custom-checkbox"
                                        checked={emergencies[0].requestList[0].eph_apoio_vmer}
                                    />
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span>PSP</span>
                                    <Checkbox
                                        name="psp"
                                        className="custom-checkbox"
                                        checked={emergencies[0].requestList[0].eph_apoio_psp}
                                    />
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span>Mota Emergência Médica</span>
                                    <Checkbox
                                        name="naoRespira"
                                        className="custom-checkbox"
                                        checked={emergencies[0].requestList[0].eph_apoio_mem}
                                    />
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span>GNR</span>
                                    <Checkbox
                                        name="respira"
                                        className="custom-checkbox"
                                        checked={emergencies[0].requestList[0].eph_apoio_gnr}
                                    />
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span>Outro</span>
                                    <Checkbox
                                        name="respira"
                                        className="custom-checkbox"
                                        checked={emergencies[0].requestList[0].eph_apoio_outro}
                                    />
                                </label>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>

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

export default AcidenteRequestComponent;
