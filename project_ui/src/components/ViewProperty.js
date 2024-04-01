import React from "react";
import { makeStyles } from '@material-ui/styles'
import { Dialog, Typography, Chip } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/NearMe';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    image: {
        width: '100%',
        objectFit: 'cover',
        height: '100%'
    },
    details: {
        padding: 20
    },
    location: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0px'
    },
    chipAmenity: {
        fontSize: 12,
        height: 20,
        margin: '0px 5px 0px 0px'
    },
})

export default function ViewProperty(props) {

    const classes = useStyles();
    const { open, setOpen, property } = props;
    //Code to View a Property in Detail

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className={classes.root}>
                <div>
                    <img src={property.imageURL} alt="img URL" className={classes.image} />
                </div>
                <div className={classes.details}>
                    <Typography style={{ fontWeight: 'bold' }}>{property.title}</Typography>
                    <Typography style={{ fontSize: 12 }}>{property.description}</Typography>
                    <div className={classes.location}>
                        <LocationOnIcon style={{ width: 16, height: 16 }} />
                        <Typography style={{ fontSize: 12 }}>{property.location}</Typography>
                    </div>
                    <Typography style={{ fontWeight: 'bold', paddingBottom: 10 }}>₹{property.price} / Day</Typography>
                    <div>
                        {property.amenities.map((amenity) => {
                            return (
                                <Chip label={amenity} className={classes.chipAmenity} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </Dialog>
    )
}