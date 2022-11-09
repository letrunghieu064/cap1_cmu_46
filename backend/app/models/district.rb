class District < ApplicationRecord
  has_many :posts
  has_many :wards
end
