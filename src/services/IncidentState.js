import axios from 'axios';

class IncidentState {

    static updateIncidentState = async (id_ocorrencia, id_estado) => {
        
        try {
            const response = await axios.put('https://preventech-proxy-service.onrender.com/api/emergency/updateIncidentState', {
                id_ocorrencia: id_ocorrencia,
                id_estado: id_estado
            });

            return response.data;

        } catch (error) {
            console.error('Error updating incident state:', error);
            throw new Error('Error updating incident state. Please try again later.');
        }
    }
}

export default IncidentState;
