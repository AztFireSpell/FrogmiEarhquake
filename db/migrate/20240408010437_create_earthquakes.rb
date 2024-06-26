class CreateEarthquakes < ActiveRecord::Migration[7.1]
  def change
    create_table :earthquakes do |t|
      t.string :usgs_id
      t.decimal :magnitude
      t.string :place
      t.datetime :time
      t.string :url
      t.boolean :tsunami
      t.string :mag_type
      t.string :title
      t.decimal :longitude
      t.decimal :latitude

      t.timestamps
    end
  def down
    drop_table :earthquakes
  end
  end
end
