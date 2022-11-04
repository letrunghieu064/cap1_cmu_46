class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :username,
             :birthday, :phone_number, :address, :gender,
             :card_id

  has_many :posts
  has_many :likes
  # has_many :follows
end
