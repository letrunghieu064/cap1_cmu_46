class CommentLikeSerializer < ActiveModel::Serializer
  attributes :id, :count, :comment_id
  # belongs_to :comments
end
