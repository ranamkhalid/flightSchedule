# flightSchedule
This web application allows a user to search for flights and display the results in a tabular view.

Backend API is written in node.js with express server. Code resides in server folder.
In order to start the server to respond to API calls: 

  cd server
  
  npm run dev
  
Make sure you have node and express installed via npm install express and npm install node
Also, we are using cvs to html package so install it as follows.
cd server 
npm install csv-filter-sort

Data stored in csv files under "Data" folder.

UI is build in react.js
Once backend server is opereational with the following messaage in terminal
 
[nodemon] starting `node server.js`
It is alive on http://localhost:5000





Open another terminal and install following packages (You need to install Only first time)



  cd client
  
  npm install react-csv-to-table
  
  npm install  react-select
  

start UI via 

  npm start 
  

which will open application in a browser at http://localhost:3000

To check APIs use following URLs:

http://localhost:5000/originairportlist/ (To get a list of all airports from Origin/Name columns)

http://localhost:5000/destinationairportlist/ (To get a list of all airports from Destination/Name columns)

http://localhost:5000/flights/FRA/SEA  (To get a flight schedule of all flights originated from FRA OR ended at SEA)
                                        
UI allows users to just type few letters to search for any flight origin or destination and if both are selected result is a cumulative total of all flightss originated or ended at those airports. 

It shows data in tabular format but it can be imroved via some CSS stylesheets. Didn't have time so it is pretty basic.


