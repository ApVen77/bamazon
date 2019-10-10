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
            message: "Welcome to BAMAZON! The Specail Store for Employees Would you like to shop around?",
            default: true

        }]).then(function (user) {
            if (user.confirm === true) {
                connection.query("SELECT * FROM product", function (err, data) {
                    if (err) throw err;
                    console.table(data);
                    askForID(data);

                });

            } else {
                console.log("Please return for some employeer rights ANYTIME!")
            }
        })
}

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
        }
    ]).then(function (answer) {
        var userEnteredId = parseInt(answer.id);
        console.log("user id: " + userEnteredId)
        var product = checkForId(userEnteredId, data);
        console.log("product : " + product)
        if (product) {
            askForQuantity(product);
        } else {
            console.log("Sorry not availiable!")
            viewAll();
        }

    });
}
function askForQuantity(product) {
    inquirer.prompt([
        {
            type: "input",
            name: "qty",
            message: "How many would you like to purchase?",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        }
        //update quantity table//
    ]).then(function (answer) {
        var userQuantity = answer.qty;
        // var totalCost = 
        if (userQuantity > product.stock_quantity) {
            console.log('Insufficient Quantity');
            console.log('Cannot place this order');
            console.log('Check back Soon');
            viewAll();
        }
        else {


            connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [userQuantity, product.item_id
            ], function (err, res) {

                console.log('You got Social Justice at Bamazon, thank you!');
                newOrder();
            });

        };


    })
    // connection.query('SELECT * FROM products WHERE id = ?', [answer.askForID], function (err, res) { })
};
function checkForId(id, data) {
    for (var i = 0; i < data.length; i++) {
        if (id == data[i].item_id) {
            return data[i];
        }
    }
    return null;
}

//Allows the user to place a new order or end the connection

function newOrder() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: 'Would you like to place another order?'

    }]).then(function (answer) {
        var quantityToBuy = parseInt(answer.qty);
        var whatToBuy = (answer. id)-1; 
        var totalCost =  (parseFloat(((product[whatToBuy].price) *quantityToBuy).toFixed(2)))
        if (answer.choice) {
            console.log("Thank you for shopping, your total is:" + totalCost.toFixed(2));
}
        else {
    console.log('Hope to see you soon!');
    connection.end();
}
    }
        )};




// var userEnteredId = answer.id;
// var product = checkForId(userEnteredId, data);
// if (product) {
//     askForQuantity(product);
// } console.log("")viewAll();



