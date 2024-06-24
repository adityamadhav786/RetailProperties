import React, { useEffect, useContext, useState } from "react";
import axios from 'axios'
import { PropertiesContext } from "../context/PropertiesContext";
import { makeStyles } from "@material-ui/styles";
import PropertyCard from "../components/PropertyCard";
import Filter from "../components/Filter";
import PropertyTable from '../components/PropertyTable'

const useStyles = makeStyles({
    root:{
        backgroundColor: 'white',
        height: '100%',
        padding: '0px 40px 20px 40px'
    },
    properties:{
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
})

export default function LandingPage() {

    //Landing page of the application
    const classes = useStyles();
    const { properties, setProperties, setPropData, isGridView } = useContext(PropertiesContext)

    useEffect(()=>{
        //Axios GEt request to fetch all the property details
        axios.get('http://localhost:8888/getPropertyDetails/getPropertyDetails').then((res)=>{
            console.log("Properties : ",res)
            //Properties data that will be shown on the screen
            setProperties(res.data);
            //Complete Properties data
            setPropData(res.data)
        }).catch((err)=>{
            console.log("Error Occured : ", err)
        })
    },[])

    return (
        <div className={classes.root}>
            <div>
                {/* Filters being shown */}
                <Filter/>
            </div>
            <div className={classes.properties}>
                {isGridView ? properties.map((property, i)=>{
                    //Properties shown up in the form of card
                    return <PropertyCard property={property} i={i}/>
                })
                :
                //Properties shown up as table
                <PropertyTable/>
            }
            </div>
        </div>
    )
}