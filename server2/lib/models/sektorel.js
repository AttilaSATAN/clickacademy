var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var SektorelSchema = new Schema({
    name: String,
    url: {
        type: String,
        unique: true
    },
    description: String,
    keywords: [{
        type: String
    }],
    shortTag: String,
    _asset: {
        type: Schema.Types.ObjectId,
        ref: 'Assets'
    },
    date: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    }
});
var Sektorel = mongoose.model('Sektorel', SektorelSchema);

