var ContentController = {
  changeDesktop: function() {
    var notesList = $('.notes-list');
    notesList.html('');
    
    var notes = Postifly.notes.filter(function(note) {
      return note.get('desktop_id') == Postifly.currentDesktopId;
    });
    
    notes.forEach(function(note) {
      var noteView = new NoteView({ model: note });
      notesList.append(noteView.render().el);
      noteView.resizeTextarea();
    });
  }
}