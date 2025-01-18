import React from 'react';
import { Checkbox } from '@mui/material';

const IncendioRequestComponent = ({
    emergencies
}) => {
    return (
        <div>
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
                    transform: 'rotate(180deg)',
                    marginBottom: '25px'
                }}>
                    Tipo Ocorrência
                </div>

                {/* Main form section */}
                <div className="event-form" style={{ flexGrow: 1 }}>
                    <section className="header-section">
                        <div style={styles.rowInfoContainer1}>
                            <div style={styles.rowInfo}>
                                <div style={styles.info}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Urbano / Industrial</span>
                                        <Checkbox
                                            name="urbanoIndustrial"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].i_ti_urbano_industrial === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Transportes</span>
                                        <Checkbox
                                            name="transportes"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].i_ti_transportes === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Rural / Florestal</span>
                                        <Checkbox
                                            name="ruralFlorestal"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].i_ti_rural_florestal === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Outro: </span>
                                        <span style={styles.info}>{emergencies[0].requestList[0].i_ti_outro_desc}</span>
                                    </label>
                                </div>
                            </div>
                            <div style={styles.rowInfo}>
                                <div style={styles.info}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Fumo à vista</span>
                                        <Checkbox
                                            name="fumoVista"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].i_ti_fumo_vista === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Fumo e Fogo à vista</span>
                                        <Checkbox
                                            name="fumoFogoVista"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].i_ti_fumo_fogo_vista === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Pessoas no Interior</span>
                                        <Checkbox
                                            name="pessoasInterior"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].i_ti_pessoas_int === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Edifício em Altura</span>
                                        <Checkbox
                                            name="abalroamentoFerroviario"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].i_ti_edificio_altura === 1}
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
                    Observações
                </div>

                {/* Main form section */}
                <div className="event-form" style={{ flexGrow: 1 }}>
                    <section className="header-section">
                        <div style={styles.rowInfoContainer1}>
                            <div style={styles.rowInfo}>
                                <div style={styles.info}>
                                    {/* Estado Consciência with checkboxes */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>Combustível a Arder: </span>
                                            <span style={styles.info}>{emergencies[0].requestList[0].i_combustivel_arder}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.rowInfo}>
                                <div style={styles.info}>
                                    {/* Estado Consciência with checkboxes */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>Existência de Vítimas: </span>
                                            <span style={styles.info}>{emergencies[0].requestList[0].i_existe_vitimas}</span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>Nº de Vítimas: </span>
                                            <span style={styles.info}>{emergencies[0].requestList[0].i_num_vitimas}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.rowInfo}>
                                <div style={styles.info}>
                                    {/* Estado Consciência with checkboxes */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>Extensão e Localização do Fogo : </span>
                                            <span style={styles.info}>{emergencies[0].requestList[0].i_extensao_loc_fogo}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.rowInfo}>
                                <div style={styles.info}>
                                    {/* Estado Consciência with checkboxes */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>Outras Situações : </span>
                                            <span style={styles.info}>{emergencies[0].requestList[0].i_outra_situacao}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.rowInfo}>
                                <div style={styles.info}>
                                    {/* Estado Consciência with checkboxes */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>Observações : </span>
                                            <span style={styles.info}>{emergencies[0].requestList[0].observacoes}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
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
    rowInfoContainer1: {
        display: 'grid',
        gridTemplateColumns: '1fr', // Two columns for desktop view
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
        alignItems: 'center',
        gap: '10px'
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
        display: 'flex',
        flexWrap: 'wrap', // Allow wrapping for smaller screens
        gap: '15px',
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

export default IncendioRequestComponent;
