import React, { createContext, useContext, useState } from 'react';

// Create the context for form data
const VerbeteINEMFormDataContext = createContext();

// Provider component to wrap around parts of your app that need access to form data
export const VerbeteINEMFormDataProvider = ({ children }) => {
    const [formData, setFormData] = useState({}); // Initialize with an empty object

    // Function to update form data
    const updateFormData = (data) => {
        console.log('Data being updated:', data); // Log incoming data

        setFormData((prevData) => {
            const updatedData = { ...prevData, ...data };
            console.log('Updated formData:', updatedData); // Log updated state
            return updatedData; // Return the updated state
        });

        console.log(formData)
    };

    return (
        <VerbeteINEMFormDataContext.Provider value={{ formData, updateFormData }}>
            {children}
        </VerbeteINEMFormDataContext.Provider>
    );
};

// Hook to use form data in components
export const useFormData = () => {
    return useContext(VerbeteINEMFormDataContext);
};
