import React, { useState, useEffect, useRef } from 'react';
import { Button, LinearProgress, Typography, CircularProgress, Box, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { gapi } from 'gapi-script'; // Import the gapi library
import { useNavigate, useLocation } from "react-router-dom";

const RecordAudioPosit = () => {
    const [audioBlob, setAudioBlob] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [progress, setProgress] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0); // State to hold the elapsed time in seconds
    const intervalRef = useRef(null);
    const [uploadProgress, setUploadProgress] = useState(0); // Upload progress
    const [isUploading, setIsUploading] = useState(false); // Uploading state

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [item, setItem] = useState(state);

    const theme = useTheme();

    const CLIENT_ID = '214123389323-3c7npk6e2hasbi2jt3pnrg1jqvjtm92m.apps.googleusercontent.com';  // Replace with your OAuth Client ID
    const API_KEY = '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';  // Replace with your Google Cloud API Key
    const SCOPES = 'https://www.googleapis.com/auth/drive.file'; // Scope to upload file

    const num_ocorrencia = item.numero; 

    const now = new Date();

    // Get the current date in the format "YYYY-MM-DD"
    const currentDate = now.toISOString().split('T')[0];

    // Get the current time in the format "HH:MM"
    const currentHour = now.toTimeString().split(' ')[0].substring(0, 5);

    let fileName = item.numero + '_POSIT_' + currentDate + '_' + currentHour + '.mp3';

    useEffect(() => {
        // Initialize Google API client on component mount
        function start() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                scope: SCOPES,
            });
        }
        gapi.load('client:auth2', start);

        // Set up the MediaRecorder when the component mounts
        const initRecorder = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);

                recorder.ondataavailable = (event) => {
                    setAudioBlob(event.data);
                };

                setRecorder(recorder);
            } catch (error) {
                console.error("Error accessing the microphone: ", error);
                alert("Microphone access is required to record audio.");
            }
        };

        initRecorder();

        return () => {
            // Clean up
            if (recorder) {
                recorder.stream.getTracks().forEach(track => track.stop());
            }
            clearInterval(intervalRef.current);
        };
    }, []);

    const startRecording = () => {
        if (recorder && !isRecording) {
            recorder.start();
            setIsRecording(true);
            setProgress(0);
            setElapsedTime(0); // Reset elapsed time
            intervalRef.current = setInterval(() => {
                setElapsedTime((prev) => prev + 1); // Increment elapsed time
                setProgress((prev) => Math.min(prev + 1, 100)); // Increment progress
            }, 1000); // Progress increments every 1 second
        }
    };

    const stopRecording = () => {
        if (recorder && isRecording) {
            recorder.stop();
            setIsRecording(false);
            clearInterval(intervalRef.current);
        }
    };

    const saveRecording = () => {
        if (!audioBlob) return;

        const url = window.URL.createObjectURL(audioBlob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName; // Save the file as 'recording.webm'
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const createOrFindFolder = async (folderName, parentFolderId = 'root') => {
        try {
            const response = await gapi.client.drive.files.list({
                q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false and '${parentFolderId}' in parents`,
                fields: 'files(id, name)',
                spaces: 'drive',
            });

            const folders = response.result.files;

            if (folders && folders.length > 0) {
                // Folder already exists, return the ID
                return folders[0].id;
            } else {
                // If folder doesn't exist, create it
                const createFolderResponse = await gapi.client.drive.files.create({
                    resource: {
                        name: folderName,
                        mimeType: 'application/vnd.google-apps.folder',
                        parents: [parentFolderId], // Parent folder ID
                    },
                    fields: 'id',
                });

                return createFolderResponse.result.id; // Return the newly created folder ID
            }
        } catch (error) {
            console.error(`Error finding or creating folder '${folderName}':`, error);
            return null;
        }
    };

    const sendToDrive = async () => {
        if (!audioBlob) return;

        gapi.auth2.getAuthInstance().signIn().then(async () => {
            const file = new Blob([audioBlob], { type: 'audio/webm' });
            const metadata = {
                name: fileName,
                mimeType: 'audio/webm',
            };

            // Step 1: Find or create the 'Ocorrencias' folder in Google Drive shared from centralVPA
            const ocorrenciasFolderId = await createOrFindFolder('1yE6cG3Kwakq1V0ZcI8liMfqF4tLc2E4h');

            // Step 2: Inside 'Ocorrencias', find or create the 'num_ocorrencia' folder
            const ocorrenciaFolderId = await createOrFindFolder(num_ocorrencia, '1yE6cG3Kwakq1V0ZcI8liMfqF4tLc2E4h');

            const positFolderId = await createOrFindFolder('POSIT', ocorrenciaFolderId, '1yE6cG3Kwakq1V0ZcI8liMfqF4tLc2E4h');

            if (!ocorrenciaFolderId) {
                alert('Erro ao criar a estrutura de pastas no Google Drive');
                return;
            }

            if (!positFolderId) {
                alert('Erro ao criar a estrutura de pastas no Google Drive');
                return;
            }

            // Step 3: Upload the file to the 'num_ocorrencia' folder
            const form = new FormData();
            metadata.parents = [positFolderId]; // Specify the parent folder (num_ocorrencia folder)
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', file);

            // Using XMLHttpRequest to track upload progress
            const xhr = new XMLHttpRequest();
            setIsUploading(true); // Start spinner
            xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', true);
            xhr.setRequestHeader('Authorization', `Bearer ${gapi.auth.getToken().access_token}`);

            // Track the upload progress
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress(percentComplete); // Update the progress percentage
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    alert('File uploaded successfully to Google Drive!');
                    setIsUploading(false); // Stop spinner
                    setUploadProgress(0); // Reset progress
                } else {
                    console.error('Error uploading file: ', xhr.responseText);
                    setIsUploading(false); // Stop spinner
                }
            };

            xhr.onerror = () => {
                console.error('Upload failed.');
                setIsUploading(false); // Stop spinner
            };

            xhr.send(form); // Send the form data
        });
    };

    // Convert elapsed time in seconds to a mm:ss format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleBackClick = () => {
        window.history.back(); // Go back to the previous page
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: "#A0A0A0" }}>
                    <IconButton edge="start" color="inherit" onClick={handleBackClick} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Fita de Tempo
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={styles.container}>
                <div style={styles.rowInfo}>
                    <h2>Audio POSIT</h2>
                </div>

                <div style={styles.rowInfo}>
                    <LinearProgress variant="determinate" value={isRecording ? progress : 0} />
                    {isRecording && (
                        <Typography variant="body1" style={{ marginTop: theme.spacing(1) }}>
                            Gravando... Tempo: {formatTime(elapsedTime)}
                        </Typography>
                    )}
                </div>

                {audioBlob && (
                    <div style={styles.rowInfoCentered}>
                        <audio controls style={styles.player}>
                            <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
                            Your browser does not support the audio tag.
                        </audio>
                    </div>
                )}

                <div style={styles.rowInfoCentered}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={startRecording}
                        disabled={isRecording}
                        style={styles.button_Inciar}
                    >
                        Iniciar Gravação
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={stopRecording}
                        disabled={!isRecording}
                        style={styles.button_Parar}
                    >
                        Parar Gravação
                    </Button>
                </div>
                <div style={styles.rowInfoCentered}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={saveRecording}
                        disabled={!audioBlob}
                        style={styles.button_Save}
                    >
                        Guardar no dispositivo
                    </Button>

                    <Button
                        variant="contained"
                        color="info"
                        onClick={sendToDrive}
                        disabled={!audioBlob || isUploading} // Disable while uploading
                        style={styles.button_Send}
                    >
                        Enviar para Gescorp
                    </Button>
                </div>

                {/* Modal-like Overlay during upload */}
                {isUploading && (
                    <div style={styles.backdrop}>
                        <Card style={styles.card}>
                            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                <CircularProgress variant="determinate" value={uploadProgress} />
                                <Box
                                    sx={{
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography variant="caption" component="div" color="text.secondary">
                                        {`${uploadProgress}%`}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        marginLeft: 25,
        marginRight: 25,
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25
    },
    rowInfo: {
        flexDirection: 'row',
        marginBottom: "5%",
    },
    rowInfoCentered: {
        display: 'flex',
        justifyContent: 'center', // Centers the buttons horizontally
        alignItems: 'center', // Centers the buttons vertically (optional)
        gap: 16, // Optional: Adds space between the buttons
        marginTop: 16, // Optional: Adds some margin at the top
    },
    button_Inciar: {
        width: "45%",
        height: 75,
        color: "success",
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginRight: "10%"
    },
    button_Parar: {
        width: "44%",
        height: 75,
        color: "error",
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    button_Save: {
        width: "35%",
        height: 75,
        color: "primary",
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginRight: "5%"
    },
    button_Send: {
        width: "35%",
        height: 75,
        color: "secondary",
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    player: {
        width: "80%",
        height: 75,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    // Backdrop overlay
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300, // Make sure it overlays everything else
    },
    // Card for spinner and upload progress
    card: {
        padding: 20,
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    },
};

export default RecordAudioPosit;
