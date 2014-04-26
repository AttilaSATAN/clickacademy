var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var colFragmentSchema = new Schema({
	name: String,
	inputDirective: String,
	displayDirective: String,
	fragmentData: Object
});

mongoose.model('ColFragment', colFragmentSchema);