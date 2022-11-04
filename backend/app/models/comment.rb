class Comment < ApplicationRecord
  belongs_to :posts
  has_many :comment_likes
end
