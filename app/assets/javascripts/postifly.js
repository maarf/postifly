var Postifly = {
  init: function(desktops, notes) {
    Postifly.desktops = new Desktops(desktops);
    Postifly.notes = new Notes(notes);
    
    Postifly.router = new DesktopsRouter();
    Backbone.history.start({pushState: true, root: '/'});
    
    Sidebar.setUp();
  }
};