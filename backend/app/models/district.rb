class District < ApplicationRecord
  has_many :post
  has_many :ward
end
