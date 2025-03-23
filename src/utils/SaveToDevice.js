class SaveToDevice {

    //SAVE TO DEVICE
    static saveToDevice = async (e) => {

        if (
            formData.hora_vitima !== '' && formData.hora_vitima !== null &&
            formData.hora_caminho_hospital !== '' && formData.hora_caminho_hospital !== null &&
            formData.hora_chegada_unidade_hospitalar !== '' && formData.hora_chegada_unidade_hospitalar !== null
        ) {
            try {
                console.log("formData before submission:", formData); // Debugging
                if (!pdfFile) {
                    throw new Error("PDF template path is missing.");
                }

                const templateUrl = pdfFile; // Path to your PDF template

                // Ensure formData has necessary fields
                if (!formData || Object.keys(formData).length === 0) {
                    throw new Error("formData is empty or invalid.");
                }

                // Call the function to generate the filled PDF
                const generatedPdf = await Utils.fillPdfTemplate(templateUrl, formData);

                // Check if the generatedPdf is valid
                if (!generatedPdf) {
                    throw new Error("PDF generation failed.");
                }

                // Create a Blob from the generated PDF
                const pdfBlob = new Blob([generatedPdf], { type: "application/pdf" });

                // Create a download link
                const downloadUrl = URL.createObjectURL(pdfBlob);
                const link = document.createElement("a");
                link.href = downloadUrl;
                link.download = fileName; // Name for the downloaded file
                document.body.appendChild(link); // Append the link to the body
                link.click(); // Trigger the download
                document.body.removeChild(link); // Clean up the DOM

                console.log("PDF saved successfully.");
                alert("PDF saved successfully.");

            } catch (error) {
                console.error("Error during PDF generation or save:", error);
                alert("An error occurred while saving the PDF. Please try again.");
            }
        } else {
            alert("Dados não preenchidos (Hora Chegada à Vitima, Caminho U. Saúde, Chegada U. Saúde ). Por favor, preencha antes de finalizar.");
        }
    };


}

export default SaveToDevice;