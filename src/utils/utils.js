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

}

export default Utils;