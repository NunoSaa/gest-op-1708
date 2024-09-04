import React, { useState, useEffect, useRef } from 'react';
import { Button, LinearProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const RecordAudioPosit = () => {
    const [audioBlob, setAudioBlob] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [progress, setProgress] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0); // State to hold the elapsed time in seconds
    const intervalRef = useRef(null);
    const theme = useTheme();

    useEffect(() => {
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
        a.download = 'recording.webm'; // Save the file as 'recording.webm'
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Convert elapsed time in seconds to a mm:ss format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div style={styles.container}>
            <div style={styles.rowInfo}>
                <h2>Audio POSIT</h2>
            </div>

            <div style={styles.rowInfo}>
                <LinearProgress variant="determinate" value={isRecording ? progress : 0} />
                {isRecording && (
                    <Typography variant="body1" style={{ marginTop: theme.spacing(1) }}>
                        Tempo de Gravação: {formatTime(elapsedTime)}
                    </Typography>
                )}
            </div>

            <div style={styles.rowInfo}>
                {audioBlob && (
                    <audio controls src={URL.createObjectURL(audioBlob)} style={styles.player}>
                        Your browser does not support the audio element.
                    </audio>
                )}
            </div>

            <div style={styles.rowInfo}>
                <Button
                    variant="contained"
                    color="primary"
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
                    disabled={!audioBlob}
                    style={styles.button_Send}
                >
                    Enviar para Gescorp
                </Button>
            </div>

        </div>
    );
};

const styles = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
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
}

export default RecordAudioPosit;
