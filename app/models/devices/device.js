var mongoose = require('mongoose')
  , db = mongoose.createConnection(process.env.MONGOLAB_DEVICES_URL);

var devicesSchema = new mongoose.Schema({
  secret: String
});

module.exports = db.model('device', devicesSchema);
