class Post < ApplicationRecord
  belongs_to :users, optional: true
  has_many :likes
  has_many :comments

  geocoded_by :address
  after_validation :geocode, if: ->(obj){ obj.address.present? and obj.address_changed? }
end
