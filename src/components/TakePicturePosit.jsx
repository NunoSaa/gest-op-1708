import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TakePicturePosit = () => {
    const [imageBlob, setImageBlob] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const theme = useTheme();

    useEffect(() => {
        // Turn on the camera when the component mounts
        const initCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setIsCameraOn(true);
                }
            } catch (error) {
                console.error("Error accessing the camera: ", error);
                alert("Camera access is required to take a picture.");
            }
        };

        initCamera();

        return () => {
            // Clean up the camera stream when the component unmounts
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const takePicture = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            canvasRef.current.toBlob((blob) => {
                setImageBlob(blob); // Save the image blob
            }, 'image/jpeg');
        }
    };

    const savePicture = () => {
        if (!imageBlob) return;

        const url = window.URL.createObjectURL(imageBlob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'picture.jpg'; // Save the file as 'picture.jpg'
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
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
                        Ocorrência
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={styles.container}>

                <div style={styles.rowInfo}>
                    {isCameraOn && (
                        <video ref={videoRef} autoPlay style={styles.video}></video>
                    )}
                    {imageBlob && (
                        <img src={URL.createObjectURL(imageBlob)} alt="Captured" style={styles.image} />
                    )}
                </div>

                <div style={styles.rowInfo}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={takePicture}
                        style={styles.button_TakePicture}
                    >
                        Tirar Foto
                    </Button>
                </div>

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
                </div>
            </div>

            {/* Hidden canvas to capture the image */}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
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
    video: {
        width: '100%',
        borderRadius: 10,
    },
    image: {
        width: '100%',
        borderRadius: 10,
    },
};

export default TakePicturePosit;
