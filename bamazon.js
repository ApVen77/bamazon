var mysql = require("mysql");       ///////required packages///////
var inquirer = require("inquirer");

var connection = mysql.createConnection({  ///////connect to db///////
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "bamazon_db"

});
connection.connect(function (err) {
    if (err) {
        console.log("connnecting err: " + err);
    }
    viewAll();
})

function viewAll() {     ////////inquirer begins////////
    inquirer.prompt([
        { 
            type: "confirm",
            name: "confirm",
            message: "Welcome to BAMAZON! The Specail Store for Employees Wold you like to shop around?",
            default: true

    }]).then(function(user){
        if (user.confirm === true) {
            askForID();
        } else {
            console.log("Please return for some employeer rights ANYTIME!")
        }
    })
}
    connection.query("SELECT * FROM product", function (err, data) {
        if (err) throw err;
        //console.log(data);
        console.table(data);
        askForID(data);

    });

function askForID(data) {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What is the ID of the product you'd like to get?",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
    },
     {
        type: "input",
        name: "qty",
        message: "How much would you like to purchase?",
        validate: function (value) {
            if (isNaN(value)) {
                return 'please enter a number';
            } else {
                return true;
            }
        }
    }
    ]).then(function (answer) {
        
        if(answer.stockquantity > res[0].StockQuantity){
			console.log('Insufficient Quantity');
			console.log('This order has been cancelled');
			console.log('');
			newOrder();
		}
		else{
			amountOwed = res[0].Price * answer.selectQuantity;
			currentDepartment = res[0].departmentname;
			console.log('Thanks for your order');
			console.log('You owe $' + amountOwed);
			console.log('');
			//update products table
			connection.query('UPDATE products SET ? Where ?', [{
				StockQuantity: res[0].StockQuantity - answer.selectQuantity
			},{
				id: answer.askForID
			}], function(err, res){});
			//update departments table
			logSaleToDepartment();
			newOrder();
		}
	})
    connection.query('SELECT * FROM products WHERE id = ?', [answer.askForID], function(err, res) {})
};

//Allows the user to place a new order or end the connection
function newOrder(){
	inquirer.prompt([{
		type: 'confirm',
		name: 'choice',
		message: 'Would you like to place another order?'
	}]).then(function(answer){
		if(answer.choice){
			placeOrder();
		}
		else{
			console.log('You got Social Justice at Bamazon, thank you!');
			connection.end();
		}
	})
};


//functions to push the sales to the executive table
function logSaleToDepartment(){
	connection.query('SELECT * FROM departments WHERE departmentName = ?', [currentDepartment], function(err, res){
		updateSales = res[0].TotalSales + amountOwed;
		updateTable();
	})
};

function updateTable(){
		connection.query('UPDATE departments SET ? WHERE ?', [{
		TotalSales: updateSales
	},{
		DepartmentName: currentDepartment
	}], function(err, res){});
};


        // var userEnteredId = answer.id;
        // var product = checkForId(userEnteredId, data);
        // if (product) {
        //     askForQuantity(product);
        // } console.log("")

viewAll();



