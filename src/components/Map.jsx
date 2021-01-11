import React from 'react';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Map({ data }) {
  const mapStyles = {
    height: "50vh",
    width: "100%"
  }

  const defaultCenter = {
    lat: data.lat,
    lng: data.lng
  }

  return (
    <LoadScript googleMapsApiKey='AIzaSyB-g3-KWzF9Wzr2uKdjqmtvF2iUgIz7sJ8'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={9} 
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  )
}
