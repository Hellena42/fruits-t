const express = require('express');
const router = express.Router();
const productsController = require('./src/controllers/products.controller.js');
let products = productsController.getAllProducts();