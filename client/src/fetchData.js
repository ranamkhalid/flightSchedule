import React, { useState, useEffect } from "react";



export default function FetchData() {

  
const [data, setData] = useState(null);
const [origin, setOrigin] = useState(null);
const [destination, setDestination] = useState(null);
const [originairportlist, setOriginairportlist] = useState(null);
const [destinationairportlist, setDestinationairportlist] = useState(null);
const [error, setError] = useState(null);



function handleOriginChange(event) {
    console.log(event);
    setOrigin(event.value.substring(0,3));
  }

function handleDestinationChange(event) {
    console.log(event);
    setDestination(event.value.substring(0,3));
  }

 function getData(){ 

    console.log("/flights/" + origin + "/" + destination);
    fetch("/flights/" + origin + "/" + destination)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
 }

fetch("/originairportlist/")
  .then((response) => {
    if (response.ok) {
      return response.text();
    }
    throw response;
  })
  .then((data) => {
    setOriginairportlist(data);
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
  }); 

fetch("/destinationairportlist/")
  .then((response) => {
    if (response.ok) {
      return response.text();
    }
    throw response;
  })
  .then((data) => {
    setDestinationairportlist(data);
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
  });
}