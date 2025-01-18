import React from 'react';
import { Checkbox } from '@mui/material';

const AcidenteRequestComponent = ({
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
                                        <span>Colisão</span>
                                        <Checkbox
                                            name="colisão"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].a_to_colisao === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Despiste</span>
                                        <Checkbox
                                            name="despiste"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].a_to_despiste === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Atropelamento</span>
                                        <Checkbox
                                            name="atropelamento"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].a_to_atropelamento === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Queda</span>
                                        <Checkbox
                                            name="queda"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].a_to_queda === 1}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div style={styles.rowInfo}>
                                <div style={styles.info}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Ligeiro</span>
                                        <Checkbox
                                            name="ligeiro"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].a_to_ligeiro === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Pesado</span>
                                        <Checkbox
                                            name="pesado"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].a_to_pesado === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Veículo 2 Rodas</span>
                                        <Checkbox
                                            name="veiculo2rodas"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].a_to_veiculo === 1}
                                        />
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span>Abalroamento Ferroviário</span>
                                        <Checkbox
                                            name="abalroamentoFerroviario"
                                            className="custom-checkbox"
                                            checked={emergencies[0].requestList[0].a_to_abalroamento_ferroviario === 1}
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
                    Complicações
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
                                            <span>Encarcerados</span>
                                            <Checkbox
                                                name="encarcerados"
                                                className="custom-checkbox"
                                                checked={emergencies[0].requestList[0].a_comp_encarcerados}
                                            />
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>Queda Ravina</span>
                                            <Checkbox
                                                name="quedaRavina"
                                                className="custom-checkbox"
                                                checked={emergencies[0].requestList[0].a_comp_incendio}
                                            />
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>Matérias Perigosas</span>
                                            <Checkbox
                                                name="materiasPerigosas"
                                                className="custom-checkbox"
                                                checked={emergencies[0].requestList[0].a_comp_materias_perigosas}
                                            />
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>Incêndio</span>
                                            <Checkbox
                                                name="incendio"
                                                className="custom-checkbox"
                                                checked={emergencies[0].requestList[0].a_comp_queda_ravina}
                                            />
                                        </label>
                                    </div>
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
                    Vitima
                </div>

                {/* Main form section */}
                <div className="event-form" style={{ flexGrow: 1 }}>
                    <section className="header-section">
                        {/* Estado Consciência with checkboxes */}
                        <div style={{ gap: '10px', alignItems: 'center' }}>

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
                                    Tipo Vítima
                                </div>

                                {/* Main form section */}
                                <div className="event-form">
                                    <section className="header-section">
                                        <div style={styles.rowInfoContainer1}>
                                            <div style={styles.rowInfo}>
                                                <div style={styles.info}>
                                                    {/* Estado Consciência with checkboxes */}
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>

                                                        {/* Sexo and Idade */}
                                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            <span style={styles.infoProp}>Sexo: </span>
                                                            <span style={styles.info}>{emergencies[0].requestList[0].a_sexo}</span>
                                                        </label>
                                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            <span style={styles.infoProp}>Idade: </span>
                                                            <span style={styles.info}>{emergencies[0].requestList[0].a_idade}</span>
                                                            <span style={styles.info}>{emergencies[0].requestList[0].a_idade_tipo}</span>
                                                        </label>
                                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            <span>Nº Viaturas Envolvidas: </span>
                                                            <span style={styles.info}>{emergencies[0].requestList[0].a_num_viaturas_envolvidas}</span>
                                                        </label>
                                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            <span>Nº Vitimas Envolvidas: </span>
                                                            <span style={styles.info}>{emergencies[0].requestList[0].a_num_vitimas_envolvidas}</span>
                                                        </label>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
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
                                Estado Consciência
                            </div>

                            {/* Main form section */}
                            <div className="event-form" style={{ flexGrow: 1 }}>
                                <section className="header-section">
                                    <div style={styles.rowInfoContainer1}>


                                        <div style={styles.rowInfo}>
                                            <div style={styles.info}>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <span>Consciente</span>
                                                    <Checkbox
                                                        name="encarcerados"
                                                        className="custom-checkbox"
                                                        checked={emergencies[0].requestList[0].a_comp_encarcerados}
                                                    />
                                                </label>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <span>Inconsciente</span>
                                                    <Checkbox
                                                        name="quedaRavina"
                                                        className="custom-checkbox"
                                                        checked={emergencies[0].requestList[0].a_comp_incendio}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        <div style={styles.rowInfo}>
                                            <div style={styles.info}>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <span>Respira</span>
                                                    <Checkbox
                                                        name="materiasPerigosas"
                                                        className="custom-checkbox"
                                                        checked={emergencies[0].requestList[0].a_comp_materias_perigosas}
                                                    />
                                                </label>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <span>Não Respira</span>
                                                    <Checkbox
                                                        name="incendio"
                                                        className="custom-checkbox"
                                                        checked={emergencies[0].requestList[0].a_comp_queda_ravina}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        <div style={styles.rowInfo}>
                                            <div style={styles.info}>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <span>Hemorragia</span>
                                                    <Checkbox
                                                        name="quedaRavina"
                                                        className="custom-checkbox"
                                                        checked={emergencies[0].requestList[0].a_comp_incendio}
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
                                Outros
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
                                                        <span>Outras Situações / Trauma: </span>
                                                        <span>{emergencies[0].requestList[0].a_outra_situacao}</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section >
                </div >
            </div >

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
                        <div style={styles.rowInfoContainer1}>
                            <div style={styles.rowInfo}>
                                <div style={styles.info}>
                                    {/* Estado Consciência with checkboxes */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>VMER</span>
                                            <Checkbox
                                                name="vmer"
                                                className="custom-checkbox"
                                                checked={emergencies[0].requestList[0].a_apoio_vmer}
                                            />
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>PSP</span>
                                            <Checkbox
                                                name="psp"
                                                className="custom-checkbox"
                                                checked={emergencies[0].requestList[0].a_apoio_psp}
                                            />
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>Mota Emergência Médica</span>
                                            <Checkbox
                                                name="naoRespira"
                                                className="custom-checkbox"
                                                checked={emergencies[0].requestList[0].a_apoio_mem}
                                            />
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>GNR</span>
                                            <Checkbox
                                                name="respira"
                                                className="custom-checkbox"
                                                checked={emergencies[0].requestList[0].a_apoio_gnr}
                                            />
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>Outro</span>
                                            <Checkbox
                                                name="respira"
                                                className="custom-checkbox"
                                                checked={emergencies[0].requestList[0].a_apoio_outro}
                                            />
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

export default AcidenteRequestComponent;
