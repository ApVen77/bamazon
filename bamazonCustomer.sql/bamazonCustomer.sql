-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "animals_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect animals_db --
USE bamazon_db;

-- Creates the table "people" within animals_db --
CREATE TABLE product (
  item_id INTEGER(10) NOT NULL,
  products VARCHAR (100),
  departmentName VARCHAR(100),
  price VARCHAR(100),
  stock_quantity VARCHAR(10)
); 
INSERT INTO product (item_id, products, departmentName, price, stock_quantity)
VALUES (1, "Decent Healthcare", "Employee", "join a trash clean up", 100);

INSERT INTO product ( item_id, products,  departmentName, price, stock_quantity)
VALUES (2, "Dental Insurance", "Employee", "volunteer", 10);

INSERT INTO product (item_id, products,  departmentName, price, stock_quantity)
VALUES (3, "Maternity Leave", "Employee", "give away unused clothes", 10);

INSERT INTO product (item_id, products,  departmentName, price, stock_quantity)
VALUES (4, "Paid time off", "Employee", "help the elderly", 10);

INSERT INTO product (item_id, products,  departmentName, price, stock_quantity)
VALUES (5, "Paternity Leave", "Employee", "register voters", 100);

INSERT INTO product (item_id, products,  departmentName, price, stock_quantity)
VALUES (6, "Livable Wage", "Employee", "visit a sick kid", 20);

INSERT INTO product (item_id, products,  departmentName, price, stock_quantity)
VALUES (7, "Professional Growth", "Employee", "learn somthing new", 10);

INSERT INTO product (item_id, products, departmentName, price, stock_quantity)
VALUES (8, "Incentive Package", "Employee", "give up social media", 10);

INSERT INTO product (item_id, products,  departmentName, price, stock_quantity)
VALUES (9, "Bi-annual Bonus", "Employee", "walk in someone else's shoes", 10);

INSERT INTO product  (item_id, products, departmentName, price, stock_quantity)
VALUES (10, "50% Employee Discount", "Employee", "be a yes man", 10);

-- Updates the row where the column name is peter --
-- UPDATE product 
-- SET has_pet = true, pet_name = "Franklin", pet_age = 2
-- WHERE name = "Peter";