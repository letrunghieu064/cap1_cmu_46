class LikeSerializer < ActiveModel::Serializer
  attributes :id, :post_id, :user_id
  # belongs_to :posts
  # belongs_to :users
end
