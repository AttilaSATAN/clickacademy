var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var colFragmentSchema = new Schema({
	name: String,
	inputDirective: String,
	displayDirective: String,
	fragmentData: Object
});


var ColFagment = mongoose.model('ColFragment', colFragmentSchema);

ColFagment.find({}).remove(function () {
	ColFagment.create([{

	},{

	},{
		
	}])
})