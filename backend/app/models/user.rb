class User < ApplicationRecord
  has_many :post
  has_many :likes
  has_many :follow
end
