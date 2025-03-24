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
    static insertVictim = async (item, verbeteData, gravidadeValue, tipoVitimaValue) => {

        // Get current date and time
        const now = new Date();

        // Format date as DD-MM-YYYY (Portuguese format - pt-PT)
        const date = now.getDate().toString().padStart(2, '0') + '-' + 
             (now.getMonth() + 1).toString().padStart(2, '0') + '-' + 
             now.getFullYear();
             
        // Format time as HH:mm (24-hour format)
        const time = now.toLocaleTimeString('pt-PT', { hour12: false }).slice(0, 5); // This will return the time in the format HH:mm


        var id_ocorrencia = item[0].id;
        var id_viatura = item[0].viaturas[0].id_viatura;

        let sexoM = verbeteData.sexoM;  
        let sexoF = verbeteData.sexoF;

        let genero;

        if (sexoM === "X") {
            genero = "Masculino";
        } else if (sexoF === "X") {
            genero = "Feminino";
        }
        
        try {
            const response = await axios.post('https://preventech-proxy-service.onrender.com/api/victims/insertVictim', {
                id_ocorrencia: id_ocorrencia,
                id_viatura: id_viatura,
                data: date,
                hora: time,
                tipo: tipoVitimaValue,
                gravidade: gravidadeValue,
                nome: verbeteData.nome,
                destino: verbeteData.transporte_unidade_destino,
                idade: verbeteData.idade,
                genero: genero
            });

            if (response.data && response.data.status === 'success') {

                alert('Vitima inserida com Sucesso');

            }
            else if (response.status === 200) {

                alert('Vitima inserida com Sucesso');

            } else {

                console.error('Unexpected response:', response.data);
                
            }

        } catch (error) {
            console.error('Erro ao Atualizar campos da vitima:', error);
        }

    };
}

export default IncidentReportService;