class Comment < ApplicationRecord
  belongs_to :posts, optional: true
  has_many :comment_likes
end
