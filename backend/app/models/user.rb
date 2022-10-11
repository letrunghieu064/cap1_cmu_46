class User < ApplicationRecord
  has_many :post
  has_many :likes
  has_many :follows, through: follower_id
  has_many :follows, through: following_id
end
