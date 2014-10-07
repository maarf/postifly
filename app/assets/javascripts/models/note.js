var Note = Backbone.Model.extend({
  urlRoot: '/notes',
  validate: function(attrs, options) {
    if (attrs.note_type == "image" && attrs.content.length < 10) {
      return "content should be an URL";
    }
  }
});