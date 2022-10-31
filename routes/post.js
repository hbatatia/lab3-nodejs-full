const express = require('express');
const clientController = require('../controllers/clientController');
const productController = require('../controllers/productControllerEJS');
const cartController = require('../controllers/cartControllerEJS');
//const orderController = require('../controllers/orderControllerEJS');


//define a router and create routes
const router = express.Router();

//render static EJS files
//-----------------------------------------------
//route for contacts
router.get('/contacts', function(req, res, next) {
    res.render('contacts');
});

//route for registration
router.get('/register', function(req, res, next) {
    res.render('register');
});

//route for registration
router.get('/login', function(req, res, next) {
    res.render('login');
});
//-----------------------------------------------

//routes for dynamic processing of clients
//-----------------------------------------------
//route for registration
router.post('/api/register', clientController.registerControl);
//route for login
router.post('/api/login', clientController.loginControl);
//route for listing all clients
router.get('/api/clients', clientController.getClients);
//route for getting a single client by id
router.get('/api/client/:id', clientController.getClientByNumclient);

//-----------------------------------------------

//routes for dynamic processing of products
//-----------------------------------------------
//route for listing all products
router.get('/api/catalog', productController.getCatalog);
router.get('/api/article/:id', productController.getProductByID);

//-----------------------------------------------

//routes for cart management
//-----------------------------------------------
//route for cart
//router.put('/api/cart/add/:id', cartController.addCart);
//router.delete('/api/cart/remove/:id', cartController.removeCart);
//router.post('/api/cart/modify/:id', cartController.modifyCart);
//router.delete('/api/cart/clear', cartController.clearCart);
//router.get('/api/cart', cartController.getCart);

//-----------------------------------------------

//routes for orders
//-----------------------------------------------
//route for checkout
//router.get('/api/checkout', orderController.getCart);

//export router
module.exports = router;