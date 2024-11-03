import React from 'react';
import '../../css/LegendaComponent.css'

const LegendaComponent = () => {
    return (
        <div className="race-container">
            <h3>RACE (Eventual necessidade de trombectomia se ≥5)</h3>
            <div className="table-container">
                <div className="race-table-section">
                    <table className="race-table">
                        <thead>
                            <tr>
                                <th>ESQUERDA</th>
                                <th>DIREITA</th>
                                <th>VALOR</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="3" className="row-title">Paresia facial</td>
                            </tr>
                            <tr>
                                <td>Ausente</td>
                                <td>Ausente</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>Ligeira</td>
                                <td>Ligeira</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Moderada/severa</td>
                                <td>Moderada/severa</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="row-title">Paresia MS</td>
                            </tr>
                            <tr>
                                <td>Ausente/Ligeira (&lt;10seg)</td>
                                <td>Ausente/Ligeira (&lt;10seg)</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>Moderada (&gt;10seg)</td>
                                <td>Moderada (&gt;10seg)</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Severa (não levanta)</td>
                                <td>Severa (não levanta)</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="row-title">Paresia MI</td>
                            </tr>
                            <tr>
                                <td>Moderada (&lt;5seg)</td>
                                <td>Moderada (&lt;5seg)</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Severa (não levanta)</td>
                                <td>Severa (não levanta)</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="row-title">Desvio oculocefálico</td>
                            </tr>
                            <tr>
                                <td>Direito ausente</td>
                                <td>Esquerdo ausente</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="row-title">Agnosia / Afasia</td>
                            </tr>
                            <tr>
                                <td>Reconhece o braço E o défice</td>
                                <td>Afasia obedece 2 ordens</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Não reconhece o braço OU o défice</td>
                                <td>Afasia obedece 1 ordem</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>Não reconhece NEM o braço NEM o défice</td>
                                <td>Não executa ordens</td>
                                <td>2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="glasgow-cincinnati-section">
                    <h3>Escala de Coma de Glasgow Atualizada</h3>
                    <table className="glasgow-table">
                        <thead>
                            <tr>
                                <th>OLHOS</th>
                                <th>VERBAL</th>
                                <th>MOTOR</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Espontânea</td>
                                <td>Orientada</td>
                                <td>A ordens</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>Ao som</td>
                                <td>Confusa</td>
                                <td>Localiza a dor</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>A pressão</td>
                                <td>Palavras</td>
                                <td>Flexão normal</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>Ausente</td>
                                <td>Sons</td>
                                <td>Flexão anormal</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>Não testável</td>
                                <td>Ausente</td>
                                <td>Extensão</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>NT</td>
                                <td>NT</td>
                                <td>Ausente</td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Escala de Cincinnati (positivo de 1 a 3)</h3>
                    <table className="cincinnati-table">
                        <thead>
                            <tr>
                                <th>ALTERAÇÃO</th>
                                <th>SIM</th>
                                <th>NÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Paresia facial</td>
                                <td>1</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>Queda de membro superior</td>
                                <td>1</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>Alteração na fala</td>
                                <td>1</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        marginLeft: 15,
        marginRight: 15,
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 15,
        paddingRight: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    rowInfo: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-between',
        width: '100%',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', // Ensure the label and input are vertically aligned
        flex: 1, // Let it grow to fill available space (you can adjust the flex value for custom widths)
        gap: '10px', // Optional gap between label and input
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginRight: 15,
    },
    infoProp: {
        fontSize: 18,
        paddingBottom: 10,
        textAlign: "left",
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 5,
        marginBottom: 15
    },
    rowButton: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 25,
    },
    button_SAVE: {
        width: "100%",
        height: 75,
        backgroundColor: '#99FF99',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        backgroundColor: '#0065ad', // Blue color for headers
        color: 'white',
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
        fontSize: '12px',
    },
    td: {
        //backgroundColor: '#e6f0ff', // Light background for cells
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
        fontSize: '12px',
    },
    tdBlank: {
        backgroundColor: '#f7faff', // Slightly lighter background for blank cells
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
        fontSize: '12px',
    },
    formContainer: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    formSection: {
        marginBottom: '20px',
    },
    sectionTitle: {
        marginBottom: '10px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: '16px',
    },
    checkboxSection: {
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
    },
    checkboxInput: {
        marginRight: '10px',
    },
    bodyDiagramContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #ccc',
        height: '250px',
        marginTop: '10px',
    },
    formField: {
        marginBottom: '10px',
    },
    medicationSection: {
        marginTop: '20px',
    },
    medicationFields: {
        display: 'flex',
        gap: '15px',
        marginTop: '10px',
    },
    tableContainer: {
        border: '1px solid #ccc',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        marginTop: '20px',
    },
    '@media (max-width: 768px)': {
        medicationFields: {
            flexDirection: 'column',
        },
    },
};

export default LegendaComponent;