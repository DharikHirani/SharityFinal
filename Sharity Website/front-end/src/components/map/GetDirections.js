import { Google } from "react-bootstrap-icons";
import React, { Component } from "react";
import { withScriptjs } from "react-google-maps"; 

const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer();

const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer); 
};
document.getElementById("start").addEventListener("change", onChangeHandler);
document.getElementById("end").addEventListener("change", onChangeHandler);

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService.route(
        {
            origin: {
                query: document.getElementById("start").value,
            },
            destination: {
                query: document.getElementById("end").value,
            },
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );
}
