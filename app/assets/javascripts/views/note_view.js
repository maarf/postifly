var NoteView = Backbone.View.extend({
  tagName: 'li',
  className: 'notes-list-item',
  template: _.template('<div class="note-content"><textarea placeholder="enter your text"><%= content %></textarea></div>'),
  events: {
    "input textarea": "contentUpdate",
    "focus textarea": "startEditing",
    "blur textarea":  "stopEditing",
    "click":          "click"
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
    this.showImageIfPossible();
    
    // Special treatment for image notes
    if (this.model.get('note_type') == 'image') {
      this.$('textarea').attr('placeholder', 'image url here');
    }
    
    // Make draggable
    var view = this;
    this.$el.draggable({
      stop: function() {
        var newFrame = [parseInt(view.$el.css('top')),
                        parseInt(view.$el.css('left')),
                        parseInt(view.$el.css('width')),
                        parseInt(view.$el.css('height'))].join();
        view.model.set('frame', newFrame);
        view.model.save()
        view.justDragged = true;
        setTimeout(function() {
          view.justDragged = false
        }, 100);
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
    console.log("Start editing");
    this.$el.addClass('note-editing');
    this.isEditing = true;
    this.justEdited = true;
  },
  stopEditing: function() {
    console.log("End editing");
    
    this.$el.removeClass('note-editing');
    this.isEditing = false;
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveContent();
    
    this.showImageIfPossible()
  },
  
  // Save content in 5 second intervals when editing
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
  },
  
  showImageIfPossible: function() {
    if (this.model.get('note_type') == 'image') {
      if (this.model.isValid()) {
        console.log("valid");
        this.$el.addClass('note-content-as-fill');
        var content = this.model.get('content')
        this.$el.css({ 'background-image': 'url(' + content + ')'});
      } else {
        console.log("invalid");
      }
    }
  },
  
  // Start editing after a click (but not if it was a drag) if it's an image
  // note
  justDragged: false,
  click: function(event) {
    if (!this.justDragged && this.model.get('note_type') == 'image') {
      console.log("click");
      this.$el.addClass('note-editing');
      this.$('textarea').focus();
      this.$('textarea').trigger('autosize.resize');
    }
  }
});
