import React from 'react';
import { TextField, FormGroup, FormControlLabel, Checkbox, Card, CardContent } from '@mui/material';

const IncendiosUrbanosComponent = ({
    pontosSituacao,
    handleCheckboxChange,
    fogoVista,
    handleFogoVistaChange,
    em,
    handleEmChange,
    geolocationGMS,
    estouEm,
    setEstouEm,
    localidade,
    handleChange,
}) => {
    return (
        <Card sx={{ minWidth: 275, backgroundColor: '#E0E0E0' }}>
            <CardContent>
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
                            control={<Checkbox checked={pontosSituacao.curso} onChange={handleCheckboxChange} name="curso" />}
                            label="Curso (Ativo)"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={pontosSituacao.resolucao} onChange={handleCheckboxChange} name="resolucao" />}
                            label="Resolução (Dominado)"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={pontosSituacao.conclusao} onChange={handleCheckboxChange} name="conclusao" />}
                            label="Conclusão (Rescaldo)"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={pontosSituacao.finalizado} onChange={handleCheckboxChange} name="finalizado" />}
                            label="Finalizado (Extinto)"
                        />
                    </FormGroup>
                </div>

                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Com: </span>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={fogoVista.fogoVista} onChange={handleFogoVistaChange} name="fogoVista" />}
                            label="Fogo à vista"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={fogoVista.semFogo} onChange={handleFogoVistaChange} name="semFogo" />}
                            label="Sem Fogo à vista"
                        />
                    </FormGroup>
                </div>

                <div style={styles.rowInfo}>
                    <span style={styles.infoProp}>Em: </span>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={em.habitacoes} onChange={handleEmChange} name="habitacoes" />}
                            label="Habitações"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={em.industria} onChange={handleEmChange} name="industria" />}
                            label="Indústria"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={em.comercio} onChange={handleEmChange} name="comercio" />}
                            label="Comércio"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={em.outros} onChange={handleEmChange} name="outros" />}
                            label="Outros"
                        />
                    </FormGroup>
                </div>
            </CardContent>
        </Card>
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
};

export default IncendiosUrbanosComponent;
