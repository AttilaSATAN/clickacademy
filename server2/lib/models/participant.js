var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ParticipantSchema = new Schema({
    name: String,
    gsm: String,
    email: String,
    address:String,
    birth: Date,
    date: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    }
});
var Participant = mongoose.model('Participant', ParticipantSchema);

