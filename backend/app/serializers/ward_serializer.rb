class WardSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :districts
end
