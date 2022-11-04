class CommentSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :posts
  has_many :comment_likes
end
