var Content = {
  changeDesktop: function() {
    var notesList = $('.notes-list');
    notesList.html('');
    
    console.log(Postifly.notes)
    var notes = Postifly.notes.filter(function(note) {
      return note.get('desktop_id') == Postifly.currentDesktopId
    });
    console.log(notes)
    
    notes.forEach(function(note) {
      var noteView = new NoteView({ model: note })
      notesList.append(noteView.render().el)
    });
  }
}