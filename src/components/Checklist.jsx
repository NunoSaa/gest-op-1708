import React from 'react';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function CheckList() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickABSC01 = () => {
        window.open('https://docs.google.com/forms/d/1V31uXzaizIpdCa9SST_C1Ge3oAx_tec0FU4nbxh_TGQ/viewform?edit_requested=true', '_blank');
    };

    const handleClickVOPE06 = () => {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSdqY03k-Ff6ZI3HFKVR4xV68tnYjkp4JQJXESZsS4LMqsZNLw/viewform?vc=0&c=0&w=1&flr=0', '_blank');
    };

    const handleClickABSC03 = () => {
        window.open('https://docs.google.com/forms/d/14_EdGJ4nX6b5ZzR0xk9LBkXU53lxx-Dk1_jsMcOZ-e8/viewform?edit_requested=true', '_blank');
    };

    const handleClickABSC04 = () => {
        window.open('https://docs.google.com/forms/d/1hq5--qH-eiT6rqYXSQLxaBX6lvoeWHlieN-eA6_4Dm4/viewform?edit_requested=true', '_blank');
    };

    const handleClickVECI02 = () => {
        window.open('https://docs.google.com/forms/d/1u-LtigHoX00-V82lojevYbklrGGxBw_DG375RS_d5Ek/viewform?edit_requested=true', '_blank');
    };

    const handleClickVUCI01 = () => {
        window.open('https://docs.google.com/forms/d/1DotQjGGF2TA2sT58IofFJ5DH4Lx--LA0lA9yaimep7Q/viewform?edit_requested=true', '_blank');
    };

    const handleClickVFCI06 = () => {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLScjD7RPCQpMDGgdnQZGddy9hWE3qja4n_zGJd-EhBvht2zU1w/viewform?vc=0&c=0&w=1&flr=0', '_blank');
    };

    const handleClickVFCI07 = () => {
        window.open('https://docs.google.com/forms/d/1nqPHwI1Tjv3ifDKPm716pc57xaZhhUJ5RWxwDrixhH4/viewform?edit_requested=true', '_blank');
    };

    const handleClickVFCI08 = () => {
        window.open('https://docs.google.com/forms/d/1uWv-_7IjDAy2Yyw4kPn2hfcbY0Thbbfb3JRkYtIhHV4/viewform?edit_requested=true', '_blank');
    };

    const handleClickVFCI09 = () => {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSdrsdDnbcBZtedWnJxN0RXeLhPoxoJ4K1lxkcbfuv95ZVLW4Q/viewform?vc=0&c=0&w=1&flr=0', '_blank');
    };

    const handleClickVTTU01 = () => {
        window.open('https://docs.google.com/forms/d/1Wjxrvbu0N2AHxVBa3RTQkOQXE8T2Ck0TLePlnx6kT6k/viewform?edit_requested=true', '_blank');
    };

    const handleClickVOPE05 = () => {
        window.open('https://docs.google.com/forms/d/1AGcuwOfth_bBQHR7StoALcEsJt6tZrJKadNpCOUT45o/viewform?edit_requested=true', '_blank');
    };

    const handleClickVCOT01 = () => {
        window.open('https://docs.google.com/forms/d/1kJw7gVGV93Ot0erDtCzc7q0tKtcMlot1T2CUjBJHBTc/viewform?edit_requested=true', '_blank');
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
                        HomePage
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={styles.center}>
                <div style={styles.container}>
                    <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <Button style={styles.button_ABSC} variant="contained" onClick={handleClickABSC01}>ABSC 01</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button style={styles.button_ABSC} variant="contained" onClick={handleClickABSC03}>ABSC 03</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button style={styles.button_ABSC} variant="contained" onClick={handleClickABSC04}>ABSC 04</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button style={styles.button_ABSC} variant="contained" onClick={handleClickVOPE06}>VOPE 06</Button>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Button style={styles.button_VUCI} variant="contained" onClick={handleClickVUCI01}>VUCI 01</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button style={styles.button_VUCI} variant="contained" onClick={handleClickVECI02}>VECI 02</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button style={styles.button_VUCI} variant="contained" onClick={handleClickVFCI06}>VFCI 06</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button style={styles.button_VUCI} variant="contained" onClick={handleClickVFCI07}>VFCI 07</Button>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Button style={styles.button_VUCI} variant="contained" onClick={handleClickVFCI08}>VFCI 08</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button style={styles.button_VUCI} variant="contained" onClick={handleClickVFCI09}>VFCI 09</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button style={styles.button_VUCI} variant="contained" onClick={handleClickVTTU01}>VTTU 01</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button style={styles.button_VUCI} variant="contained" onClick={handleClickVOPE05}>VOPE 05</Button>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Button style={styles.button_VCOT} variant="contained" onClick={handleClickVCOT01}>VCOT 01</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button style={styles.button_VCOT} variant="contained" onClick={handleClickVCOT01}>VCOT 02</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

const styles = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "white",
        flex: 1,
        alignItems: 'center',
        padding: 20,
        marginTop: 25,
    },
    button_ABSC: {
        width: '100%', // Full width for responsiveness
        height: '30vh',
        backgroundColor: '#46D8FF',
        padding: 20,
        borderRadius: 10,
    },
    button_VUCI: {
        width: '100%', // Full width for responsiveness
        height: '30vh',
        backgroundColor: '#FF6666',
        padding: 20,
        borderRadius: 10,
    },
    button_VCOT: {
        width: '100%', // Full width for responsiveness
        height: '30vh',
        backgroundColor: '#A0A0A0',
        padding: 20,
        borderRadius: 10,
    },
};

export default CheckList;
