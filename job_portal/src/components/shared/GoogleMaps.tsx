"use client";
import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const GoogleMaps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBPDjB2qkV4Yxn9h0tGSk2X5uH6NKmssXw",
  });
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds({ lat: 37.4224764, lng: -122.0842499 });
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);
  return (
    <>
      {/* <iframe
                    src={details.location_link}
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe> */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.4549146802387!2d77.61387567758644!3d13.133680087196865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae231888f94f07%3A0xe6ee2d2bac345bee!2sDerive%20Management%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1721712491832!5m2!1sen!2sin"
        width="600"
        height="520"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
};

export default GoogleMaps;
