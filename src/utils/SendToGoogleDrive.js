import { gapi } from 'gapi-script';
import Utils from './utils';
import pdfFile from '../assets/Verbete-INEM.pdf';

class SendToGoogleDrive {
    static CLIENT_ID = '214123389323-3c7npk6e2hasbi2jt3pnrg1jqvjtm92m.apps.googleusercontent.com'; // Replace with your OAuth Client ID
    static API_KEY = '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'; // Replace with your Google Cloud API Key
    static SCOPES = 'https://www.googleapis.com/auth/drive.file'; // Scope for Drive file access

    /**
     * Initialize Google API client
     */
    static initializeGapi = () => {
        return new Promise((resolve, reject) => {
            if (!gapi) {
                reject(new Error("Google API script is not loaded."));
                return;
            }
    
            gapi.load('client:auth2', async () => {
                try {
                    await gapi.client.init({
                        apiKey: SendToGoogleDrive.API_KEY,
                        clientId: SendToGoogleDrive.CLIENT_ID,
                        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                        scope: SendToGoogleDrive.SCOPES,
                    });
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    };

    /**
     * Authenticate user with Google
     */
    static authenticateUser = async () => {
        try {
            if (!gapi.client) {
                throw new Error("Google API client is not initialized.");
            }
    
            const user = gapi.auth2?.getAuthInstance()?.currentUser?.get();
            
            if (user && user.isSignedIn()) {
                return true;
            }
    
            const authInstance = gapi.auth2?.getAuthInstance();
            if (!authInstance) {
                throw new Error("Auth instance is undefined. Ensure gapi is initialized.");
            }
    
            await authInstance.signIn();
            return authInstance.isSignedIn.get();
        } catch (error) {
            console.error("Authentication error:", error);
            throw error;
        }
    };

    /**
     * Upload a file to Google Drive
     * @param {Blob} pdfBlob - The PDF file blob to upload
     * @param {string} fileName - Name of the file to save
     * @param {object} formData - Form data for the PDF
     * @param {string} num_ocorrencia - Folder name (incident number)
     * @param {function} setIsUploading - Function to toggle uploading state
     * @param {function} setUploadProgress - Function to set upload progress
     * @param {object} item - Incident item
     */
    static sendToDrive = async (pdfBlob, fileName, formData, num_ocorrencia, setIsUploading, setUploadProgress, item) => {

        try {
            if (
                formData.hora_vitima !== '' && formData.hora_vitima !== null &&
                formData.hora_caminho_hospital !== '' && formData.hora_caminho_hospital !== null &&
                formData.hora_chegada_unidade_hospitalar !== '' && formData.hora_chegada_unidade_hospitalar !== null
            ) {
    
                const templateUrl = pdfFile; // Path to your PDF template
                let file = new Blob([pdfBlob], { type: 'application/pdf' });
    
                // Fill the PDF template with formData and get the filled PDF blob
                file = await Utils.fillPdfTemplate(templateUrl, formData);
                console.log("formData before submission:", formData); // Log formData to check its state
    
                gapi.auth2.getAuthInstance().signIn().then(async () => {
                    const metadata = {
                        name: fileName,
                        mimeType: 'application/pdf',
                    };
    
                    // Step 1: Find or create the 'Ocorrencias' folder in Google Drive shared from centralVPA
                    const ocorrenciasFolderId = await Utils.createOrFindFolder('1yE6cG3Kwakq1V0ZcI8liMfqF4tLc2E4h');
    
                    // Step 2: Inside 'Ocorrencias', find or create the 'num_ocorrencia' folder
                    const ocorrenciaFolderId = await Utils.createOrFindFolder(num_ocorrencia, '1yE6cG3Kwakq1V0ZcI8liMfqF4tLc2E4h');
    
                    if (!ocorrenciaFolderId) {
                        alert('Erro ao criar a estrutura de pastas no Google Drive');
                        return;
                    }
    
                    console.log(ocorrenciaFolderId);
    
                    if (!ocorrenciaFolderId) {
                        alert('Error creating the folder structure in Google Drive.');
                        return;
                    }
    
                    const form = new FormData();
                    metadata.parents = [ocorrenciaFolderId];
                    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
                    form.append('file', new Blob([file], { type: 'application/pdf' }));
    
                    const xhr = new XMLHttpRequest();
                    setIsUploading(true);
                    xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', true);
                    xhr.setRequestHeader('Authorization', `Bearer ${gapi.auth.getToken().access_token}`);
    
                    xhr.upload.onprogress = (event) => {
                        if (event.lengthComputable) {
                            const percentComplete = Math.round((event.loaded / event.total) * 100);
                            setUploadProgress(percentComplete);
                        }
                    };
    
                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            alert('Ficheiro enviado com sucesso para o Google Drive!');
                            setIsUploading(false); // Stop spinner
                            setUploadProgress(0); // Reset progress
    
                        } else {
                            console.error('Erro no upload do ficheiro para o Google Drive: ', xhr.responseText);
                            setIsUploading(false); // Stop spinner
                        }
                    };
    
                    xhr.onerror = () => {
                        console.error('Erro no upload do ficheiro para o Google Drive.');
                        setIsUploading(false); // Stop spinner
                    };
    
                    xhr.send(form); // Send the form data
                });
            } else {
                alert("Dados não preenchidos (Hora Chegada à Vitima, Caminho U. Saúde, Chegada U. Saúde ). Por favor, preencha antes de finalizar.");
            }
        } catch (error) {
            alert(`Erro: ${error.message}`);
        }
    };
}

export default SendToGoogleDrive;
