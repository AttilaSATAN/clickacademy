"1use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProgramCategorySchema = new Schema({
	name: String,
	url: String
});

mongoose.model('ProgramCategory',ProgramCategorySchema);