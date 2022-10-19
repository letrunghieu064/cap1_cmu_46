class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :username
      t.string :password_digest
      t.date :birthday
      t.string :url_img
      t.string :phone_number
      t.string :address
      t.binary :gender
      t.string :card_id
      t.string :role
      t.string :confirmation_token
      t.string :confirmation_at
      t.integer :lock_at
      t.integer :count_lock

      t.timestamps
    end
  end
end
