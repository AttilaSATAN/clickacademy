var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var TrainingSchema = new Schema({
    name: String,
    begins: String,
    schedule:String,
    programTime:String,
    quota:Number,
    date: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    },
    closed:{
        type:Boolean,
        default:false
    }
});
var Training = mongoose.model('Training', TrainingSchema);


