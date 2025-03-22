import axios from 'axios';

class IncidentState {

    static updateIncidentState = async (id_ocorrencia, id_estado) => {
        axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentState', {
            id_ocorrencia: id_ocorrencia,
            id_estado: id_estado
        })
    }
}

export default IncidentState;