import React from 'react';
import { TextField, FormGroup, FormControlLabel, Checkbox, Card, CardContent, formControlClasses } from '@mui/material';

const IncendiosRodoviariosComponent = ({
    pontosSituacao,
    handleCheckboxChange,
    emVeiculo,
    handleEmVeiculoChange,
    geolocationGMS,
    estouEm,
    setEstouEm,
    pontosSensiveis,
    handlePontosSensiveis,
    tipoCarga,
    handleTipoCargaChange,
    localidade,
    handleChange,
    cos,
    handleCOS,
    faco,
    handleFaco,
    solicito,
    handleSolicito,
    elementoComando,
    handleElementoComando,
}) => {

    const isMobile = window.innerWidth <= 768;

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
                {/* Vertical Column with "Ocorrência" */}
                <div style={{
                    width: '25px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    writingMode: 'vertical-lr',
                    textAlign: 'center',
                    backgroundColor: '#FF9933',  // Optional background for visual separation
                    padding: '10px',
                    fontWeight: 'bold',
                    flexShrink: 0,    // Prevents the column from shrinking,
                    marginBottom: "25px",
                    transform: 'rotate(180deg)'
                }}>
                    Estou
                </div>

                {/* Event Form */}
                <div className="event-form" style={{ flexGrow: 1 }}>
                    <section className="header-section">
                        <div style={{
                            ...styles.rowInfoContainer,
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' // Adjust columns based on screen size
                        }}>
                            <div style={styles.rowInfo}>
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
                    backgroundColor: '#FF3333',  // Optional background for visual separation
                    padding: '10px',
                    fontWeight: 'bold',
                    flexShrink: 0,    // Prevents the column from shrinking,
                    marginBottom: "25px",
                    transform: 'rotate(180deg)'
                }}>
                    Vejo
                </div>

                {/* Event Form */}
                <div className="event-form" style={{ flexGrow: 1 }}>
                    <section className="header-section">
                        <div style={{
                            ...styles.rowInfoContainer,
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' // Adjust columns based on screen size
                        }}>
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
                                <span style={styles.infoProp}>Em Veículo: </span>
                                <FormGroup>
                                    <FormControlLabel
                                        style={styles.formControlCheckbox}
                                        control={<Checkbox checked={emVeiculo.rodoviario_ligeiro} onChange={handleEmVeiculoChange} name="rodoviario_ligeiro" />}
                                        label="Veículo Ligeiro"
                                    />
                                    <FormControlLabel
                                        style={styles.formControlCheckbox}
                                        control={<Checkbox checked={emVeiculo.rodoviarioLigeiroMercadorias} onChange={handleEmVeiculoChange} name="rodoviarioLigeiroMercadorias" />}
                                        label="Veículo Ligeiro Mercadorias"
                                    />
                                    <FormControlLabel
                                        style={styles.formControlCheckbox}
                                        control={<Checkbox checked={emVeiculo.rodoviarioPesadoMercadorias} onChange={handleEmVeiculoChange} name="rodoviarioPesadoMercadorias" />}
                                        label="Veículo Pesado de Mercadorias"
                                    />
                                    <FormControlLabel
                                        style={styles.formControlCheckbox}
                                        control={<Checkbox checked={emVeiculo.rodoviarioPesadosPassageiros} onChange={handleEmVeiculoChange} name="rodoviarioPesadosPassageiros" />}
                                        label="Veículo Pesado de Passageiros"
                                    />
                                    <div style={styles.solicitoRow}>
                                        <FormControlLabel
                                            style={styles.formControlCheckbox}
                                            control={<Checkbox checked={emVeiculo.rodoviarioOutros} onChange={handleEmVeiculoChange} name="rodoviarioOutros" />}
                                            label="Outros"
                                        />
                                    </div>
                                </FormGroup>
                            </div>

                            <div style={styles.rowInfo}>
                                <FormGroup>
                                    <div style={styles.solicitoLabel}>Tipo de Carga:</div>
                                    <TextField
                                        style={styles.solicitoInputDesc}
                                        variant="outlined"
                                        fullWidth
                                        value={tipoCarga.tipoCarga}
                                        onChange={(e) => handleTipoCargaChange('tipoCarga', e.target.value)}
                                    />
                                </FormGroup>
                            </div>
                            <div style={styles.rowInfo}>
                                <FormGroup>
                                    <div style={styles.solicitoLabel}>Afetação da Carga:</div>
                                    <TextField
                                        style={styles.solicitoInputDesc}
                                        variant="outlined"
                                        fullWidth
                                        value={tipoCarga.afetacaoCarga}
                                        onChange={(e) => handleTipoCargaChange('afetacaoCarga', e.target.value)}
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

                            <div style={styles.rowInfo}>
                                <span style={styles.infoProp}>Via: </span>
                                <FormGroup>
                                    <FormControlLabel
                                        style={styles.formControlCheckbox}
                                        control={<Checkbox checked={pontosSensiveis.habitacoes} onChange={handlePontosSensiveis} name="habitacoes" />}
                                        label="Cortada"
                                    />
                                    <FormControlLabel
                                        style={styles.formControlCheckbox}
                                        control={<Checkbox checked={pontosSensiveis.industria} onChange={handlePontosSensiveis} name="industria" />}
                                        label="Condicionada"
                                    />
                                    <TextField
                                        style={styles.solicitoInputDesc}
                                        variant="outlined"
                                        fullWidth
                                        value={tipoCarga.afetacaoCarga}
                                        onChange={(e) => handleTipoCargaChange('afetacaoCarga', e.target.value)}
                                        label="Sentido"
                                    />
                                </FormGroup>
                            </div>

                            <div style={styles.rowInfo}>
                                <span style={styles.infoProp}>Condições Meteorológicas: </span>
                                <FormGroup>

                                    <TextField
                                        style={styles.solicitoInputDesc}
                                        variant="outlined"
                                        fullWidth
                                        value={tipoCarga.afetacaoCarga}
                                        onChange={(e) => handleTipoCargaChange('afetacaoCarga', e.target.value)}
                                        label="Vento"
                                    />

                                    <TextField
                                        style={styles.solicitoInputDesc}
                                        variant="outlined"
                                        fullWidth
                                        value={tipoCarga.afetacaoCarga}
                                        onChange={(e) => handleTipoCargaChange('afetacaoCarga', e.target.value)}
                                        label="Ar"
                                    />

                                </FormGroup>
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
                    backgroundColor: '#0066CC',  // Optional background for visual separation
                    padding: '10px',
                    fontWeight: 'bold',
                    flexShrink: 0,    // Prevents the column from shrinking,
                    marginBottom: "25px",
                    transform: 'rotate(180deg)'
                }}>
                    Faço
                </div>

                {/* Event Form */}
                <div className="event-form" style={{ flexGrow: 1 }}>
                    <section className="header-section">
                        <div style={{
                            ...styles.rowInfoContainer,
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' // Adjust columns based on screen size
                        }}>
                            <div style={styles.rowInfo}>
                                <FormGroup>
                                    <FormControlLabel
                                        style={styles.formControlCheckbox}
                                        control={<Checkbox checked={faco.combateDirecto} onChange={handleFaco} name="combateDirecto" />}
                                        label="Combate Directo"
                                    />
                                    <FormControlLabel
                                        style={styles.formControlCheckbox}
                                        control={<Checkbox checked={faco.protecaoExposicoes} onChange={handleFaco} name="protecaoExposicoes" />}
                                        label="Proteção de Exposições"
                                    />
                                    <FormControlLabel
                                        style={styles.formControlCheckbox}
                                        control={<Checkbox checked={faco.salvamentos} onChange={handleFaco} name="salvamentos" />}
                                        label="Salvamentos"
                                    />
                                    <FormControlLabel
                                        style={styles.formControlCheckbox}
                                        control={<Checkbox checked={faco.limpezaVia} onChange={handleFaco} name="limpezaVia" />}
                                        label="Limpeza de Via"
                                    />
                                </FormGroup>
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
                    backgroundColor: '#A0A0A0',  // Optional background for visual separation
                    padding: '10px',
                    fontWeight: 'bold',
                    flexShrink: 0,    // Prevents the column from shrinking,
                    marginBottom: "25px",
                    transform: 'rotate(180deg)'
                }}>
                    Solicito
                </div>

                {/* Event Form */}
                <div className="event-form" style={{ flexGrow: 1 }}>
                    <section className="header-section">
                        <div style={{
                            ...styles.rowInfoContainer,
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' // Adjust columns based on screen size
                        }}>
                            <div style={styles.rowInfo}>
                                <div style={styles.solicitoRow}>
                                    <FormControlLabel
                                        style={styles.formControlCheckbox}
                                        control={<Checkbox checked={solicito.vsatVUCI} onChange={(e) => handleSolicito('vsatVUCI', e.target.checked)} name="vsatVUCI" />}
                                        label="VSAT / VUCI"
                                    />
                                    <div style={styles.solicitoLabel}>Qt.</div>
                                    <TextField
                                        style={styles.solicitoInputDesc}
                                        variant="outlined"
                                        fullWidth
                                        value={solicito.vsatVUCIQt}
                                        onChange={(e) => handleSolicito('vsatVUCIQt', e.target.value)}
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
                        <div style={styles.solicitoRow}>
                            <FormControlLabel
                                style={styles.formControlCheckbox}
                                control={<Checkbox checked={solicito.outros} onChange={(e) => handleSolicito('outros', e.target.checked)} name="outros" />}
                                label="Outros"
                            />
                            <div style={styles.solicitoLabel}>Desc.</div>
                            <TextField
                                style={styles.solicitoInputDesc}
                                variant="outlined"
                                fullWidth
                                value={solicito.outrosQt}
                                label='GNR, Proteção Civil Municipal, ICNF, etc... '
                                onChange={(e) => handleSolicito('outrosQt', e.target.value)}
                            />
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
                    backgroundColor: '#FFFF00',  // Optional background for visual separation
                    padding: '10px',
                    fontWeight: 'bold',
                    flexShrink: 0,    // Prevents the column from shrinking,
                    marginBottom: "25px",
                    transform: 'rotate(180deg)'
                }}>
                    COS
                </div>

                {/* Event Form */}
                <div className="event-form" style={{ flexGrow: 1 }}>
                    <section className="header-section">
                        <div style={{
                            ...styles.rowInfoContainer,
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' // Adjust columns based on screen size
                        }}>
                            <div style={styles.rowInfo}>
                                <FormGroup>
                                    <div style={styles.solicitoRow}>
                                        <div style={styles.solicitoLabel}>COS:</div>
                                        <TextField
                                            style={styles.solicitoInputDesc}
                                            label='Categoria e Nome'
                                            variant="outlined"
                                            fullWidth
                                            value={cos.categoriaNome}
                                            onChange={(e) => handleCOS('categoriaNome', e.target.value)}
                                        />
                                    </div>
                                    <div style={styles.solicitoRow}>
                                        <div style={styles.solicitoLabel}>Designação COS:</div>
                                        <TextField
                                            style={styles.solicitoInputDesc}
                                            label='Designação COS'
                                            variant="outlined"
                                            fullWidth
                                            value={cos.designacaoCOS}
                                            onChange={(e) => handleCOS('designacaoCOS', e.target.value)}
                                        />
                                        <div style={styles.solicitoLabel}>Nº Mecanográfico:</div>
                                        <TextField
                                            style={styles.solicitoInputDesc}
                                            label='Nº Mecanográfico'
                                            variant="outlined"
                                            fullWidth
                                            value={cos.numMecanografico}
                                            onChange={(e) => handleCOS('numMecanografico', e.target.value)}
                                        />
                                    </div>
                                </FormGroup>
                            </div>
                        </div>
                    </section>
                </div>
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
        paddingLeft: ' 20px'
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
        marginTop: "15px"
    },
};

export default IncendiosRodoviariosComponent;