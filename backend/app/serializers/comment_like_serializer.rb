class CommentLikeSerializer < ActiveModel::Serializer
  attributes :id, :count, :comment_id

end
