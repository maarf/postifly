var DesktopRow = Backbone.View.extend({
  tagName: 'li',
  className: 'sidebar-desktops-item',
  template: _.template('<a href="#" class="desktop-delete">Delete</a><a href="<%= url %>" class="sidebar-desktops-item-link"><%= name %></a>'),
  events: {
    'click .sidebar-desktops-item-link': 'open',
    'click .desktop-delete'            : 'delete'
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