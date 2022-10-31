const { Product } = require('../models/entities');
const productDAO = require('../daos/productDAO');

const searchService = function(callback) {
    productDAO.find(function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length == 0) {
            console.log("No products!");
        } else {
            callback(null, rows);
        }
    });
};

const searchIDService = function(reference, callback) {
    productDAO.findByID(reference, function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length == 0) { //unkown
            console.log("Unkown product!");
            let product = null;
            calback(null, product);
        } else {
            //créer l'object  partir des data retournées...
            //reference, category, name, supplier, price, vat, stock, critical_stock
            let product = new Product(rows[0].reference, rows[0].category, rows[0].name, rows[0].supplier, rows[0].price, rows[0].vat, rows[0].stock, rows[0].critical_stock);
            callback(null, product); //il vaut mieux retoruner l'objet JSON qui est danns rows[0]
        }
    });
};

const searchCategoryService = function(category, callback) {
    productDAO.findByCategory(category, function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length == 0) { //no products
            console.log(`No product in category ${category}!`);
            calback(null, rows);
        } else {
            //return the rows
            callback(null, rows);
        }
    });
};

module.exports = {
    searchIDService,
    searchService,
    searchCategoryService
};