"1use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EgitimCategoriesSchema = new Schema({
	name: String,
	description: String,
	subHeader: String,
	_asset: {type: Schema.Types.ObjectId, ref:'Assets'},
	url: {type:String, unique: true}
});

mongoose.model('EgitimCategories', EgitimCategoriesSchema);