class Comment < ApplicationRecord
  belongs_to :post
  has_many :comment_like
end