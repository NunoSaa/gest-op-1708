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

const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');

const TakePicturePosit = () => {
    const [imageBlob, setImageBlob] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [showPermissionPopup, setShowPermissionPopup] = useState(false);
    const [isPictureTaken, setIsPictureTaken] = useState(false);
    const [currentCamera, setCurrentCamera] = useState(null);
    const [cameraDevices, setCameraDevices] = useState([]);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

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

    setTimeout(() => {
        canvasRef.current.width = videoRef.current.videoWidth || 640; // Set default if zero
        canvasRef.current.height = videoRef.current.videoHeight || 480;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }, 500); // Adjust delay as necessary

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
            <AppBar style={{ backgroundColor: "#A0A0A0" }}position="static">
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
