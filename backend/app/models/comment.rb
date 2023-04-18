class Comment < ApplicationRecord
  belongs_to :post, optional: true
  belongs_to :user, optional: true
  has_many :comment_likes, dependent: :destroy
end
