class UserSerializer < ActiveModel::Serializer
<<<<<<< HEAD
  attributes :id, :email, :username, :role, :created_at, :updated_at
=======
  attributes :id, :email, :first_name, :last_name, :username,
             :password, :birthday, :url_img, :phone_number,
             :address, :gender, :card_id, :role

  has_many :posts
  has_many :likes
  # has_many :follows

>>>>>>> 302eb69a6dd89198e4d0adde8f9e2dcfd143feb2
end
