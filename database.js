const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '',
    database: "userconnect"       
  });
   
  // open the MySQL connection
  connection.connect(error => {
      if (error){
          console.log("A error has been occurred "
              + "while connecting to database.");        
          throw error;
      }
      console.log('Database userConnect connected')      
  });
  module.exports = connection