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
    tipoCarga,
    handleTipoCargaChange,
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
                    <FormControlLabel
                        style={styles.formControlCheckbox}
                        control={<Checkbox checked={emVeiculo.rodoviarioOutros} onChange={handleEmVeiculoChange} name="rodoviarioOutros" />}
                        label="Outros"
                    />
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