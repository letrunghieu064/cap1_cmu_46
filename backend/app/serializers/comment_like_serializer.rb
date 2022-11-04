class CommentLikeSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :comments
end
