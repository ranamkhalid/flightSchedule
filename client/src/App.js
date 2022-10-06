import React, { useState, useEffect } from "react";
import { CsvToHtmlTable } from 'react-csv-to-table';
import Select from 'react-select'
import OriginAirports from './origin.js';
import DestinationAirports from './destination.js';
import FetchData from './fetchData.js';
import './App.css';

export default function App() {

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


  if (error) return "Error Fetching Data!. Please make sure backend API is running and try again.";
 
  return (

    <div>
     <table>
       <tr>
         <td align="right">
          <label>Origin</label>
         </td>
         <td width="300px;"> 
              <Select name="Origin"  onChange={handleOriginChange} options={OriginAirports} />
         </td>
         <td align="right"> 
           <label>Destination</label>
         </td>
         <td width="300px;"> 
           <Select name="Destination" onChange={handleDestinationChange}  options={DestinationAirports} />
         </td>
         <td> 
           <button onClick={getData}>Fetch Data</button>
         </td>
       </tr>
     </table>

    <CsvToHtmlTable
      data={data == undefined ? '' : data}
      csvDelimiter=","
      tableClassName="table table-striped table-hover"
    />

    </div>
  );
}

