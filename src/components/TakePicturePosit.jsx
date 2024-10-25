import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { gapi } from 'gapi-script';
import { useLocation } from "react-router-dom";

const TakePicturePosit = () => {
    const [imageBlob, setImageBlob] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [showPermissionPopup, setShowPermissionPopup] = useState(false);
    const [isPictureTaken, setIsPictureTaken] = useState(false);
    const [currentCamera, setCurrentCamera] = useState(null);
    const [cameraDevices, setCameraDevices] = useState([]);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const location = useLocation();
    const [uploadProgress, setUploadProgress] = useState(0); // Upload progress
    const [isUploading, setIsUploading] = useState(false); // Uploading state
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
    let fileName = `${num_ocorrencia}_POSIT_${currentDate}_${currentHour}.jpeg`;

    function start() {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
            scope: SCOPES,
        });
    }
    gapi.load('client:auth2', start);

    useEffect(() => {
        const getCameraDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const cameras = devices.filter(device => device.kind === 'videoinput');
                setCameraDevices(cameras);
                if (cameras.length > 0) {
                    setCurrentCamera(cameras[0].deviceId);
                }
            } catch (error) {
                console.error('Error getting devices: ', error);
            }
        };

        getCameraDevices();
    }, []);

    useEffect(() => {
        const initCamera = async () => {
            if (!currentCamera) return;
            try {
                const constraints = { video: { deviceId: { exact: currentCamera } } };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play(); // Ensures play() completes
                    setIsCameraOn(true);
                    if (!isPictureTaken) setTimeout(drawToCanvas, 300); // Delays drawing for Chrome
                }
            } catch (error) {
                console.error("Error accessing the camera: ", error);
                if (error.name === "NotAllowedError" || error.name === "SecurityError") {
                    setShowPermissionPopup(true);
                } else {
                    alert("Camera access is required. Please check your browser settings.");
                }
            }
        };
        initCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [currentCamera, isPictureTaken]);

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

    const sendToDrive = async () => {
        if (!imageBlob) return;
    
        gapi.auth2.getAuthInstance().signIn().then(async () => {
            const file = new Blob([imageBlob], { type: 'image/jpeg' });
            const metadata = {
                name: fileName,
                mimeType: 'image/jpeg',
            };
    
            // Step 1: Find or create the 'Ocorrencias' folder in Google Drive
            const ocorrenciasFolderId = await createOrFindFolder('1yE6cG3Kwakq1V0ZcI8liMfqF4tLc2E4h');
    
            // Step 2: Inside 'Ocorrencias', find or create the 'num_ocorrencia' folder
            const ocorrenciaFolderId = await createOrFindFolder(num_ocorrencia, ocorrenciasFolderId);
    
            if (!ocorrenciaFolderId) {
                alert('Erro ao criar a estrutura de pastas no Google Drive');
                return;
            }
    
            // Step 3: Upload the image file to the 'num_ocorrencia' folder
            const form = new FormData();
            metadata.parents = [ocorrenciaFolderId];
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', file);
    
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
                    alert('Foto enviada com sucesso para o Google Drive!');
                    setIsUploading(false);
                    setUploadProgress(0);
                    discardPicture();
                } else {
                    console.error('Erro no upload da foto para o Google Drive: ', xhr.responseText);
                    setIsUploading(false);
                }
            };
    
            xhr.onerror = () => {
                console.error('Erro no upload da foto para o Google Drive.');
                setIsUploading(false);
            };
    
            xhr.send(form);
        });
    };

    const drawToCanvas = () => {
        if (canvasRef.current && videoRef.current && !isPictureTaken) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            requestAnimationFrame(drawToCanvas);
        }
    };

    const takePicture = () => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            canvasRef.current.toBlob((blob) => {
                setImageBlob(blob);
                setIsPictureTaken(true);
                if (videoRef.current) videoRef.current.pause();
            }, 'image/jpeg');
        }
    };

    const savePicture = () => {
        if (!imageBlob) return;

        const url = window.URL.createObjectURL(imageBlob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'picture.jpg';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        resetCameraFeed();
    };

    const discardPicture = () => {
        setImageBlob(null);
        setIsPictureTaken(false);
        resetCameraFeed();
    };

    const resetCameraFeed = () => {
        if (videoRef.current) {
            videoRef.current.play();
            requestAnimationFrame(drawToCanvas);
        }
    };

    const handleClosePopup = () => {
        setShowPermissionPopup(false);
    };

    const handleBackClick = () => {
        window.history.back();
    };

    const switchCamera = () => {
        if (cameraDevices.length > 1) {
            const newIndex = (cameraDevices.findIndex(device => device.deviceId === currentCamera) + 1) % cameraDevices.length;
            setCurrentCamera(cameraDevices[newIndex].deviceId);
        }
    };

    return (
        <div>
            <AppBar style={{ backgroundColor: "#A0A0A0" }} position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleBackClick}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Ocorrência
                    </Typography>
                </Toolbar>
            </AppBar>

            <Dialog open={showPermissionPopup} onClose={handleClosePopup}>
                <DialogTitle>Permission Required</DialogTitle>
                <DialogContent>
                    <Typography>
                        Camera access is required to take a picture. Please enable camera access in your browser settings.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <Grid container spacing={3} padding={2} justifyContent="center">
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {isCameraOn && <canvas ref={canvasRef} style={{ width: '100%', borderRadius: 10 }} />}
                    </div>
                </Grid>

                <Grid item xs={12} container justifyContent="center">
                    {!isPictureTaken ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={takePicture}
                            startIcon={<CameraAltIcon />}
                            sx={{ minWidth: '200px', height: 60 }}
                        >
                            Tirar Foto
                        </Button>
                    ) : (
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={savePicture}
                                    startIcon={<SaveIcon />}
                                    fullWidth
                                    sx={{ height: 60 }}
                                >
                                    Guardar no dispositivo
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="contained"
                                    color="info"
                                    onClick={sendToDrive}
                                    startIcon={<SendIcon />}
                                    fullWidth
                                    sx={{ height: 60 }}
                                >
                                    Enviar para Gescorp
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={discardPicture}
                                    startIcon={<DeleteIcon />}
                                    fullWidth
                                    sx={{ height: 60 }}
                                >
                                    Descartar Foto
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Grid>

                <Grid item xs={12} container justifyContent="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={switchCamera}
                        startIcon={<FlipCameraAndroidIcon />}
                        sx={{ minWidth: '200px', height: 60 }}
                    >
                        Alternar Câmera
                    </Button>
                </Grid>
            </Grid>

            <video ref={videoRef} style={{ display: 'none' }} autoPlay></video>
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
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        marginTop: 16,
    },
    button_TakePicture: {
        width: "100%",
        height: 75,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginRight: "10%"
    },
    button_Save: {
        width: "35%",
        height: 75,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginRight: "5%"
    },
    button_Send: {
        width: "35%",
        height: 75,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    button_SwitchCamera: {
        width: "35%",
        height: 75,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    button_Discard: {
        width: "35%",
        height: 75,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        color: 'red',
    },
    canvas: {
        width: '100%',
        borderRadius: 10,
        display: 'block',
    },
};

export default TakePicturePosit;
