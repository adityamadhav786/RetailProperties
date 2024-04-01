import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles'
import { Button } from "@material-ui/core";
import ViewProperty from "./ViewProperty";


const useStyles = makeStyles({
    button: {
        backgroundColor: '#104dab',
        fontSize: 12,
        color: 'white',
        textTransform: 'unset',
        padding: '3px 16px',
        margin: '5px',
        '&.MuiButton-contained:hover': {
            backgroundColor: 'black'
        }
    }
})

export default function Actions(props) {
    const { property } = props;
    const [open, setOpen] = useState(false)
    const classes = useStyles();

    //Actions being displayed in the Action column for Properties table
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <ViewProperty open={open} setOpen={setOpen} property={property} />
            <Button variant="contained" className={classes.button} onClick={() => setOpen(true)}>View Details</Button>
            <Button variant="contained" className={classes.button} onClick={() => window.location.href = `mailto:adityamadhav786@gmail.com?subject=Booking : ${property._id} - ${property.title}&body=Please book the hotel`}>Book Now</Button>
        </div>
    )
}