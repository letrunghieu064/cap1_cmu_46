class Post < ApplicationRecord
  belongs_to :users
  belongs_to :district
  has_many :likes
  has_many :comment
end
