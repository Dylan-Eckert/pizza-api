const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user: { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  items: [{
    title: { type : String, trim: true, default : '' },
    ingredients: { type : String, trim: true, default : '' },
    size: { type : String, trim: true, default : '' },
    price: { type : Number, trim: true, default : '' },
    createdAt: { type : Date, default : Date.now }
  }],
  total: {type : Number, default : '' },

  createdAt: Date,
  updatedAt: Date
});

// Validations
CartSchema.path('user').required(true, 'Cart user cannot be blank');

// Custom Methods
CartSchema.methods.addItem = function(item) {
  this.items.push({
    title: item.title,
    ingredients: item.ingredients,
    size: item.size,
    price: item.price
  });

  return this.save();
};

module.exports = mongoose.model('Cart', CartSchema);
