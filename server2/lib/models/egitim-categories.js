"1use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EgitimCategoriesSchema = new Schema({
	name: String,
	description: String,
	subHeader: String,
	url: {type:String, unique: true}
});

mongoose.model('EgitimCategories', EgitimCategoriesSchema);