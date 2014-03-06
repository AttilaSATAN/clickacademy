'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var TemplateSchema = new Schema({
  file: String,
  name: String
});

/**
 * Validations
 */
// PageSchema.path('awesomeness').validate(function (num) {
//   return num >= 1 && num <= 10;
// }, 'Awesomeness must be between 1 and 10');

mongoose.model('Template', TemplateSchema);
