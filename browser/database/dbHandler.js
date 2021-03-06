var mongoose = require('mongoose');
var schema = mongoose.Schema;
var models = require('./models.js');

for (var m in models) {
  mongoose.model(m, new schema(models[m]));
}

module.exports = {
  getModel: function(type) {
    return mongoose.model(type);
  },
};

