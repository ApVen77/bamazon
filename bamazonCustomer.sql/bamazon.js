var inquirer = require("inquirer");

var connection= mysql.createConnection({
host: "localhost",
port: 3306,
user:"root",
password:"root",
database: "bamazondb"

}); 

connection.connect(function(err) {
if (err) throw err;

console.log(`Connected as id ${connection.threadId}`)


});