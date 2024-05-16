import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


function CheckList() {

    let navigate = useNavigate()

    const handleClickABSC01 = () => {
        window.open('https://docs.google.com/forms/d/1V31uXzaizIpdCa9SST_C1Ge3oAx_tec0FU4nbxh_TGQ/viewform?edit_requested=true', '_blank');
    };

    const handleClickABSC02 = () => {
        window.open('https://docs.google.com/forms/d/1eTDl5t12FewHGxoRUGxjj0-GinxsXhQa40A_J5_sMm4/viewform?pli=1&pli=1&edit_requested=true', '_blank');
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

    const handleClickVFCI07 = () => {
        window.open('https://docs.google.com/forms/d/1nqPHwI1Tjv3ifDKPm716pc57xaZhhUJ5RWxwDrixhH4/viewform?edit_requested=true', '_blank');
    };

    const handleClickVFCI08 = () => {
        window.open('https://docs.google.com/forms/d/1uWv-_7IjDAy2Yyw4kPn2hfcbY0Thbbfb3JRkYtIhHV4/viewform?edit_requested=true', '_blank');
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


    return (
        <div style={styles.center}>
            <div style={styles.container}>
            <div style={styles.row}>
                    <Button style={styles.button_ABSC} variant="contained" onClick={handleClickABSC01}>ABSC 01</Button>
                    <Button style={styles.button_ABSC} variant="contained" onClick={handleClickABSC02}>ABSC 02</Button>
                </div>
                <div style={styles.row}>
                    <Button style={styles.button_ABSC} variant="contained" onClick={handleClickABSC03}>ABSC 03</Button>
                    <Button style={styles.button_ABSC} variant="contained" onClick={handleClickABSC04}>ABSC 04</Button>
                </div>
                <div style={styles.row}>
                    <Button style={styles.button_VUCI} variant="contained" onClick={handleClickVUCI01}>VUCI 01</Button>
                    <Button style={styles.button_VUCI} variant="contained" onClick={handleClickVECI02}>VECI 02</Button>
                </div>
                <div style={styles.row}>
                    <Button style={styles.button_VUCI} variant="contained" onClick={handleClickVFCI07}>VFCI 07</Button>
                    <Button style={styles.button_VUCI} variant="contained" onClick={handleClickVFCI08}>VFCI 08</Button>
                </div>
                <div style={styles.row}>
                    <Button style={styles.button_VUCI} variant="contained" onClick={handleClickVTTU01}>VTTU 01</Button>
                    <Button style={styles.button_VUCI} variant="contained" onClick={handleClickVOPE05}>VOPE 05</Button>
                </div>
                <div style={styles.row}>
                    <Button style={styles.button_VCOT} variant="contained" onClick={handleClickVCOT01}>VCOT 01</Button>
                    <Button style={styles.button_VCOT} variant="contained" onClick={handleClickVCOT01}>VCOT 02</Button>
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
        //justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 25,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    button_ABSC: {
        width: 150, // Set the width and height to create square buttons
        height: 150,
        backgroundColor: '#46D8FF',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        flex: 1, // Each button takes up equal space within the row
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    button_VUCI: {
        width: 150, // Set the width and height to create square buttons
        height: 150,
        backgroundColor: '#FF6666',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        flex: 1, // Each button takes up equal space within the row
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    button_VCOT: {
        width: 150, // Set the width and height to create square buttons
        height: 150,
        backgroundColor: '#A0A0A0',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        flex: 1, // Each button takes up equal space within the row
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
}

export default CheckList;
