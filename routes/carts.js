const Cart = require('../models/cart'),
  express = require('express'),
  Menu = require('../models/menu'),
  router = express.Router();

  // POST /carts
  // - Create a new cart: var cart = new Cart()
  // - Assign a cart number
  // - Product.findById
  // - Use the above product to push into cart.items
  // - Update cart.total
  // - Save cart

router.post('/', function(req, res) {
  // create a new instance of Post model
  var cart = new Cart(req.body);

  cart.user = req.user._id;

  Menu.find({ "items._id": req.body.menuItemId }, function (err, menu) {
    if (menu === null) {
      res.send(404)
      return
    }
    console.log(menu.items.length)
    for (var i = 0; i < menu.items.length; i++) {
      if (menu.items[i]._id === req.body.menuItemId){
        cart.addItem(menu.items[i])

        break
      }
    }
    cart.save()
      .then(function(cart) {
        res.json(cart);
      }).catch(function(err) {
        res.json(422, err);
      });
  });


  cart.items.push()

  // Call our model's save method to insert into MongoDB
  cart.save()
    .then(function(cart) {
      // Respond with our newly created post
      res.json(cart);
    }).catch(function(err) {
      // If there is an error (i.e. validation), return the error
      res.json(422, err);
    });
});

router.patch('/:cartId', function(req, res) {
  Cart.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, cart) {
    // respond with updated post
    res.json(cart);
  });
});

router.get('/', function(req, res) {
  Cart.find({}, function(err, carts) {
    res.json(carts);
  });
});

router.get('/:id', function(req, res) {
  Cart.findById(req.params.id)
      // Populate referenced user, but only grab the username
      .populate('user', 'username')
      // Populate embedded documents referenced user, but only grab the usernames
      .populate('items.user', 'username')
      // Execute the query and then handle the results in a callback
      .exec(function(err, cart) {
        res.json(cart);
      });
});

router.delete('/:id', function(req, res) {
  Cart.findByIdAndRemove(req.params.id, function(err, cart) {
    res.json(true);
  });
});

module.exports = router;
