class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :img_url, :description,
             :status, :address, :longitude, :latitude

  has_many :likes
  has_many :comments
  belongs_to :user
end
