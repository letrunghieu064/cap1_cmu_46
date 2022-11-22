class CommentSerializer < ActiveModel::Serializer
  attributes :id, :description, :post_id

  has_many :comment_likes
end
