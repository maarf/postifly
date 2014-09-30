class CreateDesktops < ActiveRecord::Migration
  def change
    create_table :desktops do |t|
      t.string :name
      t.string :slug
      t.timestamps
    end
    add_index :desktops, [:slug]
  end
end
