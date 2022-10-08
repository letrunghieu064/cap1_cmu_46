class CreateWards < ActiveRecord::Migration[6.0]
  def change
    create_table :wards do |t|
      t.string :name
      t.float :longitude
      t.float :latitude
      t.references :district, null: false, foreign_key: true

      t.timestamps
    end
  end
end
