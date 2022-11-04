class LikeSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :posts
  belongs_to :users
end
