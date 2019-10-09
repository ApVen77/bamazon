var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
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

function viewAll() {
    //prints products to the table//
    connection.query("SELECT * FROM product", function (err, data) {
        if (err) throw err;

        console.log('Employees See These products');
        //console.log(data);
        console.table(data);
        askForID(data);

        // for (var i = 0; i < res.length; i++) {
        //     console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].products + "Department: " + res[i].departmentName + " | " + "Price: " + res[i].price + " | " + "Qty " + res[i].stock_quantity);
        //     connection.end();
        // }




        // ]).then(function (ans) {
        //     var
        // })
    });
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
        // {
        //     type: "input",
        //     name: "qty",
        //     message: "How much would you like to purchase?",
        //     validate: function (value) {
        //         if (isNaN(value)) {
        //             return false;
        //         } else {
        //             return true;
        //         }
        //     }

        // }
    ]).then(function(answer){
        var userEnteredId = answer.id;
        var product = checkForId(userEnteredId, data);
        if(product){
            askForQuantity(product);
        }
    })

}
function checkForId(id, data){
    for (var i=0; i< data.length; i++) {
        if(data[i].item_id == id){
            return data[i]
;        }
    }
    return null
}
// connection.connect(function (err) {
//     if (err) throw err;

//     console.log(`connected sd if ${connection.threadId}`);

// })