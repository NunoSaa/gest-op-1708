import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

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
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current.play(); // Ensure the video is playing
                    };
                    setIsCameraOn(true);
                    if (!isPictureTaken) {
                        requestAnimationFrame(drawToCanvas); // Start rendering the camera feed
                    }
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

    const drawToCanvas = () => {
        if (canvasRef.current && videoRef.current && !isPictureTaken) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth; // Set canvas width to video width
            canvasRef.current.height = videoRef.current.videoHeight; // Set canvas height to video height
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            requestAnimationFrame(drawToCanvas); // Continue rendering in real-time
        }
    };

    const takePicture = () => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            canvasRef.current.toBlob((blob) => {
                setImageBlob(blob);
                setIsPictureTaken(true); // Stop updating the canvas with real-time feed
                if (videoRef.current) {
                    videoRef.current.pause(); // Pause the video stream
                }
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

        resetCameraFeed(); // Resume the camera feed after saving the image
    };

    const discardPicture = () => {
        setImageBlob(null);
        setIsPictureTaken(false);
        resetCameraFeed(); // Resume the camera feed
    };

    const resetCameraFeed = () => {
        if (videoRef.current) {
            videoRef.current.play(); // Resume video playback
            requestAnimationFrame(drawToCanvas); // Resume real-time feed
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
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: "#A0A0A0" }}>
                    <IconButton edge="start" color="inherit" onClick={handleBackClick} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Ocorrência
                    </Typography>
                </Toolbar>
            </AppBar>

            <Dialog open={showPermissionPopup} onClose={handleClosePopup}>
                <DialogTitle>Permission Required</DialogTitle>
                <DialogContent>
                    <Typography>
                        Camera access is required to take a picture. Please enable camera access in your browser settings.
                        <br />
                        On iOS, go to: <strong>Settings &gt; Chrome &gt; Camera</strong> and allow access.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <div style={styles.container}>
                <div style={styles.rowInfo}>
                    {isCameraOn && (
                        <canvas ref={canvasRef} style={styles.canvas}></canvas>
                    )}
                </div>

                <div style={styles.rowInfo}>
                    {!isPictureTaken && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={takePicture}
                            style={styles.button_TakePicture}
                        >
                            Tirar Foto
                        </Button>
                    )}
                </div>

                {isPictureTaken && (
                    <div style={styles.rowInfoCentered}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={savePicture}
                            disabled={!imageBlob}
                            style={styles.button_Save}
                        >
                            Guardar no dispositivo
                        </Button>

                        <Button
                            variant="contained"
                            color="info"
                            disabled={!imageBlob}
                            style={styles.button_Send}
                        >
                            Enviar para Gescorp
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={discardPicture}
                            style={styles.button_Discard}
                        >
                            Descartar Foto
                        </Button>
                    </div>
                )}

                <div style={styles.rowInfoCentered}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={switchCamera}
                        style={styles.button_SwitchCamera}
                    >
                        Alternar Câmera
                    </Button>
                </div>
            </div>

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
