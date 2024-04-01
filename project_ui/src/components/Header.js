import React from "react";
import { makeStyles } from '@material-ui/styles'
import logo from '../img/logo.png'
import Avatar from '../img/avatar.png'

const useStyles = makeStyles({
    header: {
        height: 'auto',
        color: "white",
        backgroundColor: "#104dab",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 20px',
        flexWrap: 'wrap'
    }
})

export default function Header() {

    const classes = useStyles();

    return (
        <div className={classes.header}>
            {/* Header for Application */}
            <div>
                <img src={logo} alt='logo' style={{ height: 35 }} />
            </div>
            <div style={{ fontSize: 24 }}>
                REAL ESTATE PROPERTIES
            </div>
            <div>
                <img alt="avatar" src={Avatar} style={{ height: 60 }} />
            </div>
        </div>
    )
}