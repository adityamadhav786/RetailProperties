import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Checkbox, Chip, Paper, Typography } from "@material-ui/core"
import { PropertiesContext } from "../context/PropertiesContext";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LocationOnIcon from '@material-ui/icons/NearMe';
import ViewProperty from "./ViewProperty";
import axios from "axios";


const useStyles = makeStyles({
    property: {
        backgroundColor: 'beige',
        width: '250px',
        margin: '10px 20px 10px 20px',
        height: 'auto',
        borderRadius: '10px'
    },
    image: {
        height: 170,
        objectFit: 'cover',
        width: 'inherit',
        borderRadius: '10px 10px 0px 0px'
    },
    details: {
        padding: '5px',
        paddingTop: 0
    },
    name: {
        fontSize: 14,
        // fontWeight: 'bold'
    },
    headline: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    location: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 0px'
    },
    chipAmenity: {
        fontSize: 12,
        height: 20,
        margin: '0px 5px 0px 0px'
    },
    buttonText: {
        color: 'blue',
        fontSize: 12,
        fontWeight: 'bold',
        padding: '5px 5px',
        cursor: 'pointer'
    }
})

export default function PropertyCard(props) {
    const { property, i } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { properties, setProperties } = useContext(PropertiesContext)

    const setFavourites = (id) => {
        //API to update the favourites in the databse
        axios.get(`http://localhost:8888/updateFavourites?id=${id}&favourite=${!property.isFavourite}`).then((res)=>{
            console.log("Favourites Updated")
        }).catch((err)=>{
            console.log("Error Occured : ", err)
        })
        
        let data = [...properties];
        data[i].isFavourite = !data[i].isFavourite
        setProperties(data);
    }

    return (
        <Paper className={classes.property}>
            {/* View Property in Detail, This will called up when open is set to true for that property */}
            <ViewProperty open={open} setOpen={setOpen} property={property} />
            <img src={property.imageURL} alt="IMG URL" className={classes.image}/>
            <div className={classes.details}>
                <div className={classes.headline}>
                    <div className={classes.name}>
                        {property.title}
                    </div>
                    <div>
                        <Checkbox
                            icon={<FavoriteBorderIcon />}
                            checkedIcon={<FavoriteIcon />}
                            style={{ padding: 5 }}
                            checked={property.isFavourite}
                            onChange={()=>setFavourites(property._id)}
                        />
                    </div>
                </div>
                <div className={classes.price}>
                    ₹{property.price} / Day
                </div>
                <div className={classes.location}>
                    <LocationOnIcon style={{ width: 16, height: 16 }} />
                    <Typography style={{ fontSize: 12 }}>{property.location}</Typography>
                </div>
                <div>
                    {property.amenities.filter((am, i) => i === 0 || i === property.amenities.length - 1 || i === property.amenities.length - 2).map((amenity) => {
                        //Displaying all amenities one by one in the form of chips
                        return (
                            <Chip label={amenity} className={classes.chipAmenity} />
                        )
                    })}
                    <Chip label='+ Many More' className={classes.chipAmenity} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Setting open to true, so prroperty details will open up */}
                    <Typography className={classes.buttonText} onClick={() => setOpen(true)}>
                        View Details
                    </Typography>
                    {/* Actions for the property, Book Now will mail to the concerned authority */}
                    <Typography className={classes.buttonText} onClick={() => window.location.href = `mailto:adityamadhav786@gmail.com?subject=Booking : ${property._id} - ${property.title}&body=Please book the hotel`}>
                        Book Now
                    </Typography>
                </div>

            </div>
        </Paper>
    )
}