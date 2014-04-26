var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var contentSchema = new Schema({
    name: String,
    rows: [{
        cssClass: String,
        cols:[Schema.Types.Mixed]
    }],
});
mongoose.model('Content', contentSchema);
