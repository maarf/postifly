var DesktopsRouter = Backbone.Router.extend({
  routes: {
      "": "show",
      "desktops/:id": "show"
  },
  show: function(id) {
    
    // Deselect previous desktop if any
    if (Postifly.currentDesktop) {
      Postifly.currentDesktop.trigger("deselected")
    }
    
    id = id ? id : 1
    Postifly.currentDesktopId = id
    Postifly.currentDesktop = Postifly.desktops.find(function(desktop) { return desktop.id == id })
    Postifly.currentDesktop.trigger("selected")
    
    console.log("Current desktop: " + Postifly.currentDesktopId)
  }
});