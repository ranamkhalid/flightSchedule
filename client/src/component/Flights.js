import React, { useState, useEffect } from "react";
import { CsvToHtmlTable } from 'react-csv-to-table';
import Select from 'react-select'



export default function FetchData() {


const [originairportlist, setOriginairportlist] = useState(null);
const [destinationairportlist, setDestinationairportlist] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
const [origin, setOrigin] = useState(null);
const [destination, setDestination] = useState(null);

if(!loading) { 

  fetch("/originairportlist/")
  .then((response) => {
    if (response.ok) {
      return response.text();
    }
    throw response;
  })
  .then((data) => {
    const myArray = data.split("\n");

    const myOptions=myArray.map( (x,y) => {
      return { value : x, label : x };
    });

    setOriginairportlist(myOptions);
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
    setError(error);
  });


  fetch("/destinationairportlist/")
  .then((response) => {
    if (response.ok) {
      return response.text();
    }
    throw response;
  })
  .then((data) => {
    const myArray = data.split("\n");

    const myOptions=myArray.map( (x,y) => {
      return { value : x, label : x };
    });

    setDestinationairportlist(myOptions);
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
    setError(error);
  });
  setLoading(true);

}

function handleOriginChange(event) {
  setOrigin(event.value.substring(0,3));
}

function handleDestinationChange(event) {
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


return (
  <div>

   <table>
     <tr>
       <td align="right">
        <label>Origin</label>
       </td>
       <td width="300px;"> 
         <Select name="Origin" onChange={handleOriginChange}  options={originairportlist} />
       </td>
       <td align="right"> 
         <label>Destination</label>
       </td>
       <td width="300px;"> 
         <Select name="Destination" onChange={handleDestinationChange}  options={destinationairportlist} />
       </td>
       <td> 
         <button onClick={getData}>Fetch Data</button>
       </td>
     </tr>
   </table>

   <font size="2" weight="2" face="Courier New" >
     <strong>
      <CsvToHtmlTable
        data={data == undefined ? '' : data}
        csvDelimiter=","
        tableClassName="table table-striped table-hover"
      />
      </strong>
    </font>

  </div>
);


}