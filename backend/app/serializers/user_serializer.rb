class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :username,
             :birthday, :url_img, :phone_number,
             :address, :gender, :card_id, :role

  has_many :posts
  has_many :likes
  has_many :comments

end
