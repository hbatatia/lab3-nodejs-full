const database = require('./dbQuery');


function find(callback) {
    const selectProducts = "SELECT * from article; ";
    database.getResult(selectProducts, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
            throw err;
        }
    });
}




function findByID(reference, callback) {
    const selectProducts = `SELECT * from article where reference like '${reference}';`;
    database.getResult(selectProducts, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
            throw err;
        }
    });
}


function findByCategory(category, callback) {
    const selectProducts = (`SELECT * from article where category like '${category}';`);
    database.getResult(selectProducts, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
            throw err;
        }
    });
}


function createProduct(product, callback) {
    const insertProduct = (`INSERT INTO article (reference, category, name, supplier, price, vat, stock, critical_stock) VALUES ('${product.reference}', '${product.category}', '${product.name}', ${product.supplier}, ${product.price}, ${product.vat}, ${product.stock}, ${product.critical_stock}) ;`);
    database.getResult(insertProduct, function(err, result) {
        if (!err) {
            callback(null, result.affectedRows, result.insertId);
        } else {
            console.log(err);
            throw err;
        }
    });
}


function deleteArticle(reference, callback) {
    const deleteArticle = (`DELETE from article where reference = '${reference}';`);
    database.getResult(deleteArticle, function(err, result) {
        if (!err) {
            console.log("Number of products deleted: " + result.affectedRows);
            callback(null, result.affectedRows);
        } else {
            console.log(err);
            throw err;
        }
    });
}


module.exports = {
    find,
    findByID,
    findByCategory,
    createProduct,
    deleteArticle
};