var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazondb"

});

function viewAll() {
    //prints products to the table//
    connection.query("SELECT* FROM skills", function (err, data) {
        if (err) throw err;

        console.log('Employees See These products');

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].products + "Department: " + res[i].departmentName + " | " + "Price: " + res[i].price + " | " + "Qty " + res[i].stock_quantity);
            connection.end();
        }

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
                    return false;
                } else {
                    return true;
                }
            }

            }


        ]).then(function (ans) {
                var
            })
});
}
connection.connect(function (err) {
    if (err) throw err;

    console.log(`connected sd if ${connection.threadId}`);

})