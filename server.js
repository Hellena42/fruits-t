const express = require('express');
const app = express();
const path = require('path');
const { body, validationResult} = require('express-validator');

const indexController = require('./src/controllers/index.controller.js');
const fruitsController = require('./src/controllers/fruits/fruits.controller.js')
const elementumController = require('./src/controllers/elementum.controller');
const organicController = require('./src/controllers/organic.controller');

app.set('view engine', 'ejs');
app.set('views', 'src/views')
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: true, limit: '5mb' }))
app.use((req, res, next) => {
  if (req.path.substr(-1) == '/' && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    res.redirect(301, req.path.slice(0, -1) + query);
  } else {
    next();
  }
});

app.get('/', indexController.homePage);

app.get('/products/:id', indexController.productPage);

app.get('/fruits', fruitsController.mainFruits);
app.get('/fruits/:params', fruitsController.paramsFruits);
app.get('/fruits/:params/:params2', fruitsController.secondParamsFruits);
app.get('/fruits/:params/:params2/:params3', fruitsController.thirdParamsFruits)

app.get('/elementum', indexController.elementumPage);

app.post('/elementum', 
body('name').exists().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long.'),
body('username').exists().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
body('email').exists().isEmail().withMessage('Invalid email'),
body('phone').exists().withMessage('Invalid phone number'),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArr = errors.array();
    console.log(errorsArr);
    res.render('pages/elementum', {errors: errorsArr});
  }

  const newUser = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone
  }

  elementumController.postUser(newUser);
});

app.get('/organic', indexController.organicPage);

app.post('/organic', async (req, res) =>{
  const items = await organicController.getData();

  const newItem = {
    name: req.body.name,
    title: req.body.title,
    number: req.body.amount
  }

  organicController.postData(newItem);
});

app.delete('/organic/:id', (req,res) => {
  console.log(req.body._id);
  if(!req.body._id) return res.sendStatus(400);
     
  res.json(req.body._id);
})

app.listen(3000);