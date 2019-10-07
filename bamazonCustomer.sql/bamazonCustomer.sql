-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "animals_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect animals_db --
USE bamazon_db;

-- Creates the table "people" within animals_db --
CREATE TABLE product (
  -- Makes an numeric column --
  item_id INTEGER(10),
  -- Makes a string column called "name" which cannot contain null --
  products VARCHAR(30) NOT NULL,
  -- Makes a sting column called "pet_name" --
  department_name VARCHAR(30),
  -- Makes an numeric column--
  price INTEGER(10),
-- Makes a string column called "name" which cannot contain null --
  stock_quantity INTEGER (10)
);

-- Creates new rows containing data in all named columns --
INSERT INTO product (products, item_id, department_name, price, stock_quantity)
VALUES (1, "Decent Healthcare", "Employee", "Rockington", 100);

INSERT INTO product (products, item_id, department_name, price, stock_quantity)
VALUES (2, "Dental Insurance", "Employee", "Rockington", 100);

INSERT INTO product (products, item_id, department_name, price, stock_quantity)
VALUES (3, "Maternity Leave", "Employee", "Misty", 10);

INSERT INTO product (products, item_id, department_name, price, stock_quantity)
VALUES (4, "Paid time off", "Employee");

INSERT INTO product (products, item_id, department_name, price, stock_quantity)
VALUES (5, "Paternity Leave", "Employee");

INSERT INTO product (products, item_id, department_name, price, stock_quantity)
VALUES (6, "Livable Wage", "Employee");

INSERT INTO product (products, item_id, department_name, price, stock_quantity)
VALUES (7, "Professional Growth", "Employee");

INSERT INTO product (products, item_id, department_name, price, stock_quantity)
VALUES (8, "Incentive Package", "Employee");

INSERT INTO product (products, item_id, department_name, price, stock_quantity)
VALUES (9, "Bi-annual Bonus", "Employee");

INSERT INTO product (products, item_id, department_name, price, stock_quantity)
VALUES (10, "Larger Employee Discount", "Employee");

-- Updates the row where the column name is peter --
-- UPDATE product 
-- SET has_pet = true, pet_name = "Franklin", pet_age = 2
-- WHERE name = "Peter";