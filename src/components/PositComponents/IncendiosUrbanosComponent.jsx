import React from 'react';
import { TextField, FormGroup, FormControlLabel, Checkbox, Card, CardContent, formControlClasses } from '@mui/material';

const IncendiosUrbanosComponent = ({
    pontosSituacao,
    handleCheckboxChange,
    fogoVista,
    handleFogoVistaChange,
    em,
    handleEmChange,
    tipoEdificio,
    handleTipoEdificio,
    pontosSensiveis,
    handlePontosSensiveis,
    propagacao,
    handlePropagacao,
    faco,
    handleFaco,
    solicito,
    handleSolicito,
    elementoComando,
    handleElementoComando,
    geolocationGMS,
    estouEm,
    setEstouEm,
    localidade,
    handleChange,
}) => {
    return (
        <div>
            <div style={styles.rowInfo}>
                <h2>ESTOU: </h2>
                <span style={styles.infoProp}>Estou em: </span>
                <TextField
                    style={styles.input}
                    type="text"
                    name="estou"
                    value={estouEm}
                    onChange={(e) => setEstouEm(e.target.value)}
                    variant="outlined"
                    fullWidth
                />
            </div>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Latitude N: </span>
                <TextField
                    style={styles.input}
                    type="text"
                    name="localidade"
                    value={geolocationGMS.latitude}
                    disabled
                    variant="outlined"
                    fullWidth
                />
            </div>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Longitude W: </span>
                <TextField
                    style={styles.input}
                    type="text"
                    name="localidade"
                    value={geolocationGMS.longitude}
                    disabled
                    variant="outlined"
                    fullWidth
                />
            </div>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Freguesia / Município: </span>
                <TextField
                    style={styles.input}
                    type="text"
                    name="localidade"
                    value={localidade}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                />
            </div>

            <h2>VEJO: </h2>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Pontos de Situação: </span>
                <FormGroup>
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={pontosSituacao.curso} onChange={handleCheckboxChange} name="curso" />}
                        label="Curso (Ativo)"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={pontosSituacao.resolucao} onChange={handleCheckboxChange} name="resolucao" />}
                        label="Resolução (Dominado)"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={pontosSituacao.conclusao} onChange={handleCheckboxChange} name="conclusao" />}
                        label="Conclusão (Rescaldo)"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={pontosSituacao.finalizado} onChange={handleCheckboxChange} name="finalizado" />}
                        label="Finalizado (Extinto)"
                    />
                </FormGroup>
            </div>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Com: </span>
                <FormGroup>
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={fogoVista.fogoVista} onChange={handleFogoVistaChange} name="fogoVista" />}
                        label="Fogo à vista"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={fogoVista.semFogo} onChange={handleFogoVistaChange} name="semFogo" />}
                        label="Sem Fogo à vista"
                    />
                </FormGroup>
            </div>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Propagação: </span>
                <FormGroup>
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={propagacao.horizontal} onChange={handlePropagacao} name="horizontal" />}
                        label="Horizontal"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={propagacao.vertical} onChange={handlePropagacao} name="vertical" />}
                        label="Vertical"
                    />
                </FormGroup>
            </div>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Em: </span>
                <FormGroup>
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={em.habitacoes} onChange={handleEmChange} name="habitacoes" />}
                        label="Habitações"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={em.industria} onChange={handleEmChange} name="industria" />}
                        label="Indústria"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={em.comercio} onChange={handleEmChange} name="comercio" />}
                        label="Comércio"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={em.outros} onChange={handleEmChange} name="outros" />}
                        label="Outros"
                    />
                </FormGroup>
            </div>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Tipo de Edifício: </span>
                <FormGroup>
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={tipoEdificio.unifamiliar} onChange={handleTipoEdificio} name="unifamiliar" />}
                        label="Unifamiliar"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={tipoEdificio.grandeAltura} onChange={handleTipoEdificio} name="grandeAltura" />}
                        label="Edifício de Grande Altura"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={tipoEdificio.utilidadePublica} onChange={handleTipoEdificio} name="utilidadePublica" />}
                        label="Utilidade Pública"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={tipoEdificio.hospitaLarEscola} onChange={handleTipoEdificio} name="hospitaLarEscola" />}
                        label="Hospital / Lar / Escola"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={tipoEdificio.militarSeguranca} onChange={handleTipoEdificio} name="militarSeguranca" />}
                        label="Militar / Segurança"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={tipoEdificio.outros} onChange={handleTipoEdificio} name="outros" />}
                        label="Outros"
                    />
                </FormGroup>
            </div>

            <div style={styles.rowInfo}>
                <span style={styles.infoProp}>Pontos Seníveis: </span>
                <FormGroup>
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={pontosSensiveis.habitacoes} onChange={handlePontosSensiveis} name="habitacoes" />}
                        label="Habitações"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={pontosSensiveis.industria} onChange={handlePontosSensiveis} name="industria" />}
                        label="Indústria"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={pontosSensiveis.comercio} onChange={handlePontosSensiveis} name="comercio" />}
                        label="Comércio"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={pontosSensiveis.outros} onChange={handlePontosSensiveis} name="outros" />}
                        label="Outros"
                    />
                </FormGroup>
            </div>

            <h2>FAÇO: </h2>

            <div style={styles.rowInfo}>
                <FormGroup>
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={faco.reconhcimento} onChange={handleFaco} name="reconhecimento" />}
                        label="Reconhecimento"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={faco.estrategiaDefensiva} onChange={handleFaco} name="estrategiaDefensiva" />}
                        label="Estratégia Defensiva"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={faco.estrategiaOfensiva} onChange={handleFaco} name="estrategiaOfensiva" />}
                        label="Estratégia Ofensiva"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={faco.estabelecimentoMeiosAcao} onChange={handleFaco} name="estabelecimentoMeiosAcao" />}
                        label="Estabelecimento de Meios de Acção"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={faco.salvamentos} onChange={handleFaco} name="salvamentos" />}
                        label="Salvamentos"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={faco.rescaldo} onChange={handleFaco} name="rescaldo" />}
                        label="Rescaldo"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={faco.vigilancia} onChange={handleFaco} name="vigilancia" />}
                        label="Vigilância"
                    />
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={faco.protecaoExposicoes} onChange={handleFaco} name="protecaoExposicoes" />}
                        label="Proteção de Exposições"
                    />
                </FormGroup>
            </div>

            <div style={styles.rowInfo}>
                <h2>SOLICITO: </h2>
                <div style={styles.solicitoContainer}>
                    <div style={styles.solicitoRow}>
                        <FormControlLabel
                            style={styles.formControlCheckbox}
                            control={<Checkbox checked={solicito.vuciVECI} onChange={(e) => handleSolicito('vuciVECI', e.target.checked)} name="vuciVECI" />}
                            label="VUCI / VECI"
                        />
                        <div style={styles.solicitoLabel}>Qt.</div>
                        <TextField
                            style={styles.solicitoInputDesc}
                            variant="outlined"
                            fullWidth
                            value={solicito.vuciVECIQt}
                            onChange={(e) => handleSolicito('vuciVECIQt', e.target.value)}
                        />
                    </div>
                    <div style={styles.solicitoRow}>
                        <FormControlLabel
                            style={styles.formControlCheckbox}
                            control={<Checkbox checked={solicito.vttuVALE} onChange={(e) => handleSolicito('vttuVALE', e.target.checked)} name="vttuVALE" />}
                            label="VTTU / VALE"
                        />
                        <div style={styles.solicitoLabel}>Qt.</div>
                        <TextField
                            style={styles.solicitoInputDesc}
                            variant="outlined"
                            fullWidth
                            value={solicito.vttuVALEQt}
                            onChange={(e) => handleSolicito('vttuVALEQt', e.target.value)}
                        />
                    </div>
                    <div style={styles.solicitoRow}>
                        <FormControlLabel
                            style={styles.formControlCheckbox}
                            control={<Checkbox checked={solicito.veVP} onChange={(e) => handleSolicito('veVP', e.target.checked)} name="veVP" />}
                            label="VE / VP"
                        />
                        <div style={styles.solicitoLabel}>Qt.</div>
                        <TextField
                            style={styles.solicitoInputDesc}
                            variant="outlined"
                            fullWidth
                            value={solicito.veVPQt}
                            onChange={(e) => handleSolicito('veVPQt', e.target.value)}
                        />
                    </div>
                    <div style={styles.solicitoRow}>
                        <FormControlLabel
                            style={styles.formControlCheckbox}
                            control={<Checkbox checked={solicito.absc} onChange={(e) => handleSolicito('absc', e.target.checked)} name="absc" />}
                            label="ABSC"
                        />
                        <div style={styles.solicitoLabel}>Qt.</div>
                        <TextField
                            style={styles.solicitoInputDesc}
                            variant="outlined"
                            fullWidth
                            value={solicito.abscQt}
                            onChange={(e) => handleSolicito('abscQt', e.target.value)}
                        />
                    </div>
                    <div style={styles.solicitoRow}>
                        <FormControlLabel
                            style={styles.formControlCheckbox}
                            control={<Checkbox checked={solicito.vmer} onChange={(e) => handleSolicito('vmer', e.target.checked)} name="vmer" />}
                            label="VMER"
                        />
                        <div style={styles.solicitoLabel}>Qt.</div>
                        <TextField
                            style={styles.solicitoInputDesc}
                            variant="outlined"
                            fullWidth
                            value={solicito.vmerQt}
                            onChange={(e) => handleSolicito('vmerQt', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div style={styles.rowInfo}>
                <FormGroup>
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={elementoComando.elementoComando} onChange={handleElementoComando} name="elementoComando" />}
                        label="Elemento de Comando"
                    />
                </FormGroup>
            </div>
        </div>
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
        paddingLeft: '20px'
    },
    solicitoContainer: {
        display: 'flex',
        flexDirection: 'column', // Changed to column to stack rows vertically
        alignItems: 'flex-start', // Adjust alignment for the column layout
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginTop: 25,
        width: '100%', // Ensures full width of container
    },
    solicitoRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: '15px', // Adds spacing between rows
    },
    solicitoLabel: {
        fontWeight: 'bold',
        marginRight: '10px',
    },
    solicitoInputQt: {
        width: '60px',
        marginRight: '20px',
    },
    solicitoInputDesc: {
        flex: 1,
    },
};

export default IncendiosUrbanosComponent;
