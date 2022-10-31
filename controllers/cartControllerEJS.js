const getCatalog = (request, response) => {
    const catalogServices = require('../services/productServices');
    catalogServices.searchService(function(err, rows) {
        response.render('catalog', { products: rows });
    });
};

const getProductByID = (request, response) => {
    const catalogServices = require('../services/productServices');
    let reference = request.params.id;
    catalogServices.searchIDService(reference, function(err, rows) {
        console.log(rows);
        response.render('article', { product: rows });
    });
};

module.exports = {
    getCatalog,
    getProductByID
};