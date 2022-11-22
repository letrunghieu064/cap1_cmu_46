class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :username
      t.date :birthday
      t.text :url_img
      t.string :phone_number
      t.string :address
      t.binary :gender
      t.string :card_id


      t.timestamps
    end
  end
end
