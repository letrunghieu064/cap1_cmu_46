class WardSerializer < ActiveModel::Serializer
  attributes :id, :name, :longitude, :latitude, :district_id
  # belongs_to :districts
  # geocoded_by :name
  # after_validation :geocode, if: ->(obj){ obj.name.present? and obj.name_changed? }
end
