const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  title: { type: String, trim: true, default : '' },
  body: { type: String, trim: true, default : '' },
  user: { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  items: [{
    title: { type : String, trim: true, default : '' },
    ingredients: { type : String, trim: true, default : '' },
    size: { type : String, trim: true, default : '' },
    price: { type : Number, trim: true, default : '' },
    createdAt: { type : Date, default : Date.now }
  }],
  createdAt: Date,
  updatedAt: Date
});

// Validations
MenuSchema.path('title').required(true, 'Menu title cannot be blank');
MenuSchema.path('body').required(true, 'Menu body cannot be blank');

// Custom Methods
MenuSchema.methods.addItem = function(item) {
  this.items.push({
    title: item.title,
    ingredients: item.ingredients,
    size: item.size,
    price: item.price
  });

  return this.save();
};

module.exports = mongoose.model('Menu', MenuSchema);
