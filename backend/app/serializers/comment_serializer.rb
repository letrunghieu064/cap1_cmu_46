class CommentSerializer < ActiveModel::Serializer
  attributes :id, :description, :post_id
  # belongs_to :posts
  has_many :comment_likes
end
