var DesktopRow = Backbone.View.extend({
  tagName: 'li',
  className: 'sidebar-desktops-item',
  template: _.template('<a href="#" class="desktop-delete">Delete</a><a href="<%= url %>" class="sidebar-desktops-item-link"><input value="<%= name %>" disabled></a>'),
  events: {
    'click    .sidebar-desktops-item-link': 'open',
    'dblclick .sidebar-desktops-item-link': 'startEditing',
    'blur     input':                       'endEditing',
    'keypress input':                       'keyPress',
    'click    .desktop-delete':             'delete'
  },
  
  initialize: function() {
    if (this.$el.hasClass('selected')) {
      this.isSelected = true;
    }
    
    this.listenTo(this.model, 'change', this.render);
    
    this.listenTo(this.model, 'selected', this.select);
    this.listenTo(this.model, 'deselected', this.deselect);
  },
  
  render: function() {
    if (this.isSelected) {
      this.$el.addClass('selected');
    } else {
      this.$el.removeClass('selected');
    }
    
    var attributes = {
      name: this.model.get('name'),
      url: this.model.url()
    }
    this.$el.html(this.template(attributes));
    
    return this;
  },
  
  open: function(event) {
    event.preventDefault();
    Postifly.router.navigate('desktops/' + this.model.id, { trigger: true });
  },
  
  startEditing: function() {
    this.$('input').attr('disabled', false).focus().select();
  },
  endEditing: function() {
    // Check if not just edited because canceling also causes blur which again
    // calls this
    if (this.justEdited) {
      return
    }
    this.setJustEdited();
    
    console.log(1);
    
    var input = this.$('input');
    this.model.save({ 'name': input.val() });
    input.attr('disabled', true);
  },
  cancelEditing: function() {
    console.log(2);
    this.setJustEdited();
    
    var input = this.$('input');
    input.val(this.model.get('name'));
    input.blur();
    input.attr('disabled', true);
  },
  keyPress: function(event) {
    // Enter key pressed
    if (event.keyCode == 13) {
      this.endEditing();
    
    // Escape key pressed
    } else if (event.keyCode == 27) {
      this.cancelEditing();
    }
  },
  setJustEdited: function() {
    this.justEdited = true;
    view = this;
    setTimeout(function() {
      view.justEdited = false;
    }, 200);
  },
  
  isSelected: false,
  select: function() {
    this.isSelected = true;
    this.render();
  },
  deselect: function() {
    this.isSelected = false;
    this.render();
  },
  
  delete: function() {
    var desktops = Postifly.desktops;
    var index = desktops.indexOf(this.model);
    var desktopToSelect;
    if (desktops.size() - 1 > index) {
      desktopToSelect = desktops.at(index + 1);
    } else if (index > 0) {
      desktopToSelect = desktops.at(index - 1);
    }
    
    if (desktopToSelect) {
      Postifly.router.navigate('desktops/' + desktopToSelect.id, { trigger: true });
    }
    
    this.model.destroy();
    this.remove();
  }
})