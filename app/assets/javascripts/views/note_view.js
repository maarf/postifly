var NoteView = Backbone.View.extend({
  tagName: 'li',
  className: 'notes-list-item',
  template: _.template('<div class="note-content"><textarea><%= content %></textarea></div>'),
  events: {
    "input textarea": "contentUpdate",
    "focus textarea": "startEditing",
    "blur textarea":  "stropEditing"
  },
  
  initialize: function() {
    var model = this.model;
    this.listenTo(this.model, 'change', function() {
      // Don't render if the only change is frame or note is beeing edited
      if (!_.isEqual(Object.keys(model.changed), ['frame']) && !this.isEditing) {
        this.render();
      }
    });
  },
  
  render: function() {
    
    console.log("render");
    
    // Set frame
    var frame = this.model.get('frame').split(',');
    this.$el.css({
      'top':    frame[0] + 'px',
      'left':   frame[1] + 'px',
      'width':  frame[2] + 'px',
      'height': frame[3] + 'px'
    });
    
    // Set type
    this.$el.addClass('note-type-' + this.model.get("note_type"));
    
    // Make template
    var content = this.model.get('content');
    this.$el.html(this.template({ content: content }));
    
    // Special treatment for image notes
    if (this.model.get('note_type') == 'image') {
      this.$el.addClass('note-content-as-fill')
      this.$el.css({ 'background-image': 'url(' + content + ')'})
    }
    
    // Make draggable
    var view = this;
    this.$el.draggable({
      stop: function() {
        var newFrame = [parseInt(view.$el.css('top')),
                        parseInt(view.$el.css('left')),
                        parseInt(view.$el.css('width')),
                        parseInt(view.$el.css('height'))].join();
        console.log(newFrame)
        view.model.set('frame', newFrame);
        view.model.save()
      }
    });
    
    // Make textarea to size automatically
    this.$('textarea').autosize({
      append: ''
    });
    
    return this;
  },
  
  resizeTextarea: function() {
    setTimeout(function() {
      this.$('textarea').trigger('autosize.resize');
    }, 10);
  },
  
  isEditing: false,
  startEditing: function() {
    this.isEditing = true;
  },
  endEditing: function() {
    this.isEditing = false;
    this.saveContent();
  },
  
  saveTimeout: null,
  contentUpdate: function(event) {
    var view = this;
    if (!this.saveTimeout) {
      this.saveTimeout = setTimeout(function() {
        view.saveContent();
      }, 5000);
    }
  },
  saveContent: function() {
    this.saveTimeout = null;
    this.model.save({ 'content': this.$('textarea').val() });
  }
});
