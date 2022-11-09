class Ward < ApplicationRecord
  belongs_to :districts, optional: true
  geocoded_by :name
  after_validation :geocode, if: ->(obj){ obj.name.present? and obj.name_changed? }
end
