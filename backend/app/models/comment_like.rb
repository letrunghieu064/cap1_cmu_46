class CommentLike < ApplicationRecord
  belongs_to :comments, optional: true
end
