import React from 'react';
import '../css/RaceAssessment.css'; // Import the CSS file for styling

const RaceAssessment = () => {
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

export default RaceAssessment;
