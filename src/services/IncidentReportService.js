import axios from 'axios';

class IncidentReportService {

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

}

export default IncidentReportService;