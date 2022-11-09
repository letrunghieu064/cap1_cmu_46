class Post < ApplicationRecord
  belongs_to :users, optional: true
  belongs_to :districts, optional: true
  has_many :likes
  has_many :comments
end
