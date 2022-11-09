class DistrictSerializer < ActiveModel::Serializer
  attributes :id, :name, :icon_url
  has_many :posts
  has_many :wards
end
