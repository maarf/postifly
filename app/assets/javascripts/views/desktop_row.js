var DesktopRow = Backbone.View.extend({
  tagName: 'li',
  className: 'sidebar-desktops-item',
  template: _.template('<a href="<%= url %>" class="sidebar-desktops-item-link"><%= name %></a>'),
  events: {
    'click .sidebar-desktops-item-link': 'open'
  },
  
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
    
    this.listenTo(this.model, 'selected', this.select)
    this.listenTo(this.model, 'deselected', this.deselect)
  },
  
  render: function() {
    var attributes = {
      name: this.model.get("name"),
      url: this.model.url()
    }
    this.$el.html(this.template(attributes));
    
    return this;
  },
  
  open: function(event) {
    event.preventDefault()
    Postifly.router.navigate("desktops/" + this.model.id, { trigger: true })
  },
  
  select: function() {
    this.$('.sidebar-desktops-item-link').addClass('selected')
  },
  deselect: function() {
    this.$('.sidebar-desktops-item-link').removeClass('selected')
  }
})