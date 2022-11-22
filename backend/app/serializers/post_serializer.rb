class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :img_url, :description,
             :status, :address, :longitude, :latitude, :user_id

  has_many :likes
  has_many :comments
end
