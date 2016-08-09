const Menu = require('../models/menu'),
  express = require('express'),
  router = express.Router();

router.post('/', function(req, res) {
  // create a new instance of Post model
  var menu = new Menu(req.body);

  menu.user = req.user._id;

  // Call our model's save method to insert into MongoDB
  menu.save()
    .then(function(menu) {
      // Respond with our newly created post
      res.json(menu);
    }).catch(function(err) {
      // If there is an error (i.e. validation), return the error
      res.json(422, err);
    });
});

router.post('/:menuId/items', function(req, res) {
  function onFind(err, menu) {
    function onItemAdded(menu) {
      res.json(menu);
    }

    function onError(err) {
      res.json(422, err);
    }

    menu.addItem(req.body)
      .then(onItemAdded)
      .catch(onError);
  }

  Menu.findById(req.params.menuId, onFind);
});

router.get('/', function(req, res) {
  Menu.find({}, function(err, menus) {
    res.json(menus);
  });
});

router.get('/:id', function(req, res) {
  Menu.findById(req.params.id)
      // Populate referenced user, but only grab the username
      .populate('user', 'username')
      // Populate embedded documents referenced user, but only grab the usernames
      .populate('items.user', 'username')
      // Execute the query and then handle the results in a callback
      .exec(function(err, menu) {
        res.json(menu);
      });
});

router.patch('/:id', function(req, res) {
  Menu.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, menu) {
    // respond with updated post
    res.json(menu);
  });
});

router.delete('/:id', function(req, res) {
  Menu.findByIdAndRemove(req.params.id, function(err, menu) {
    res.json(true);
  });
});

module.exports = router;
