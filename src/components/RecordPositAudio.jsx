import React, { useState, useEffect, useRef } from 'react';
import { Button, LinearProgress, Typography, CircularProgress, Box, Card, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { gapi } from 'gapi-script';
import { useLocation } from "react-router-dom";

const RecordAudioPosit = () => {
    const [audioBlob, setAudioBlob] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [progress, setProgress] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0); // State to hold the elapsed time in seconds
    const intervalRef = useRef(null);
    const [uploadProgress, setUploadProgress] = useState(0); // Upload progress
    const [isUploading, setIsUploading] = useState(false); // Uploading state
    const location = useLocation();
    const { state } = location;
    const [item, setItem] = useState(state);
    const num_ocorrencia = item.numero;
    const CLIENT_ID = '214123389323-3c7npk6e2hasbi2jt3pnrg1jqvjtm92m.apps.googleusercontent.com';  // Replace with your OAuth Client ID
    const API_KEY = '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';  // Replace with your Google Cloud API Key
    const SCOPES = 'https://www.googleapis.com/auth/drive.file'; // Scope to upload file

    const now = new Date();
    // Get the current date in the format "YYYY-MM-DD"
    const currentDate = now.toISOString().split('T')[0];
    // Get the current time in the format "HH:MM"
    const currentHour = now.toTimeString().split(' ')[0].substring(0, 5);

    //Buld the FileName
    let fileName = item.numero + '_POSIT_' + currentDate + '_' + currentHour + '.mp3';

    useEffect(() => {
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
            setElapsedTime(0);
            intervalRef.current = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
                setProgress((prev) => Math.min(prev + 1, 100));
            }, 1000);
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
        a.download = fileName;
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

    const resetRecording = () => {
        setAudioBlob(null);
        setElapsedTime(0);
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

            if (!ocorrenciaFolderId) {
                alert('Erro ao criar a estrutura de pastas no Google Drive');
                return;
            }

            // Step 3: Upload the file to the 'num_ocorrencia' folder
            const form = new FormData();
            metadata.parents = [ocorrenciaFolderId]; // Specify the parent folder (num_ocorrencia folder)
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
                    alert('Ficheiro enviado com sucesso para o Google Drive!');
                    setIsUploading(false); // Stop spinner
                    setUploadProgress(0); // Reset progress
                    resetRecording();
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
    };

    // Convert elapsed time in seconds to a mm:ss format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Go back to the previous page
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
                        POSIT
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: { xs: 2, sm: 4, md: 6 }, bgcolor: "background.default", minHeight: "100vh" }}>
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom textAlign="center">
                            Audio POSIT
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <LinearProgress variant="determinate" value={isRecording ? progress : 0} />
                        {isRecording && (
                            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                                A gravar audio... Tempo: {formatTime(elapsedTime)}
                            </Typography>
                        )}
                    </Grid>

                    {audioBlob && (
                        <Grid item xs={12} md={8}>
                            <audio controls style={styles.player}>
                                <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
                                Your browser does not support the audio tag.
                            </audio>
                        </Grid>
                    )}

                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={5}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                    onClick={startRecording}
                                    disabled={isRecording}
                                    sx={{ height: 60 }}>
                                    Iniciar Gravação
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    onClick={stopRecording}
                                    disabled={!isRecording}
                                    sx={{ height: 60 }}>
                                    Parar Gravação
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Save and Send Buttons Section */}
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={5}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    onClick={resetRecording}
                                    disabled={!audioBlob || isUploading}
                                    sx={{ height: 60 }}>
                                    Descartar gravação
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Save and Send Buttons Section */}
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={5}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={saveRecording}
                                    disabled={!audioBlob}
                                    sx={{ height: 60 }}>
                                    Guardar no dispositivo
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    onClick={sendToDrive}
                                    disabled={!audioBlob || isUploading}
                                    sx={{ height: 60 }}>
                                    Enviar para Gescorp
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {isUploading && (
                        <Grid item xs={12}>
                            <Box sx={styles.backdrop}>
                                <Card sx={styles.card}>
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
                                            }}>
                                            <Typography variant="caption" component="div" color="text.secondary">
                                                {`${uploadProgress}%`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </div>
    );
};

const styles = {
    container: {
        padding: 16,
        margin: 'auto',
        maxWidth: 960,
    },
    rowInfo: {
        flexDirection: 'row',
        marginBottom: "5%",
    },
    rowInfoCentered: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        marginTop: 16,
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
        color: "#349beb",
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    player: {
        width: "100%",
        borderRadius: 10,
        marginTop: 16,
    },
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300,
    },
    card: {
        padding: 20,
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        width: '300px',
    },
    discardButton: {
        position: 'absolute',
        top: -10,
        right: 10,
        zIndex: 1,
    },
};

export default RecordAudioPosit;
