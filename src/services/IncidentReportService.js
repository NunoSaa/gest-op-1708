import axios from 'axios';

class IncidentReportService {

    // POST: updateIncidentsReport
    static updateIncidentsReport = async (item, reportData) => {
        try {
            const response = await axios.post('https://preventech-proxy-service.onrender.com/api/finalreport/updateIncidentsReport', {
                id_ocorrencia: item.id,
                ...reportData
            });

            if (response.data && response.data.status === 'success') {

                localStorage.setItem('IncidentReport', JSON.stringify(reportData));
                alert('Dados Guardados no Relatorio com Sucesso');
                setTimeout(() => window.history.back(), 0);

            }
            else if (response.status === 200) {

                alert('Dados Guardados no Relatorio com Sucesso');
                setTimeout(() => window.history.back(), 0); 

            } else {

                console.error('Unexpected response:', response.data);
                setTimeout(() => window.history.back(), 0); 
                
            }

        } catch (error) {
            console.error('Erro ao Atualizar campos do Relatório:', error);
        }
    };    

    // POST: insertVictim
    static insertVictim = async (item, verbeteData) => {

        var id_ocorrencia = item[0].id;
        var id_viatura = item[0].viaturas[0].id_viatura;
        
        try {
            const response = await axios.post('https://preventech-proxy-service.onrender.com/api/victims/insertVictim', {
                id_ocorrencia: id_ocorrencia,
                id_viatura: id_viatura,
                data: "24-03-2025",
                hora: "13:25",
                //tipo: '',
                //gravidade: '',
                nome: verbeteData.nome,
                destino: verbeteData.transporte_unidade_destino,
                idade: verbeteData.idade,
                genero: verbeteData.genero
            });

            if (response.data && response.data.status === 'success') {

                alert('Vitima inserida com Sucesso');
                setTimeout(() => window.history.back(), 0);

            }
            else if (response.status === 200) {

                alert('Vitima inserida com Sucesso');
                setTimeout(() => window.history.back(), 0); 

            } else {

                console.error('Unexpected response:', response.data);
                setTimeout(() => window.history.back(), 0); 
                
            }

        } catch (error) {
            console.error('Erro ao Atualizar campos da vitima:', error);
        }

    };
}

export default IncidentReportService;