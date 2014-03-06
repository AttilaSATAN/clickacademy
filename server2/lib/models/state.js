'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var StatesSchema = new Schema({
  url: String,
  state: String,
  main: Boolean,
  template: { type: Schema.Types.ObjectId, ref: 'Template' },
  name: String,
  controller: String
});

/**
 * Validations
 */
// PageSchema.path('awesomeness').validate(function (num) {
//   return num >= 1 && num <= 10;
// }, 'Awesomeness must be between 1 and 10');

mongoose.model('States', StatesSchema);
