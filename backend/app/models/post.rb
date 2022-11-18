class Post < ApplicationRecord
  belongs_to :users, optional: true
  belongs_to :districts, optional: true
  has_many :likes
  has_many :comments

  geocoded_by :address
  after_validation :geocode, if: ->(obj){ obj.address.present? and obj.name_changed? }
end
