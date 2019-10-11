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

function viewAll() {     ////////display products////////
    inquirer.prompt([
        {
            type: "list",
            name: "list",
            message: "Hello Manager! What would you like to see today?",
            choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new Products"]
        }]).then(function (user) {
            if (user.list === "View products for sale") {
                connection.query("SELECT * FROM product", function (err, data) {
                    if (err) throw err;
                    console.table(data);
                    askForID(data);

                });

            } else {
                console.log("Select another choice?")
            }
        })
}

function askForID(data) {   //Match user input to ID//
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What product would you like to see?",
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
        console.log("product : ", product)
        console.log("quantity : ", qty)
        if (product) {
            askForQuantity(product);
        } else {
            console.log("Sorry information not availiable")
            viewAll();
        }

    });
}
function askForQuantity(product) {  //inventory decreases//
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



function newOrder() { //Allows the user to place a new order or end the connection//
    inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: 'Would you like to place another order?'

    }]).then(function (answer) {
        var quantityToBuy = parseInt(answer.qty);
        var whatToBuy = (answer.id) - 1;
        var totalCost = (answer.price)
        if (answer.choice) {
            console.log("Thank you for shopping, your total is:" + totalCost.toFixed(2));
        }
        else {
            console.log('Hope to see you soon!');
            connection.end();
        }
    }
    )
};










