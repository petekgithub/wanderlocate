import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import mapStyles from "./mapStyles";

// styles
import useStyles from "./styles";

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width: 600px)");

  //console.log("weatherData:" + weatherData);

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => {
          return (
            <div
              key={i}
              lat={place.latitude}
              lng={place.longitude}
              className={classes.markerContainer}
            >
              {isDesktop ? (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    alt={place.name}
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    }
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              ) : (
                <LocationOnOutlinedIcon
                  color="primary"
                  fontSize={isDesktop ? "large" : "small"}
                />
              )}
            </div>
          );
        })}
        {/* Hava durumu ikonunu haritada gösterme */}
        {weatherData?.data?.length &&
          weatherData.data.map((data, i) => (
            <div key={i} lat={data.lat} lng={data.lon}>
              <img
                src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`}
                height="70px"
                alt={data.weather.description}
              />
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
