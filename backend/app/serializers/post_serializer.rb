class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :img_url, :description, :user,
             :status, :address, :longitude, :latitude ,:created_at, :comments ,:likes

  has_many :likes
  has_many :comments
  belongs_to :user
end
