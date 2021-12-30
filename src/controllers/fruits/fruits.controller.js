const productsController = require('../products.controller');
let products = productsController.getAllProducts();

const mainFruits = (req, res) => {
  let showLinks = {type: true, season: true, price: true};
  res.render('pages/fruits', {title: 'Fruits', titleProducts: 'All fruits', products: products, showLinks: showLinks, active: false, active: []}
)};

const paramsFruits = (req, res) => {
  let params = req.params.params;
  let paramsStr = params.replace(/^[^=]*=/, '');
  let freshFruits = productsController.filteredFirstParams(paramsStr);
  let isVisible = productsController.isVisibleLinks(freshFruits, paramsStr);
  console.log(paramsStr);
  
  res.render('pages/fruits',
  {title: `${paramsStr} fruits`, titleProducts: `${paramsStr} fruits`, products: freshFruits, showLinks: {type: isVisible.type, season: isVisible.season, price: isVisible.price}, active: [paramsStr]});
}

const secondParamsFruits = (req, res) => {
  let firstParams = req.params.params.replace(/^[^=]*=/, '');
  let secondParams = req.params.params2.replace(/^[^=]*=/, '');

  let freshFruits1 = productsController.filteredFirstParams(firstParams);
  let freshFruits = productsController.filteredOtherParams(freshFruits1, secondParams);
  let isVisible = productsController.isVisibleLinks(freshFruits, req.params);

  res.render('pages/fruits',
  {title: `${firstParams} ${secondParams} fruits`, titleProducts: `${firstParams} ${secondParams} fruits`, products: freshFruits, showLinks: {type: isVisible.type, season: isVisible.season, price: isVisible.price}, active: [firstParams, secondParams]});
}

const thirdParamsFruits = (req, res) => {
  let firstParams = req.params.params.replace(/^[^=]*=/, '');
  let secondParams = req.params.params2.replace(/^[^=]*=/, '');
  let thirdParams = req.params.params3.replace(/^[^=]*=/, '');

  let freshFruits1 = productsController.filteredFirstParams(firstParams);
  let freshFruits2 = productsController.filteredOtherParams(freshFruits1, secondParams);
  let freshFruits = productsController.filteredOtherParams(freshFruits2, thirdParams);
  let isVisible = productsController.isVisibleLinks(freshFruits, req.params);

  res.render('pages/fruits',
  {title: `${firstParams} ${secondParams} ${thirdParams} fruits`, titleProducts: `${firstParams} ${secondParams} ${thirdParams} fruits`, products: freshFruits, showLinks: {type: isVisible.type, season: isVisible.season, price: isVisible.price}, active: [firstParams, secondParams, thirdParams]});
}

module.exports = {
    mainFruits,
    paramsFruits,
    secondParamsFruits,
    thirdParamsFruits
}