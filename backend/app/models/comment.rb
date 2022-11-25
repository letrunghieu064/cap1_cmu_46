class Comment < ApplicationRecord
  belongs_to :posts, optional: true
  belongs_to :user, optional: true
  has_many :comment_likes, dependent: :destroy
end
