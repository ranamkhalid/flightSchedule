const app = require('express')();
const PORT = 5000;


app.get('/flights/:origin/:destination', (req,res) => {

    const id = req.params;
	const csvFilterSort = require('csv-filter-sort');
	let originResult;
	let destinationResult;

	const filterOptionsOrigin = {
	    hasHeader: true,
	    columnToFilter: 'origin',
	    filterCriteria: id.origin,
	    filterType: 'EXACT'
	}

	const filterOptionsDestination = {
	    hasHeader: true,
	    columnToFilter: 'destination',
	    filterCriteria: id.destination,
	    filterType: 'EXACT'
	}

	const fs = require('fs')
	fs.readFile('../data/flights.csv', 'utf8', function (err, data) {

		csvFilterSort.filter(data, filterOptionsOrigin, function (err, filteredCsvOrigin) {
		    if (err) {
		        return err;
		    }
		    originResult = filteredCsvOrigin;
		});	
	

		csvFilterSort.filter(data, filterOptionsDestination, function (err, filteredCsvDest) {
		    if (err) {
		        return err;
		    }
		    destinationResult = filteredCsvDest;
		});	

		res.status(200).send(originResult+destinationResult)

	})    
})

app.get('/originairportlist/', (req,res) => {

	const fs = require('fs')
	var listOfAirports = fs.readFileSync('../data/originairports.csv').toString(); //.split("\n");
	res.status(200).send(listOfAirports)

})


app.get('/destinationairportlist/', (req,res) => {

	const fs = require('fs')
	var listOfAirports = fs.readFileSync('../data/destinationairports.csv').toString();
  
	res.status(200).send(listOfAirports)

})


app.listen(
	PORT,
	() => console.log('It is alive on http://localhost:5000')
)


 