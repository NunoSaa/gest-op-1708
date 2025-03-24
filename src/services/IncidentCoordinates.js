import axios from 'axios';

class IncidentCoordinates {

    static updateIncidentCoordinates = async (id_ocorrencia, lat, lon) => {
        try{
            axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentCoordinates', {
                id_ocorrencia: id_ocorrencia,
                lat: lat,
                lon: lon
            })
        }
        catch (error) {
            console.error('Erro ao Atualizar campos do Relatório:', error);
        }
    }

}

export default IncidentCoordinates;