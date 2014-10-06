var NoteView = Backbone.View.extend({
  tagName: 'li',
  className: 'notes-list-item',
  textNoteTemplate: _.template('<div class="note-content"><%= content %></div>'),
  imageNoteTemplate: _.template(''),
  events: {
  },
  
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
  },
  
  render: function() {
    
    var frame = this.model.get('frame').split(',')
    this.$el.css({
      'top':    frame[0] + 'px',
      'left':   frame[1] + 'px',
      'width':  frame[2] + 'px',
      'height': frame[3] + 'px'
    });
    
    this.$el.addClass('note-type-' + this.model.get("note_type"))
    
    var content = this.model.get('content')
    
    if (this.model.get('note_type') == 'image') {
      this.$el.addClass('note-content-as-fill')
      this.$el.css({ 'background-image': 'url(' + content + ')'})
      this.$el.html(this.imageNoteTemplate({}));
      
    } else {
      this.$el.html(this.textNoteTemplate({ content: content }));
    }
    
    return this;
  }
})