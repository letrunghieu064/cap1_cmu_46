class CommentSerializer < ActiveModel::Serializer
  attributes :id, :description, :post_id, :user ,:created_at

  has_many :comment_likes
  belongs_to :user
end
