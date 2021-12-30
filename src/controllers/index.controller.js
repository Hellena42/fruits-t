const productsController = require('../controllers/products.controller');
const elementumController = require('../controllers/elementum.controller');
const organicController = require('../controllers/organic.controller');

let products = productsController.getAllProducts();

const homePage = (req, res) => {
  console.group(products);
  let topProducts = products.slice();
  topProducts.length = 1;
  res.render('pages/index', {title: 'Home', titleProducts: 'Top products', products: topProducts, active: []});
}

const productPage = (req, res) => {
  let product = productsController.getProduct(products, req.params.id);
  res.render('pages/product', {title: 'Product Page', products: product[0]});
}

const elementumPage = async (req, res) => {
  let elementumList = await elementumController.resFunc();
  let groupedElementum = productsController.getProducts(elementumList.data);
  res.render('pages/elementum', {title: 'Elementum', data: groupedElementum});
}

const organicPage = async (req, res) => {
  let data = await organicController.getData();
  res.render('pages/organic', {title: 'Organic', data: data.data});
}

module.exports = {
  homePage,
  productPage,
  elementumPage,
  organicPage
}