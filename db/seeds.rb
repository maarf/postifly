# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

desktops = Desktop.create([{ name: "Desktop One" }, { name: "Desktop Two" }])
desktop = desktops.first

desktop.notes.create(content: "Peace and beauty", note_type: Note::TEXT_TYPE, frame: "100,100,240,240")
desktop.notes.create(content: "/sunset.jpg", note_type: Note::IMAGE_TYPE, frame: "400,400,240,240")