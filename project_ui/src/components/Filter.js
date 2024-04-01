import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/styles'
import { TextField, Typography, Checkbox, Button } from "@material-ui/core";
import { Autocomplete, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ChevronLeft, TableChart, Apps } from '@material-ui/icons'
import { PropertiesContext } from "../context/PropertiesContext";
import { amenities, filterTypes } from "../constants";

const useStyles = makeStyles({
    filterTabs: {
        padding: 20,
        display: 'flex',
        flexWrap: 'wrap'
    },
    autocomplete: {
        '& .MuiAutocomplete-inputRoot': {
            fontSize: 12,
            paddingRight: '25px!important',
            padding: 0
        },
        margin: '5px'
    },
    autoCompleteFilter: {
        '& .MuiAutocomplete-option': {
            paddingLeft: '5px!important',
            paddingRight: '5px!important'
        }
    },
    toggleButton: {
        '&.MuiToggleButton-root.Mui-selected': {
            color: 'white',
            backgroundColor: '#104dab!important'
        },
        margin: 5
    },
    toggleButtonGroup: {
        '&.MuiToggleButton-root.Mui-selected': {
            color: 'white',
            backgroundColor: '#104dab!important'
        }
    }

})

export default function Filter() {

    const classes = useStyles();
    // Sorting options
    const sortingOptions = ['Default', 'Location Name A-Z', 'Location Name Z-A', 'Price']
    const [sortValue, setSortValue] = useState();
    //Filters for Title, Locations and Amenities
    const [filters, setFilters] = useState({
        title: [],
        location: [],
        amenities: []
    });
    //Filter for filtering favourites properties
    const [isFavourite, setIsFavourite] = useState(false);
    const { properties, setProperties, propData, isGridView, setIsGridView } = useContext(PropertiesContext)

    const handleSortChange = (e) => {
        setSortValue(e.target.textContent)

        let data = [...properties];
        switch (e.target.textContent) {
            case sortingOptions[1]:
                //Sorting for Ascending
                data.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
                setProperties(data)
                break;
            case sortingOptions[2]:
                // Sorting for Descending
                data.sort((a, b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0))
                setProperties(data)
                break;
            case sortingOptions[3]:
                // Sorting based on price
                data.sort((a, b) => a.price - b.price)
                setProperties(data)
                break;
            default:
                //Default Sorting based on ids
                data.sort((a, b) => a._id - b._id)
                setProperties(data)
                break;
        }
    }

    const handleFilterChange = (checked, option, fil) => {
        let temp = { ...filters };
        //Setting filters based on selected options
        if (checked) {
            temp[`${fil}`] = temp[`${fil}`].filter((item) => item !== option)
        } else {
            temp[`${fil}`].push(option)
        }
        setFilters(temp)
    }

    useEffect(() => {
        //Filtering Properties based on applied filters
        let temp = [...propData];
        temp = temp.filter((item) =>
            (filters.title.length === 0 ? true : filters.title.includes(item.title)) &&
            (filters.location.length === 0 ? true : filters.location.includes(item.location)) &&
            (filters.amenities.length === 0 ? true : filters.amenities.every((element) => item.amenities.includes(element)))
        )
        setProperties(temp);
    }, [filters])

    useEffect(() => {
        //Filtering Properties based on favourite fliters
        let temp = [...properties];
        isFavourite ? (temp = temp.filter((item) => item.isFavourite)) : (temp = [...propData])
        setProperties(temp)
    }, [isFavourite])

    return (
        <div className={classes.filterTabs}>
            {/* Autocomplete Search box for Sorting  */}
            <Autocomplete
                closeIcon={false}
                options={sortingOptions}
                value={sortValue}
                className={classes.autocomplete}
                popupIcon={<ChevronLeft style={{ rotate: '270deg' }} />}
                renderOption={(option) => <Typography style={{ fontSize: 12 }}>{option}</Typography>}
                onChange={(e) => handleSortChange(e)}
                renderInput={(params) => <TextField style={{ fontSize: 12, width: 150 }} {...params} placeholder="Sort By" variant="outlined" />}
            />

            {
                //Autocomplete search boxes in loop for Location, Title and Amenities filters
                filterTypes.map((filterType) => {
                    let fil = filterType.id;
                    const filterValue = fil === 'amenities' ? amenities : propData.map((property) => property[`${fil}`]);
                    return (
                        <Autocomplete
                            closeIcon={false}
                            multiple={true}
                            openOnFocus
                            options={filterValue}
                            disableCloseOnSelect
                            value={filters[`${fil}`]}
                            className={classes.autocomplete || classes.autoCompleteFilter}
                            popupIcon={<ChevronLeft style={{ rotate: '270deg' }} />}
                            renderOption={(option) => {
                                let ifchecked = filters[`${fil}`].includes(option)
                                return (
                                    <div style={{ display: 'flex', alignItems: 'center' }}
                                        onClick={() => handleFilterChange(ifchecked, option, fil)}>
                                        <Checkbox
                                            checked={ifchecked === true}
                                            style={{ padding: 0 }}
                                        />
                                        <Typography style={{ fontSize: 12, paddingLeft: 5 }} >{option}</Typography>
                                    </div>
                                )
                            }}
                            renderInput={(params) => <TextField style={{ fontSize: 12, width: 200 }} {...params} placeholder={filterType.label} variant="outlined" />}
                            renderTags={(tagValue, getTagProps) => null}
                        />
                    )
                })
            }

            {/* Toggle Button for isFavourite Filter */}
            <ToggleButton
                selected={isFavourite}
                onChange={() => {
                    setIsFavourite(!isFavourite);
                }}
                className={classes.toggleButton}
                style={{ padding: '0px 11px', textTransform: 'unset', height: 33 }}
            >
                <Typography style={{ fontSize: 12 }}>Show Only Favourites</Typography>
            </ToggleButton>

            {/* Button to Clear all filters and show default data */}
            <Button
                style={{ height: 33, alignSelf: 'center', fontSize: 12, textTransform: 'unset', borderRadius: 0 }}
                variant="outlined"
                onClick={() =>
                    setFilters({
                        title: [],
                        location: [],
                        amenities: []
                    })
                }
            >Clear Filters</Button>

            {/* Toggle button group to switch between tabular and Grid Cards View */}
            <ToggleButtonGroup
                value={isGridView}
                exclusive
                onChange={() => setIsGridView(!isGridView)}
                style={{ height: 33, alignSelf: 'center', marginLeft: 'auto' }}
            >
                <ToggleButton className={classes.toggleButtonGroup} value={false}>
                    <TableChart />
                </ToggleButton>
                <ToggleButton className={classes.toggleButtonGroup} value={true}>
                    <Apps />
                </ToggleButton>

            </ToggleButtonGroup>
        </div>
    )
}