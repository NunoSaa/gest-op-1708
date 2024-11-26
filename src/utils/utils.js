import { PDFDocument } from 'pdf-lib';
import { gapi } from 'gapi-script';

class Utils {

    // Helper function to calculate age based on a birthdate
    static calculateAge = (birthDate) => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // Adjust age if birthdate hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    };

    // Function to get form field names from the PDF template
    static getFormFieldNames = async (templateUrl) => {
        try {
            const existingPdfBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const form = pdfDoc.getForm();
            const fields = form.getFields();
            const fieldNames = fields.map(field => field.getName());
            console.log('Form Field Names:', fieldNames);
            return fieldNames;
        } catch (error) {
            console.error('Error fetching or parsing the PDF template:', error);
        }
    };

    // Function to create or find a folder in Google Drive
    static createOrFindFolder = async (folderName, parentFolderId = 'root') => {
        try {
            const response = await gapi.client.drive.files.list({
                q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false and '${parentFolderId}' in parents`,
                fields: 'files(id, name)',
                spaces: 'drive',
            });

            const folders = response.result.files;
            if (folders && folders.length > 0) {
                return folders[0].id;
            } else {
                const createFolderResponse = await gapi.client.drive.files.create({
                    resource: {
                        name: folderName,
                        mimeType: 'application/vnd.google-apps.folder',
                        parents: [parentFolderId],
                    },
                    fields: 'id',
                });
                return createFolderResponse.result.id;
            }
        } catch (error) {
            console.error(`Error finding or creating folder '${folderName}':`, error);
            return null;
        }
    };

    // Update fillPdfTemplate to return the filled PDF blob
    static fillPdfTemplate = async (templateUrl, data) => {
        try {
            const existingPdfBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const form = pdfDoc.getForm();

            Object.keys(data).forEach(key => {
                const field = form.getField(key);
                if (field) {
                    field.setText(data[key]);
                }
            });

            const pdfBytes = await pdfDoc.save();
            return new Blob([pdfBytes], { type: 'application/pdf' }); // Return the filled PDF blob

        } catch (error) {
            console.error('Error filling the PDF template:', error);
        }
    };

    //Calculate the NEWS Scale
    static calculateNewsScale = (vent, avds, spo2, o2, temp, p_sist, bpm) => {
        let o2_value = 0;
        let avds_value = 0;
        let vent_value = 0;
        let spo2_value = 0;
        let temp_value = 0;
        let p_sist_value = 0;
        let bpm_value = 0;

        // Calculate O2
        if (!isNaN(o2)) {
            if (o2 > 0) {
                o2_value = 2;
            }
        }

        // Calculate AVDS
        if (avds !== "A") {
            avds_value = 3;
        }

        // Calculate Vent
        if (vent <= 8) {
            vent_value = 3;
        } else if (vent >= 9 && vent <= 11) {
            vent_value = 1;
        } else if (vent >= 21 && vent <= 24) {
            vent_value = 2;
        } else if (vent > 24) {
            vent_value = 3;
        } else {
            vent_value = 0;
        }

        // Calculate SpO2
        if (spo2 <= 91) {
            spo2_value = 3;
        } else if (spo2 === 92 || spo2 === 93) {
            spo2_value = 2;
        } else if (spo2 === 94 || spo2 === 95) {
            spo2_value = 1;
        } else {
            spo2_value = 0;
        }

        // Calculate Temp
        if (temp <= 35) {
            temp_value = 3;
        } else if (temp >= 35.1 && temp <= 36) {
            temp_value = 1;
        } else if (temp >= 38.1 && temp <= 39) {
            temp_value = 1;
        } else if (temp > 39) {
            temp_value = 2;
        } else {
            temp_value = 0;
        }

        // Calculate P_sist
        if (p_sist <= 90) {
            p_sist_value = 3;
        } else if (p_sist > 90 && p_sist <= 100) {
            p_sist_value = 2;
        } else if (p_sist >= 100 && p_sist <= 110) {
            p_sist_value = 1;
        } else if (p_sist >= 220) {
            p_sist_value = 3;
        } else {
            p_sist_value = 0;
        }

        // Calculate BPM
        if (bpm <= 40) {
            bpm_value = 3;
        } else if (bpm > 40 && bpm <= 50) {
            bpm_value = 1;
        } else if (bpm > 90 && bpm <= 110) {
            bpm_value = 1;
        } else if (bpm > 110 && bpm <= 130) {
            bpm_value = 2;
        } else if (bpm >= 131) {
            bpm_value = 3;
        } else {
            bpm_value = 0;
        }

        // Calculate total NEWS score
        console.log(vent_value , avds_value , spo2_value , o2_value , temp_value , p_sist_value , bpm_value)
        let total = vent_value + avds_value + spo2_value + o2_value + temp_value + p_sist_value + bpm_value;

        // Handle AVDS "-"
        if (avds === "-") {
            total = "--";
        }

        return total.toString();
    };

}

export default Utils;