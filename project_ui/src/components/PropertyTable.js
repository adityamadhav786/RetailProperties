import React, { useContext } from "react";
import { makeStyles } from '@material-ui/styles'
import { Paper, TableBody, TableContainer, TableHead, Table, TableRow, TableCell, Typography, Chip, Checkbox } from "@material-ui/core";
import { propertyColumns } from "../constants";
import { PropertiesContext } from "../context/PropertiesContext";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from "axios";
import Actions from "./Actions";

const useStyles = makeStyles({
    tableCell: {
        '&.MuiTableCell-root': {
            padding: 8
        }
    },
    tableRows: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#fff'
        },
        '&:nth-of-type(even)': {
            backgroundColor: '#bee5eb'
        }
    },
    chip: {
        margin: 5,
        fontSize: 12,
        borderRadius: 3,
        height: 20
    },

})

export default function Header() {

    const classes = useStyles();
    const { properties, setProperties } = useContext(PropertiesContext)

    const setFavourites = (id, property, i) => {
        //API to update the favourite in the database
        axios.get(`http://localhost:8888/updateFavourites?id=${id}&favourite=${!property.isFavourite}`).then((res) => {
            console.log("Favourites Updated")
        }).catch((err) => {
            console.log("Error Occured : ", err)
        })

        //Update Favourite State
        let data = [...properties];
        data[i].isFavourite = !data[i].isFavourite
        setProperties(data);
    }

    return (
        <>
            <Paper style={{ width: '100%' }}>
                <TableContainer style={{ overflowY: 'auto' }}>
                    <Table>
                        <TableHead style={{ backgroundColor: '#dadada' }}>
                            <TableRow>
                                {propertyColumns.map((column) => {
                                    return (
                                        <TableCell className={classes.tableCell}>
                                            <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>{column.label}</Typography>
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {properties.map((property, i) => {
                                return (
                                    <TableRow className={classes.tableRows}>
                                        {propertyColumns.map((column) => {
                                            return (
                                                <TableCell className={classes.tableCell}>
                                                    {column.id === 'amenities' ? <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                        {property[column.id].map((amenity) => {
                                                            return (
                                                                <Chip label={amenity} className={classes.chip} />
                                                            )
                                                        })}
                                                    </div> :
                                                        column.id === 'action' ?
                                                            <Actions property={property} /> :
                                                            column.id === 'favourites' ?
                                                                <Checkbox
                                                                    icon={<FavoriteBorderIcon />}
                                                                    checkedIcon={<FavoriteIcon />}
                                                                    style={{ padding: 5 }}
                                                                    checked={property.isFavourite}
                                                                    onChange={() => setFavourites(property._id, property, i)}
                                                                /> :
                                                                <Typography style={{ fontSize: 12 }}>{column.id === 'price' ? `₹${property.price} / Day` : property[column.id]}</Typography>}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )
}