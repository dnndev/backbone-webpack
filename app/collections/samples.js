var SampleModel = require('./../models/sample');

var SamplesCollection = Backbone.Collection.extend({
  model: SampleModel,
  url: '/api/samples/list'
});

module.exports = SamplesCollection;
