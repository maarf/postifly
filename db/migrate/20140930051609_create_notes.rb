class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.integer :desktop_id
      t.string :note_type
      t.text :content
      t.string :frame
      t.timestamps
    end
    add_index :notes, [:desktop_id]
  end
end
