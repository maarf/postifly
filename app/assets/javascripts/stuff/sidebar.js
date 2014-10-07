var Sidebar = {
  setUp: function() {
    var controller = this;
    
    // Itterate through all desktops and look for an existing element, then
    // instantiate a desktop row view with the element
    Postifly.desktops.forEach(function(desktop) {
      var desktopElement = $("#desktop-row-" + desktop.get("id"));
      if (desktopElement.length) {
        new DesktopRow({ model: desktop, el: desktopElement[0] });
      }
    });
    
    // Add handlers to new note links
    $('.action-new-text-note').click(function(event) {
      event.preventDefault();
      controller.createNote('text');
    });
    $('.action-new-image-note').click(function(event) {
      event.preventDefault();
      controller.createNote('image');
    });
    
    // Add handler to create a new desktop when new desktop link is clicked
    $('.sidebar-desktop-items-new a').click(function(event) {
      event.preventDefault();
      controller.createDesktop();
    });
  },
  
  createNote: function(note_type) {
    var newNote = new Note({
      'content': '',
      'desktop_id': Postifly.currentDesktopId,
      'note_type': note_type,
      'frame': '300,300,240,240'
    });
    newNote.save();
    Postifly.notes.add(newNote);
    
    var newNoteView = new NoteView({ model: newNote });
    $('.notes-list').append(newNoteView.render().el);
    newNoteView.resizeTextarea();
  },
  
  createDesktop: function() {
    var newDesktop = new Desktop;
    newDesktop.set("name", "Desktop " + ($('.sidebar-desktops-item').length + 1));
    Postifly.desktops.add(newDesktop);
    newDesktop.save({}, {
      success: function() {
        Postifly.router.navigate("desktops/" + newDesktop.id, { trigger: true });
      }
    });
    
    var newDesktopRow = new DesktopRow({ model: newDesktop });
    $('.sidebar-desktop-items-new').before(newDesktopRow.render().el);
  }
}