class DistrictSerializer < ActiveModel::Serializer
  attributes :id
  has_many :posts
  has_many :wards
end
