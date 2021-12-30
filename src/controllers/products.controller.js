const Products = require('../models/products.js');

getAllProducts = function() {
  const productsArr = Products.products;
  result = getProducts(productsArr);
  return result;
}

getProducts = (arr) => {
  const rowLength = 4;
  
  let groupedProducts = arr.map((el, index) => {
    return index % rowLength === 0 ?  arr.slice(index, index + rowLength) : null;
  }).filter(function (e) { return e; });
  
  return groupedProducts;
}

getProduct = (arr, params) => {
  let id = params;
  let product = arr.map(el => {
    return el.find(el => el._id === id);
    }).filter(function (e) { return e; });

    return product;
}

filterFruits = (arr, params) => {
  let filteredArr = arr.filter(el => {
    if (params === 'cheap') {
      return el.price < 300
    } else if (params === 'expensive') {
      return el.price >= 300 && el.price < 700
    } else if (params === 'luxury') {
      return el.price >= 700
    } else if (params === el.type || params === el.seasonality){
      return el.type === params || el.seasonality === params;
    }
  });

  let groupedFruits = getProducts(filteredArr);
  return groupedFruits;
}

filteredFirstParams = (params) => {
  let allFruits = Products.products;
  let filteredArr = filterFruits(allFruits, params);

  return filteredArr;
}

filteredOtherParams = (arr, params) => {
  let allFruits = arr.flat();
  let filteredArr = filterFruits(allFruits, params);

  return filteredArr;
}

isVisibleLinks = (arr, params) => {
  let typeLink = true;
  let seasonLinks = true;
  let priceLinks = true;

  if (arr.length === 0) {
    typeLink = false;
    seasonLinks = false;
    priceLinks = false;
  }

  let filterFruits = arr.flat().map(el => {
    return {
      type: el.type,
      seasonality: el.seasonality,
      price: ['cheap', 'expensive', 'luxury']
    }
  });

  filterFruits.forEach(el => {
    Object.keys(params).map(key => {
      let param = [];
      
      if (typeof params === 'string') {
        param = params;
      } else if (typeof params === 'object') {
        param = params[key].replace(/^[^=]*=/, '');
      }

      if (param === el.type) {
        typeLink = false;
      } else if (param === el.seasonality) {
        seasonLinks = false;
      } else if (param === el.price[0] || param === el.price[1] || param === el.price[2]) {
        priceLinks = false;
      }
    });
  });

  let stateLinks = {
    type: typeLink,
    season: seasonLinks,
    price: priceLinks
  }

  return stateLinks;
}

module.exports = {
  getAllProducts,
  getProduct,
  getProducts,
  filteredFirstParams,
  filteredOtherParams,
  isVisibleLinks
}